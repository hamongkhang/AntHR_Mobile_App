import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommendationScreen from "./CommendationScreen";
import ReceivingGiftScreen from "./ReceivingGiftScreen";
import HistoryScreen from "./HistoryScreen";
import DeliveringScreen from "./DeliveringScreen";
import PraiseScreen from "./PraiseScreen";

const Stack = createNativeStackNavigator();

const GiftScreen = ({ navigation }) => {

  return (
    <Stack.Navigator initialRouteName="CommendationScreen">
      <Stack.Screen
        name="CommendationScreen"
        component={CommendationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReceivingGiftScreen"
        component={ReceivingGiftScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveringScreen"
        component={DeliveringScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PraiseScreen"
        component={PraiseScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default GiftScreen;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
})