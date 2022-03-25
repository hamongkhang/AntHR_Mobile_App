import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
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
        var kt = false;
        for (var i = 0; i < employees.length; i++) {
            if (employees[i].user_id == data) {
                kt = true;
                a = employees[i];
            }
        }
        if (kt == false) {
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
                `${'First name: ' + a.first_name + '\n' + 'Last name: ' + a.last_name + '\n' + 'Email: ' + a.email + '\n' + 'Job: ' + "Backend Developer" + '\n' + 'Office: ' + 'Viet Nam'}`,
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
        (role == 1) ?
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
                                <Text style={{ textAlign: "center", marginTop: "auto", fontWeight: "bold", fontSize: 40, color: "#ff9900" }}>AntHR</Text>
                                <Text style={{ textAlign: "center", fontSize: 26, marginBottom: 30 }}>QR Code Scanner</Text>
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
                <Loader loading={loading} />
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 10, paddingTop: 16, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 5, paddingBottom: 16 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ backgroundColor: "#ff9900", borderRadius: 200 / 2, marginRight: 10, marginTop: 1, padding: 6, justifyContent: "center", alignItems: "center" }}>
                                    <Image
                                        source={require('../Image/clock_icon.png')}
                                        style={{
                                            width: 20,
                                            height: 20,
                                        }}
                                    />
                                </View>
                                <Text style={{ fontSize: 18, color: "rgb(35, 54, 78)", lineHeight: 20, fontWeight: "bold" }}>My Attendance</Text>
                            </View>
                            <View style={{ backgroundColor: "#edf8f1", flexDirection: "row", borderRadius: 5, padding: 5, paddingTop: 10, paddingBottom: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "rgb(35, 54, 78)", lineHeight: 20, marginRight: 10, width: "50%" }}>Current Date: <Text style={{ fontSize: 12, fontWeight: "normal" }}>{new Date().toLocaleString()}</Text></Text>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "rgb(35, 54, 78)", lineHeight: 20, width: "50%" }}>Current Location: <Text style={{ fontSize: 12, fontWeight: "normal" }}>Viet Nam</Text></Text>
                            </View>
                            <View style={{ marginBottom: 20 }}>
                                <Image
                                    source={require('../Image/qr_code.png')}
                                    style={{
                                        aspectRatio: 0.8,
                                        resizeMode: 'contain',
                                    }}
                                />
                                <Text style={{ textAlign: "center", marginTop: 10, fontSize: 20, fontWeight: "bold", lineHeight: 20, color: "rgb(35, 54, 78)" }}>Scan me for Attendance</Text>
                            </View>
                            <View style={{ borderRadius: 5, borderColor: "rgb(227, 235, 241)", borderWidth: 1, paddingTop: 20, marginBottom: 20 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
                                    <Text style={{ fontSize: 16, lineHeight: 20, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>Date</Text>
                                    <Text style={{ marginLeft: "auto", fontSize: 16, lineHeight: 20, color: "rgb(14, 34, 61)" }}>{new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderTopColor: "rgb(227, 235, 241)", borderTopWidth: 0.2 }}>
                                    <Text style={{ fontSize: 16, lineHeight: 20, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>Clock In</Text>
                                    <Text style={{ marginLeft: "auto", fontSize: 16, lineHeight: 20, color: "rgb(14, 34, 61)", backgroundColor: "#edf8f1", padding: 10, borderRadius: 5 }}>{new Date().toLocaleString()}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderTopColor: "rgb(227, 235, 241)", borderTopWidth: 0.2 }}>

                                    <Text style={{ fontSize: 16, lineHeight: 20, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>Clock In Location</Text>
                                    <Text style={{ marginLeft: "auto", fontSize: 16, lineHeight: 20, color: "rgb(14, 34, 61)" }}>Da Nang, Viet Nam</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderTopColor: "rgb(227, 235, 241)", borderTopWidth: 0.2 }}>

                                    <Text style={{ fontSize: 16, lineHeight: 20, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>Clock Out</Text>
                                    <Text style={{ marginLeft: "auto", fontSize: 16, lineHeight: 20, color: "rgb(14, 34, 61)", backgroundColor: "#edf8f1", padding: 10, borderRadius: 5 }}>{new Date().toLocaleString()}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderTopColor: "rgb(227, 235, 241)", borderTopWidth: 0.2 }}>

                                    <Text style={{ fontSize: 16, lineHeight: 20, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>Clock Out Location</Text>
                                    <Text style={{ marginLeft: "auto", fontSize: 16, lineHeight: 20, color: "rgb(14, 34, 61)" }}>Da Nang, Viet Nam</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderTopColor: "rgb(227, 235, 241)", borderTopWidth: 0.2 }}>

                                    <Text style={{ fontSize: 16, lineHeight: 20, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>Work Schedule</Text>
                                    <Text style={{ marginLeft: "auto", fontSize: 16, lineHeight: 20, color: "rgb(14, 34, 61)" }}>80</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderTopColor: "rgb(227, 235, 241)", borderTopWidth: 0.2 }}>

                                    <Text style={{ fontSize: 16, lineHeight: 20, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>Status</Text>
                                    <Text style={{ marginLeft: "auto", fontSize: 16, lineHeight: 20, color: "rgb(14, 34, 61)" }}>{new Date().toLocaleString()}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderTopColor: "rgb(227, 235, 241)", borderTopWidth: 0.2 }}>

                                    <Text style={{ fontSize: 16, lineHeight: 20, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>Note</Text>
                                    <Text style={{ marginLeft: "auto", fontSize: 16, lineHeight: 20, color: "rgb(14, 34, 61)" }}>{new Date().toLocaleString()}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        borderRadius: 5,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
        paddingTop: 2,
        paddingLeft: 20,
        paddingBottom: 2,
        paddingRight: 15,
    },
    buttonTextStyle: {
        color: '#ff9900',
        paddingVertical: 10,
        fontSize: 24,
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
    }
});