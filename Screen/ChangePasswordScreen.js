import React, { useState, createRef, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { REACT_APP_API } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';


const ChangePasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const passwordInputRef = createRef();
  const [error, setError] = useState({
    current_password: null,
    new_password: null,
    new_password_confirmed: null,
  });
  const [change, setChange] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmed: ''
  });
  const onChangePassword = () => {
    setLoading(true);
    const _formData = new FormData();
    _formData.append('current_password', change.current_password);
    _formData.append('new_password', change.new_password);
    _formData.append('new_password_confirmed', change.new_password_confirmed);
    const requestOptions = {
      method: 'POST',
      body: _formData,
      headers: { "Authorization": `Bearer ` + token }
    };
    fetch('http://192.168.43.97:8000/api/user/changePassword', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error == "Current password is not correct") {
            setLoading(false);
            ToastAndroid.showWithGravityAndOffset('Current password is not correct !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
            setError("");
          } else {
            setLoading(false);
            setError(json.error);
          }
        } else {
          setLoading(false);
          ToastAndroid.showWithGravityAndOffset('User successfully changed password !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
          navigation.replace('HomeScreen');
        }
      });
  };
  const getToken = async () => {
    try {
      const savedNickname = await AsyncStorage.getItem("access_token");
      setToken(savedNickname);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getToken();
  }, []);
  return (
    <LinearGradient colors={['#312A6C', '#852D91']} style={styles.linearGradient}>
      <View style={styles.mainBody}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../Image/logo1.png')}
                  style={{
                    width: '100%',
                    height: 150,
                    resizeMode: 'contain',
                    margin: 30,
                  }}
                />
              </View>
              <Text style={styles.buttonTextStyleAccount}><Text style={styles.buttonTextStyleAccount2} >Hello, </Text>hope you have a nice day!</Text>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(current_password) => setChange({ ...change, ['current_password']: current_password })}
                  placeholder="Current Password"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  secureTextEntry={true}
                />
              </View>
              {error.current_password != '' ? (
                <Text style={styles.errorTextStyle}>
                  {error.current_password}
                </Text>
              ) : null}
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(new_password) => setChange({ ...change, ['new_password']: new_password })}
                  placeholder="New Password"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  secureTextEntry={true}
                />
              </View>
              {error.new_password != '' ? (
                <Text style={styles.errorTextStyle}>
                  {error.new_password}
                </Text>
              ) : null
              }
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(confirm_new_password) => setChange({ ...change, ['new_password_confirmed']: confirm_new_password })}
                  placeholder="Confirm New Password"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  secureTextEntry={true}
                />
              </View>
              {error.new_password_confirmed != '' ? (
                <Text style={styles.errorTextStyle}>
                  {error.new_password_confirmed}
                </Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => onChangePassword()}
              >
                <Text style={styles.buttonTextStyle}>CHANGE PASSWORD</Text>
              </TouchableOpacity>
              <Text style={styles.buttonTextStyleForgot2}>You want go back? <Text style={styles.buttonTextStyleForgot3} onPress={() => navigation.replace('HomeScreen')}>Home</Text></Text>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
export default ChangePasswordScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#FFFF66',
    borderWidth: 1,
    borderColor: '#ff9900',
    height: 42,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#ff9900',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonTextStyleOr: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: "bold",
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  buttonStyleGoogle: {
    borderWidth: 1,
    borderColor: '#dadae8',
    height: 42,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyleGoogle: {
    color: 'white',
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10
  },
  buttonTextStyleForgot: {
    color: '#ff9900',
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "right",
    paddingRight: 40,
  },
  buttonTextStyleAccount2: {
    color: '#ff9900',
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextStyleAccount: {
    color: 'white',
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 35,
  },
  buttonTextStyleForgot3: {
    color: '#ff9900',
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextStyleForgot2: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
    textAlign: "center",
  },
});