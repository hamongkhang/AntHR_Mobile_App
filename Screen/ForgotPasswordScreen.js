import React, { useState, createRef, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { REACT_APP_API } from "@env"
import Loader from './Loader';

const ForgotPasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errorForm1, setErrorForm1] = useState({
    email: null,
  });
  const [errorForm2, setErrorForm2] = useState({
    code: null,
    new_password: null,
    new_password_confirmed: null
  });
  const [forgot, setForgot] = useState({
    email: ''
  });
  const [confirm, setConfirm] = useState({
    code: '',
    new_password: '',
    new_password_confirmed: ''
  });
  const passwordInputRef = createRef();
  const getCodeForgot = () => {
    setLoading(true);
    const _formData = new FormData();
    _formData.append('email', forgot.email);
    const requestOptions = {
      method: 'POST',
      body: _formData,
    };
    fetch('http://192.168.43.97:8000/api/user/getCodeForgotPassword', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error == "blocked") {
            setLoading(false);
            ToastAndroid.showWithGravityAndOffset('Your account has been blocked !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
            setErrorForm1("");
          } else if (json.error == "No email") {
            setLoading(false);
            ToastAndroid.showWithGravityAndOffset('Email does not exist !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
            setErrorForm1("");
          }
          else {
            setLoading(false);
            setErrorForm1(json.error);
          }
        } else {
          setLoading(false);
          ToastAndroid.showWithGravityAndOffset('Successfully !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
          setErrorForm1("");
          setShowForm(true);
        }
      });
  };
  const getCodeResend = () => {
    setLoading(true);
    const _formData = new FormData();
    _formData.append('email', forgot.email);
    const requestOptions = {
      method: 'POST',
      body: _formData,
    };
    fetch('http://192.168.43.97:8000/api/user/getCodeForgotPassword', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error == "blocked") {
            setLoading(false);
            ToastAndroid.showWithGravityAndOffset('Your account has been blocked !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
          } else if (json.error == "No email") {
            setLoading(false);
            ToastAndroid.showWithGravityAndOffset('Email does not exist !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
          }
        } else {
          setLoading(false);
          ToastAndroid.showWithGravityAndOffset('Successfully !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
        }
      });
  };
  const onForgotPassword = () => {
    setLoading(true);
    const _formData = new FormData();
    _formData.append('code', confirm.code);
    _formData.append('new_password', confirm.new_password);
    _formData.append('new_password_confirmed', confirm.new_password_confirmed);
    const requestOptions = {
      method: 'POST',
      body: _formData,
    };
    fetch('http://192.168.43.97:8000/api/user/changePasswordForgot', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error == 'No one have code') {
            setLoading(false);
            ToastAndroid.showWithGravityAndOffset('Code you entered is incorrect !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
            setErrorForm2('');
          } else {
            setLoading(false);
            setErrorForm2(json.error);
          }
        } else {
          setLoading(false);
          ToastAndroid.showWithGravityAndOffset('Change password in successfully !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
          navigation.replace('LoginScreen');
        }
      });
  };
  return (
    !loading?
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
                  onChangeText={(email) => setForgot({ ...forgot, ['email']: email })}
                  placeholder="Email Address"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  returnKeyType="next"
                  value={forgot.email ? forgot.email : null}
                  onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              {errorForm1.email != '' ? (
                <Text style={styles.errorTextStyle}>
                  {errorForm1.email}
                </Text>
              ) : null}
              {
                showForm
                  ?
                  <>
                    <Text style={styles.buttonTextStyleForgot} onPress={() => getCodeResend()}>Resend Code ?</Text>
                    <View style={styles.SectionStyle}>
                      <TextInput
                        style={styles.inputStyle}
                        onChangeText={(code) => setConfirm({ ...confirm, ['code']: code })}
                        placeholder="Code"
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
                    {errorForm2.code != '' ? (
                      <Text style={styles.errorTextStyle}>
                        {errorForm2.code}
                      </Text>
                    ) : null
                    }
                    <View style={styles.SectionStyle}>
                      <TextInput
                        style={styles.inputStyle}
                        onChangeText={(new_password) => setConfirm({ ...confirm, ['new_password']: new_password })}
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
                    {errorForm2.new_password != '' ? (
                      <Text style={styles.errorTextStyle}>
                        {errorForm2.new_password}
                      </Text>
                    ) : null
                    }
                    <View style={styles.SectionStyle}>
                      <TextInput
                        style={styles.inputStyle}
                        onChangeText={(confirm_new_password) => setConfirm({ ...confirm, ['new_password_confirmed']: confirm_new_password })}
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
                    {errorForm2.new_password_confirmed != '' ? (
                      <Text style={styles.errorTextStyle}>
                        {errorForm2.new_password_confirmed}
                      </Text>
                    ) : null}
                  </>
                  :
                  null
              }
              {
                showForm
                  ?
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => onForgotPassword()}
                  >
                    <Text style={styles.buttonTextStyle}>SUBMIT</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => getCodeForgot()}
                  >
                    <Text style={styles.buttonTextStyle}>CONTINUE</Text>
                  </TouchableOpacity>
              }
              <Text style={styles.buttonTextStyleForgot2}>You want to login? <Text style={styles.buttonTextStyleForgot3} onPress={() => navigation.replace('LoginScreen')}>Login</Text></Text>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
    : <Loader loading={loading} />
  );
};
export default ForgotPasswordScreen;

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