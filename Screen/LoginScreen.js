import React, { useState, createRef, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { REACT_APP_API } from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from './Loader';

const LoginScreen = ({ navigation }) => {
  const [domain, setDomain] = useState('');
  const [errorForm1, setErrorForm1] = useState({ domain: null });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errorForm2, setErrorForm2] = useState({
    email: null,
    password: null,
  });
  const passwordInputRef = createRef();
  const handleSubmitPress = () => {
    setLoading(true);
    const _formData = new FormData();
    _formData.append('email', user.email);
    _formData.append('password', user.password);
    const requestOptions = {
      method: 'POST',
      body: _formData,
    };
    fetch('http://192.168.43.97:8000/api/user/login', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error == 'Unauthorized') {
            setLoading(false);
          //  ToastAndroid.showWithGravityAndOffset('Login information is incorrect !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
            setErrorForm2('');
          } else if (json.error == 'Blocked') {
            setLoading(false);
           // ToastAndroid.showWithGravityAndOffset('Your account has been blocked !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
            setErrorForm2("");
          } else {
            setLoading(false);
            setErrorForm2(json.error);
          }
        } else {
          AsyncStorage.setItem('access_token', json.access_token);
          AsyncStorage.setItem('first_name', json.name.first_name);
          AsyncStorage.setItem('last_name', json.name.last_name);
          AsyncStorage.setItem('avatar', json.name.avatar);
          AsyncStorage.setItem('email', json.name.email);
          AsyncStorage.setItem('role', json.user.role.toString());
          AsyncStorage.setItem('id', json.user.id.toString());
           setLoading(false);
         // ToastAndroid.showWithGravityAndOffset('Logged in successfully !!!',ToastAndroid.LONG,ToastAndroid.CENTER,10,10);
          navigation.navigate('HomeScreen');
        }
      });
  };
  const handleCheckDomainPress = () => {
    setLoading(true);
    const _formData = new FormData();
    _formData.append('domain', domain);
    const requestOptions = {
      method: 'POST',
      body: _formData,
    };
    fetch('http://192.168.43.97:8000/api/user/checkDomain', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error == "No one have domain") {
            setLoading(false);
            ToastAndroid.showWithGravityAndOffset('Domain does not exist !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
            setErrorForm1("");
          } else {
            setErrorForm1(json.error);
            setLoading(false);
          }
        } else {
          setLoading(false);
         //  ToastAndroid.showWithGravityAndOffset('Successfully!!!',ToastAndroid.LONG,ToastAndroid.CENTER,10,10);
          if (!showForm) {
            setShowForm(true);
          } else {
            setShowForm(false);
          }
        }
      });
  };
  const googleLogin = () => {
    setErrorForm2("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      ToastAndroid.showWithGravityAndOffset('Login information is incorrect !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
    }, 3000);
  }
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('access_token').then((value) =>
      (value == null) ? setLoading(false) : navigation.replace('HomeScreen')
    );
  }, []);
  return (
    showForm
      ?
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
                    onChangeText={(domain) =>
                      setDomain(domain)
                    }
                    placeholder="Domain Company"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </View>
                {errorForm1.domain != '' ? (
                  <Text style={styles.errorTextStyle}>
                    {errorForm1.domain}
                  </Text>
                ) : null}
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={handleCheckDomainPress}
                >
                  <Text style={styles.buttonTextStyle}>CONTINUE</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
      :
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
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(email) => setUser({ ...user, ['email']: email })}
                    placeholder="Email Address"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </View>
                {errorForm2.email != '' ? (
                  <Text style={styles.errorTextStyle}>
                    {errorForm2.email}
                  </Text>
                ) : null}
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(password) => setUser({ ...user, ['password']: password })}
                    placeholder="Password"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
                </View>
                {errorForm2.password != '' ? (
                  <Text style={styles.errorTextStyle}>
                    {errorForm2.password}
                  </Text>
                ) : null}
                <Text style={styles.buttonTextStyleForgot} onPress={() => navigation.navigate('ForgotPasswordScreen')}>Forgot Password ?</Text>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={handleSubmitPress}
                >
                  <Text style={styles.buttonTextStyle}>CONTINUE</Text>
                </TouchableOpacity>
                <Text style={styles.buttonTextStyleOr}>OR</Text>
                <TouchableOpacity
                  style={styles.buttonStyleGoogle}
                  activeOpacity={0.5}
                  onPress={() => googleLogin()}
                >
                  <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, }}>
                    <Image
                      source={require('../Image/logo_google.png')}
                      style={{
                        width: 18,
                        height: 18,
                        paddingVertical: 10,
                      }}
                    />
                    <Text style={styles.buttonTextStyleGoogle}>Login with Google</Text>
                  </View>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
  );
};
export default LoginScreen;

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
});