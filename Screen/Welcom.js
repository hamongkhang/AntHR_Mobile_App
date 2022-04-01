import React, { useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from "./Loader";
const Welcome = ({ navigation }) => {

  const [loading, setLoading] = useState(false);
  const getStart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('CheckUserScreen');
    }, 200);
  }
  return (
    <LinearGradient colors={['#f5fdf8', '#f7f9fc']} style={styles.linearGradient}>
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
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.textStyle2}>WELCOME TO <Text style={styles.textStyle3} >ANTHR</Text></Text>
                <Text style={styles.textStyle4}>The choice couldn't be better</Text>
              </View>
              <LinearGradient colors={['#FE6B8B', '#FF8E53']} style={styles.linearGradient2}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() => getStart()}
                >
                  <Text style={styles.buttonTextStyle}>LET'S STARTED</Text>
                </TouchableOpacity>
              </LinearGradient>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  linearGradient2: {
    height: 42,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  textStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  textStyle2: {
    color: '#FE6B8B',
    paddingVertical: 10,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyle3: {
    color: '#FF8E53',
    paddingVertical: 10,
    fontSize: 62,
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyle4: {
    color: 'rgb(60, 82, 100)',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
});