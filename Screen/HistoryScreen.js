import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Modal, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Dialog, Searchbar, List, TextInput, Button, FAB, Portal, Provider, IconButton } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';

const HistoryScreen = ({ navigation }) => {
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [render, setRender] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [scoreCheck, setScoreCheck] = useState(false);
    const [employeeCheck, setEmployeeCheck] = useState(false);
    const [checkWhy, setCheckWhy] = useState(0);
    const [text, setText] = React.useState('');
    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await AsyncStorage.getItem("access_token");
                const id_user = await AsyncStorage.getItem("id");
                const avatar_user = await AsyncStorage.getItem("avatar");
                const last_name = await AsyncStorage.getItem("last_name");
                const first_name = await AsyncStorage.getItem("first_name");
                setAvatar(avatar_user);
                setFirstName(first_name);
                setLastName(last_name);
            } catch (err) {
                console.log(err);
            }
        }
        getToken();
    }, [render]);
    return (
        <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
            <Loader loading={loading} />
                <ScrollView>
                    <View style={{ padding: 10, paddingTop: 10 }}>
                        <View style={{ marginBottom:10,padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 5, paddingBottom: 16, boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px" }}>
                            <View style={{ alignItems: "center", flexDirection: "row", marginBottom:20}}>
                                <View style={{ width: "20%" }}>
                                    {
                                        (avatar == "null")
                                            ?
                                            <Avatar.Image size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: REACT_APP_FILE + '/avatar/avatar.png' }} />
                                            :
                                            (avatar.search('https://') != -1)
                                                ?
                                                <Avatar.Image size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: avatar }} />
                                                :
                                                <Avatar.Image size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: REACT_APP_FILE + '/avatar/' + avatar }} />
                                    }
                                </View>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>Ha Mong Khang<Text style={{ fontSize: 16, fontWeight: "normal" }}> đã đổi phần thưởng </Text>Nguyen Hong Quan</Text>
                                    <Text style={{ fontSize: 12, color: "rgb(35, 54, 78)" }}>18 hours ago</Text>
                                </View>
                            </View>
                                     <View style={{ alignItems: "center", marginBottom: 20 }}>
                                     <Image
                                source={{ uri: REACT_APP_FILE + '/present/image/33_15-03-2022-09-55-20.jpg' }}
                                     style={{
                                 width: '100%',
                                 height: 100,
                                    resizeMode: 'contain',
                                 }}
                                    />
                            </View>
                            <View style={{ alignItems: "center", marginBottom: 10 }}>
                                <Text style={{ fontSize: 24, fontWeight: "bold", color: "red" }}>5000 Points</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "italic", color: "rgb(35, 54, 78)" }}>You can delete to clear up storage .</Text>
                            </View>
                            <View style={{ alignItems: "center", marginTop: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: "#ff9900",
                    backgroundColor: "red",
                    width: "90%",
                    padding: 10,
                    alignItems: "center"
                  }}

                //  onPress={handleCheckDomainPress}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>DELETE</Text>
                </TouchableOpacity>
              </View>
                        </View>
                    </View>
                </ScrollView>
            <Provider>
                <Portal>
                    <FAB.Group
                        open={open}
                        icon={open ? 'newspaper-variant-multiple-outline' : 'plus'}
                        actions={[
                            {
                                icon: 'plus',
                                onPress: () => setShowModal(!showModal),
                            },
                            {
                                icon: 'history',
                                label: 'History',
                                onPress: () => navigation.replace('HistoryScreen'),
                            },
                            {
                                icon: 'car',
                                label: 'Delivering',
                                onPress: () => navigation.replace('DeliveringScreen'),
                            },
                            {
                                icon: 'crown',
                                label: 'Praise Sending',
                                onPress: () => navigation.replace('PraiseScreen'),
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
    );
};
export default HistoryScreen;
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    linearGradient2: {
        flex: 1,
        padding: 10,
    },
})