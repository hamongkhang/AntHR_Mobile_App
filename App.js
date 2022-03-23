// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {NavigationContainer} from '@react-navigation/native';
// import Welcome from "./Screen/Welcom";
// import ChangePasswordScreen from "./Screen/ChangePasswordScreen";
// import ForgotPasswordScreen from "./Screen/ForgotPasswordScreen";
// import LoginScreen from "./Screen/LoginScreen";
// import HomeScreen from "./Screen/HomeScreen";
// import AccountScreen from "./Screen/Account";
// import NewScreen from './Screen/NewScreen';
// import DocumentScreen from './Screen/DocumentScreen';
// import AttendanceScreen from "./Screen/AttendanceScreen"
// import GiftScreen from "./Screen/GiftScreen";

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//      <NavigationContainer>
//        <Stack.Navigator initialRouteName="HomeScreen">
//         <Stack.Screen
//           name="Welcome"
//           component={Welcome}
//           options={{headerShown: false}}
//         /> 
//         <Stack.Screen
//           name="LoginScreen"
//           component={LoginScreen}
//           options={{headerShown: false}}
//         /> 
//         <Stack.Screen
//           name="ForgotPasswordScreen"
//           component={ForgotPasswordScreen}
//           options={{headerShown: false}}
//         />  
//         <Stack.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={{headerShown: false}}
//         /> 
//         <Stack.Screen
//           name="AccountScreen"
//           component={AccountScreen}
//           options={{headerShown: false}}
//         /> 
//         <Stack.Screen
//           name="NewScreen"
//           component={NewScreen}
//           options={{headerShown: false}}
//         /> 
//         <Stack.Screen
//           name="DocumentScreen"
//           component={DocumentScreen}
//           options={{headerShown: false}}
//         /> 
//          <Stack.Screen
//           name="AttendanceScreen"
//           component={AttendanceScreen}
//           options={{headerShown: false}}
//         /> 
//           <Stack.Screen
//           name="GiftScreen"
//           component={GiftScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="ChangePasswordScreen"
//           component={ChangePasswordScreen}
//           options={{headerShown: false}}
//         /> 
//      </Stack.Navigator>
//      </NavigationContainer>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  barCodeView: {
    width: '100%', 
    height: '50%', 
    marginBottom: 40
  },
});