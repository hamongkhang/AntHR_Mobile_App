import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Dialog, Searchbar, List, TextInput, Button ,FAB, Portal, Provider } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';

const PraiseScreen = ({ navigation }) => {
const [state, setState] = React.useState({ open: false });

const onStateChange = ({ open }) => setState({ open });

const { open } = state;

  return (
      <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
        <Text>haha</Text>
      <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'newspaper-variant-multiple-outline' : 'plus'}
          actions={[
            {
              icon: 'history',
              label: 'History',
              onPress: () => navigation.navigate('HistoryScreen'),
            },
            { 
                icon: 'car',
                label: 'Delivering', 
                onPress: () => navigation.navigate('DeliveringScreen'),
            },
            {
              icon: 'crown',
              label: 'Praise Sending',
              onPress: () => navigation.navigate('PraiseScreen'),
            },
            {
              icon: 'gift',
              label: 'Gift Receiving',
              onPress: () => navigation.navigate('ReceivingGiftScreen'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
      </LinearGradient>
  );
};
export default PraiseScreen;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
})