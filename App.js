import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from "./Screen/Welcom";
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import HomeScreen from "./Screen/DrawerScreens/HomeScreen";
import ForgotPasswordScreen from './Screen/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="ForgotPasswordScreen">
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
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        /> 
         <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        /> 
         <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        /> 
       <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />  
     </Stack.Navigator>
     </NavigationContainer>
  );
};

export default App;