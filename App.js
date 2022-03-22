import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from "./Screen/Welcom";
import ChangePasswordScreen from "./Screen/ChangePasswordScreen";
import ForgotPasswordScreen from "./Screen/ForgotPasswordScreen";
import LoginScreen from "./Screen/LoginScreen";
import HomeScreen from "./Screen/HomeScreen";
import AccountScreen from "./Screen/Account";
import NewScreen from './Screen/NewScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />  
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="NewScreen"
          component={NewScreen}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        /> 
     </Stack.Navigator>
     </NavigationContainer>
  );
};

export default App;