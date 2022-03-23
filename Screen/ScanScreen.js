import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage'

const ScanScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [checkRole, setCheckRole] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        (async () => {
            const role = await AsyncStorage.getItem("role");
            setRole(role);
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`${data}`);
    };

    if (hasPermission === null) {
        return <Text style={{ color: "red", fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: "auto", marginBottom: "auto" }}>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text style={{ color: "red", fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: "auto", marginBottom: "auto" }}>No access to camera</Text>;
    }
    return (
        (role==1)?
        <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
        </LinearGradient>
        :
        <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
        <Text>Tôi không phải là admin</Text>
        </LinearGradient>
    );
}
export default ScanScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barCodeView: {
        width: '100%',
        height: '50%',
        marginBottom: 40
    },
    linearGradient: {
        flex: 1,
    },
    mainBody: {
        flex: 1,
      },
});