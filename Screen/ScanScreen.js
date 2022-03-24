import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { REACT_APP_API } from "@env"
import Loader from './Loader';

const ScanScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);

    const getEmployees = (token) => {
        setLoading(true);
        fetch(REACT_APP_API + '/employee/getAllEmployee', {
            method: "GET",
            headers: { "Authorization": `Bearer ` + token }
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setUsers(data.data[0].reverse());
                setEmployees(data.data[1].reverse());
            });
    }
    console.log(employees)
    console.log(users)

    useEffect(() => {
        (async () => {
            const role = await AsyncStorage.getItem("role");
            const token = await AsyncStorage.getItem("access_token");
            setRole(role);
            getEmployees(token);
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const handleBarCodeScanned = ({ type, data }) => {
        var a = {};
        var kt=false;
        for (var i = 0; i < employees.length; i++) {
            if (employees[i].user_id == data) {
                kt=true;
                a = employees[i];
            }
        }
        if (kt==false) {
            setScanned(true);
            Alert.alert("Unidentified Employee!",
                `We are unable to verify employee information. Please scan again !`,
                [
                    { text: 'Cancel' },
                ],
                { cancelable: false }
            )
        } else {
            setScanned(true);
            Alert.alert("Identified Employee !",
                `${'First name: '+a.first_name+'\n'+'Last name: '+a.last_name+'\n'+'Email: '+a.email+'\n'+'Job: '+"Backend Developer"+'\n'+'Office: '+'Viet Nam'}`,
                [
                    { text: 'Cancel' },
                ],
                { cancelable: false }
            )
        }


    };

    if (hasPermission === null) {
        return <Text style={{ color: "red", fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: "auto", marginBottom: "auto" }}>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text style={{ color: "red", fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: "auto", marginBottom: "auto" }}>No access to camera</Text>;
    }
    return (
        (role == 0) ?
            <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
                <Loader loading={loading} />
                {showCamera ?
                    <View style={styles.container}>
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={[StyleSheet.absoluteFillObject, styles.containerBar]}
                        >
                            <View style={styles.layerTop}>
                            </View>
                            <View style={styles.layerCenter}>
                                <View style={styles.layerLeft} />
                                <View style={styles.focused} />
                                <View style={styles.layerRight} />
                            </View>
                            <View style={styles.layerBottom}>
                                <Text style={{ textAlign: "center", marginTop: "auto", fontWeight: "bold", fontSize: 40, color: "#ff9900"}}>AntHR</Text>
                                <Text style={{ textAlign: "center", fontSize: 26 ,marginBottom:30}}>QR Code Scanner</Text>
                            </View>
                        </BarCodeScanner>
                        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} color="red" />}
                    </View>
                    :
                    <View style={styles.mainBody}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => setShowCamera(true)}
                        >
                            <Text style={styles.buttonTextStyle}>CONTINUE</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, textAlign: "center" }}>Please click the button to perform the Attendance check</Text>
                    </View>
                }
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
    buttonStyle: {
        backgroundColor: '#FFFF66',
        borderWidth: 1,
        borderColor: '#ff9900',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
        paddingTop: 5,
        paddingLeft: 15,
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 20
    },
    buttonTextStyle: {
        color: '#ff9900',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: "bold"
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    containerBar: {
        flex: 1,
        flexDirection: 'column'
    },
    layerTop: {
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.8)",
    },
    layerCenter: {
        flex: 1,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.8)"
    },
    focused: {
        flex: 10
    },
    layerRight: {
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.8)"
    },
    layerBottom: {
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.8)",
    },
});