import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const Loader = (props) => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <LinearGradient colors={['#FE6B8B', '#FF8E53']} style={styles.activityIndicatorWrapper}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={true}
              color="white"
              size="large"
              style={styles.activityIndicator}
            />
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});