import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, FAB, Portal, Provider } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';
import moment from 'moment';

const DeliveringScreen = ({ navigation }) => {
    const [id, setId] = useState('');
    const [token, setToken] = useState('');
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [render, setRender] = useState(false);
    const [orders, setOrders] = useState([]);
    const getOrders = (token) => {
        setLoading(true);
        fetch('http://192.168.43.97:8000/api/cart_present/getAllCartPresent', {
            method: "GET",
            headers: { "Authorization": `Bearer ` + token }
        })
            .then(response => response.json())
            .then(data => {
                setOrders(data.data.reverse());
                setLoading(false);
            });
    }
    const onConfirmEmployee = (id) => {
        setLoading(true);
        fetch('http://192.168.43.97:8000/api/cart_present/changeStatusClient/' + id, {
            method: "GET",
            headers: { "Authorization": `Bearer ` + token }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setLoading(false);
                    ToastAndroid.showWithGravityAndOffset('Public Failed !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
                }
                else {
                    setLoading(false);
                    setRender(!render)
                    ToastAndroid.showWithGravityAndOffset('Public successfully !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
                }
            });
    }
    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await AsyncStorage.getItem("access_token");
                const id_user = await AsyncStorage.getItem("id");
                const avatar_user = await AsyncStorage.getItem("avatar");
                const last_name = await AsyncStorage.getItem("last_name");
                const first_name = await AsyncStorage.getItem("first_name");
                getOrders(token);
                setAvatar(avatar_user);
                setFirstName(first_name);
                setLastName(last_name);
                setId(id_user);
                setToken(token);
            } catch (err) {
                console.log(err);
            }
        }
        getToken();
    }, [render]);
    return (
        !loading?
        <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
            <Loader loading={loading} />
            <ScrollView>
                <View style={{ padding: 10, paddingTop: 10 }}>
                    {
                        orders.length ?
                            orders.map((item, index) => {
                                if ((item.status == 1) && (item.user_id == id)) {
                                    return (
                                        <View key={index} style={{ marginBottom: 10, padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 5, paddingBottom: 16, boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px" }}>
                                            <View style={{ alignItems: "center", flexDirection: "row", marginBottom: 20 }}>
                                                <View style={{ width: "20%" }}>
                                                    {item.avatar ?
                                                        (item.avatar.search('https://') !== -1) ?
                                                            <Avatar.Image size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: item.avatar }} />
                                                            :
                                                            <Avatar.Image size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/' + item.avatar }} />
                                                        :
                                                        <Avatar.Image size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/avatar.png' }} />
                                                    }
                                                </View>
                                                <View style={{ width: "80%" }}>
                                                    <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>{item.last_name + " " + item.first_name}<Text style={{ fontSize: 16, fontWeight: "normal" }}> đã đổi phần thưởng </Text>{item.present_name ? item.present_name : null}</Text>
                                                    <Text style={{ fontSize: 12, color: "rgb(35, 54, 78)" }}>{moment(item.updated_at).fromNow()}</Text>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: "center", marginBottom: 20 }}>
                                                <Image
                                                    source={{ uri: 'http://192.168.43.97:8000/upload'+ '/present/image/' + item.present_image }}
                                                    style={{
                                                        width: '100%',
                                                        height: 100,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <View style={{ alignItems: "center", marginBottom: 10 }}>
                                                <Text style={{ fontSize: 24, fontWeight: "bold", color: "red" }}>{item.present_score ? item.present_score : null} Points</Text>
                                            </View>
                                            <View style={{ marginBottom: 10 }}>
                                                <Text style={{ fontSize: 14, color: "rgb(35, 54, 78)" }}>Please confirm the employee's redemption information .</Text>
                                            </View>
                                            <View style={{ alignItems: "center", marginTop: 10 }}>
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    style={{
                                                        borderWidth: 1,
                                                        borderRadius: 3,
                                                        borderColor: "#ff9900",
                                                        backgroundColor: "#FFFF66",
                                                        width: "90%",
                                                        padding: 10,
                                                        alignItems: "center"
                                                    }}
                                                    onPress={() => onConfirmEmployee(item.id)}
                                                >
                                                    <Text style={{ color: "#ff9900", fontWeight: "bold" }}>CONFIRM RECEIPT</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                            })
                            : null
                    }
                </View>
            </ScrollView>
            <Provider>
                <Portal>
                    <FAB.Group
                        open={open}
                        icon={open ? 'car' : 'plus'}
                        actions={[
                            {
                                icon: 'plus',
                                onPress: () => setState({ open: false })
                            },
                            {
                                icon: 'newspaper-variant-multiple-outline',
                                label: 'Portal',
                                onPress: () => navigation.replace('CommendationScreen'),
                            },
                            {
                                icon: 'history',
                                label: 'History',
                                onPress: () => navigation.replace('HistoryScreen'),
                            },
                            {
                                icon: 'gift',
                                label: 'Gift Receiving',
                                onPress: () => navigation.replace('ReceivingGiftScreen'),
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
        :<Loader loading={loading} />
    );
};
export default DeliveringScreen;
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    linearGradient2: {
        flex: 1,
        padding: 10,
    },
})