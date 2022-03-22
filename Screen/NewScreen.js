import React, {useState,useEffect} from 'react';
import { LinearGradient } from "expo-linear-gradient";
import {StyleSheet,View,Text,ScrollView,Image,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Avatar,Dialog } from 'react-native-paper';
import {REACT_APP_API,REACT_APP_FILE} from "@env"
import Loader from './Loader';


const NewScreen = ({navigation}) => {

  return (
      <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
        <View style={styles.mainBody}>
        <Loader loading={loading} />
       
        </View> 
      </LinearGradient>
  );
};
export default NewScreen;
const styles = StyleSheet.create({
  linearGradient: {
      flex:1,
      paddingLeft: 15,
      paddingRight: 15,
  },
  mainBody: {
    flex: 1,
    alignItems:"center"
  },

})