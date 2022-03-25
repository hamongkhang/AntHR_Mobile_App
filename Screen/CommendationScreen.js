import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Modal, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Dialog, Searchbar, List, TextInput, Button, FAB, Portal, Provider, IconButton } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';

const CommendationScreen = ({ navigation }) => {
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
            {showModal
                ?
                null :
                <ScrollView>
                    <View style={{ padding: 10, paddingTop: 10 }}>
                        <View style={{ padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 5, paddingBottom: 16, boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px" }}>
                            <View style={{ alignItems: "center", flexDirection: "row" }}>
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
                                    <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>Ha Mong Khang<Text style={{ fontSize: 16, fontWeight: "normal" }}> đã khen thưởng </Text>Nguyen Hong Quan</Text>
                                    <Text style={{ fontSize: 12, color: "rgb(35, 54, 78)" }}>18 hours ago</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: "center", flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
                                <View style={{ alignItems: "center", width: "40%" }}>
                                    {
                                        (avatar == "null")
                                            ?
                                            <Avatar.Image size={70} style={{ backgroundColor: "#edf8f1" }} source={{ uri: REACT_APP_FILE + '/avatar/avatar.png' }} />
                                            :
                                            (avatar.search('https://') != -1)
                                                ?
                                                <Avatar.Image size={70} style={{ backgroundColor: "#edf8f1" }} source={{ uri: avatar }} />
                                                :
                                                <Avatar.Image size={70} style={{ backgroundColor: "#edf8f1" }} source={{ uri: REACT_APP_FILE + '/avatar/' + avatar }} />
                                    }
                                    <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", color: "rgb(35, 54, 78)", marginTop: 10 }}>Ha Mong Khang</Text>
                                    <Text style={{ textAlign: "center", fontSize: 12, color: "rgb(35, 54, 78)", marginTop: 5 }}>Executive Cum Legal Assistant Consultant Employee</Text>
                                </View>
                                <View style={{ alignItems: "center", width: "16%", marginLeft: 10, marginRight: 10 }}>
                                    <Avatar.Image size={70} style={{ backgroundColor: "white" }} source={{ uri: REACT_APP_FILE + '/reward/gold.png' }} />
                                </View>
                                <View style={{ alignItems: "center", width: "40%" }}>
                                    {
                                        (avatar == "null")
                                            ?
                                            <Avatar.Image size={70} style={{ backgroundColor: "#edf8f1" }} source={{ uri: REACT_APP_FILE + '/avatar/avatar.png' }} />
                                            :
                                            (avatar.search('https://') != -1)
                                                ?
                                                <Avatar.Image size={70} style={{ backgroundColor: "#edf8f1" }} source={{ uri: avatar }} />
                                                :
                                                <Avatar.Image size={70} style={{ backgroundColor: "#edf8f1" }} source={{ uri: REACT_APP_FILE + '/avatar/' + avatar }} />
                                    }
                                    <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", color: "rgb(35, 54, 78)", marginTop: 10 }}>Ha Mong Khang</Text>
                                    <Text style={{ textAlign: "center", fontSize: 12, color: "rgb(35, 54, 78)", marginTop: 5 }}>Manager Programme Development(Partnership)</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: "center", marginBottom: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "green" }}>+ 5000 Points</Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "green" }}>+ Bup Be</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "rgb(35, 54, 78)" }}>Ban lam viec rat tot, chuc mung ban</Text>
                            </View>
                            <View style={{ marginBottom: 10, alignItems: "center", flexDirection: "row" }}>
                                <View style={{ width: "30%", marginRight: 10 }}>
                                    <Text style={{ fontSize: 12, fontWeight: "bold", color: "rgb(35, 54, 78)", backgroundColor: "#a7ffeb", padding: 7, borderRadius: 5 }}>Achievements</Text>
                                </View>
                                <View style={{ flexDirection: "row", width: "60%", alignItems: "center" }}>
                                    <Avatar.Image size={28} style={{ backgroundColor: "white" }} source={{ uri: REACT_APP_FILE + '/reward/value.png' }} />
                                    <Text style={{ fontSize: 12, color: "rgb(35, 54, 78)", marginLeft: 5 }}>hahdg ajhdab ajhdjka  jahdjka jahdkja  jahdja  hadjh jahdja  ahdjka d hdjka</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <IconButton
                                    icon="hand"
                                    color={"grey"}
                                    size={30}
                                    onPress={() => console.log('Pressed')}
                                />
                                <Text style={{ marginLeft: -10, marginRight: 10 }}>0 like</Text>
                                <IconButton
                                    icon="comment"
                                    color={"grey"}
                                    size={30}
                                    onPress={() => console.log('Pressed')}
                                />
                                <Text style={{ marginLeft: -10, marginRight: 10 }}>0 comment</Text>
                            </View>
                        </View>
                    </View>
                    
                </ScrollView>
            }
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={showModal}
            >
                <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient2}>
                    <ScrollView>
                        <View style={{ padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 5, paddingBottom: 16 }}>
                        <IconButton
                                    icon="close"
                                    color={"red"}
                                    size={25}
                                    onPress={() => setShowModal(!showModal)} style={{ marginRight: "auto", marginBottom: 5 }}                                 />
                            <View>
                                <Text style={{ fontSize: 24, color: "#ff9900", lineHeight: 24, fontWeight: "bold", textAlign: "center" }}>Internal Reward Portal</Text>
                                <Text style={{ fontSize: 14, marginTop: 10, color: "rgb(35, 54, 78)", lineHeight: 20, fontWeight: "bold", textAlign: "center" }}>Appreciate the positive contributions of your colleagues here!</Text>
                            </View>
                            <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                {
                                    (avatar == "null")
                                        ?
                                        <Avatar.Image size={35} style={{ backgroundColor: "#edf8f1", marginRight: 10 }} source={{ uri: REACT_APP_FILE + '/avatar/avatar.png' }} />
                                        :
                                        (avatar.search('https://') != -1)
                                            ?
                                            <Avatar.Image size={35} style={{ backgroundColor: "#edf8f1", marginRight: 10 }} source={{ uri: avatar }} />
                                            :
                                            <Avatar.Image size={35} style={{ backgroundColor: "#edf8f1", marginRight: 10 }} source={{ uri: REACT_APP_FILE + '/avatar/' + avatar }} />
                                }
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "rgb(35, 54, 78)" }}>{"Hello, " + lastName + " " + firstName}</Text>
                            </View>
                            <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: "48%", backgroundColor: "#dcedc8", justifyContent: "center", marginRight: 10, padding: 5, borderRadius: 3 }}>
                                    <Text style={{ textAlign: "center", fontSize: 12 }}>Recognition Points Redeemed</Text>
                                    <Text style={{ textAlign: "center", fontSize: 16, color: "#4caf50", fontWeight: "bold" }}>0 Points</Text>
                                    <Text style={{ textAlign: "center", fontSize: 8 }}>Please reward your colleagues or exchange gifts.</Text>
                                    <Text style={{ textAlign: "center", fontSize: 8, color: "#ef5350" }}>Expiration Date: 31/12/2030</Text>
                                </View>
                                <View style={{ width: "48%", backgroundColor: "#b2ebf2", justifyContent: "center", padding: 5, borderRadius: 3 }}>
                                    <Text style={{ textAlign: "center", fontSize: 12 }}>Recognition Points Redeemed</Text>
                                    <Text style={{ textAlign: "center", fontSize: 16, color: "#03a9f4", fontWeight: "bold" }}>0 Points</Text>
                                    <Text style={{ textAlign: "center", fontSize: 8 }}>Get special offers and rewards packages, discount codes and travel packages.</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 5, alignItems: "center" }}>
                                <View style={{ backgroundColor: "#ffe0b2", justifyContent: "center", padding: 5, borderRadius: 3 }}>
                                    <Text style={{ textAlign: "center", fontSize: 12 }}>Recognition Points Redeemed</Text>
                                    <Text style={{ textAlign: "center", fontSize: 16, color: "#f4511e", fontWeight: "bold" }}>0 Points</Text>
                                    <Text style={{ textAlign: "center", fontSize: 8 }}>This is the score you have awarded to your friends after positive contributions.</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "rgb(35, 54, 78)", textAlign: "center" }}>You want to reward</Text>
                                <View style={{ marginTop: 5, borderRadius: 3, borderColor: "#5c6bc0", borderWidth: 1 }}>
                                    <View style={{ padding: 10 }}>
                                        <View style={{ borderWidth: 1, borderColor: "grey", borderRadius: 5, marginBottom: 6 }}>
                                            <Picker style={{ height: 40, width: "100%", color: "rgb(35, 54, 78)" }}
                                                selectedValue={"Employees"}
                                            // onValueChange={(itemValue, itemPosition) =>
                                            //     this.setState({language: itemValue, choosenIndex: itemPosition})}
                                            >
                                                <Picker.Item label="Java" value="java" />
                                                <Picker.Item label="JavaScript" value="js" />
                                                <Picker.Item label="React Native" value="rn" />
                                            </Picker>
                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: "grey", borderRadius: 5 }}>
                                            <Picker style={{ height: 40, width: "100%", color: "rgb(35, 54, 78)" }}
                                                selectedValue={"Scores"}
                                            // selectedValue={this.state.language}
                                            // onValueChange={(itemValue, itemPosition) =>
                                            //     this.setState({language: itemValue, choosenIndex: itemPosition})}
                                            >
                                                <Picker.Item label="10 points" value="10" />
                                                <Picker.Item label="50 points" value="50" />
                                                <Picker.Item label="100 points" value="100" />
                                                <Picker.Item label="200 points" value="200" />
                                                <Picker.Item label="500 points" value="500" />
                                                <Picker.Item label="1000 points" value="1000" />
                                                <Picker.Item label="2000 points" value="2000" />
                                                <Picker.Item label="5000 points" value="5000" />
                                                <Picker.Item label="10000 points" value="10000" />
                                            </Picker>
                                        </View>
                                        <TextInput
                                            mode="outlined"
                                            label="Present *"
                                            numberOfLines={4}
                                            placeholder="Present *"
                                            onChangeText={text => setText(text)}
                                        />
                                        <TextInput
                                            multiline
                                            mode="outlined"
                                            label="Message"
                                            numberOfLines={4}
                                            placeholder="Message..."
                                            onChangeText={text => setText(text)}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "rgb(35, 54, 78)", textAlign: "center" }}>Why did you choose this person?</Text>
                                <View style={{ marginTop: 5, borderRadius: 3, borderColor: "#5c6bc0", borderWidth: 1 }}>
                                    <View style={{ padding: 10, flexDirection: "row" }}>
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            style={{
                                                width: "48%",
                                                borderWidth: 1,
                                                borderRadius: 3,
                                                borderColor: (checkWhy == 2) ? "#ff9900" : "#5c6bc0",
                                                backgroundColor: (checkWhy == 2) ? "#FFFF66" : "none",
                                                padding: 10,
                                                marginRight: 10
                                            }}

                                        //  onPress={handleCheckDomainPress}
                                        >
                                            <View style={{ padding: 5, borderBottomColor: "#5c6bc0", borderBottomWidth: 1 }}>
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "rgb(35, 54, 78)" }}>Clarity</Text>
                                            </View>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: REACT_APP_FILE + '/reward/leader_6.png' }}
                                                    style={{
                                                        width: '100%',
                                                        height: 100,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <Text style={{ fontSize: 14, textAlign: "center", color: "rgb(35, 54, 78)" }}>Great Inspirational Leadership</Text>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: REACT_APP_FILE + '/reward/leader_3.png' }}
                                                    style={{
                                                        width: '100%',
                                                        height: 70,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <Text style={{ fontSize: 14, textAlign: "center", color: "rgb(35, 54, 78)" }}>Growth Mindset</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            style={{
                                                width: "48%",
                                                borderWidth: 1,
                                                borderRadius: 3,
                                                borderColor: (checkWhy == 1) ? "#ff9900" : "#5c6bc0",
                                                backgroundColor: (checkWhy == 1) ? "#FFFF66" : "none",
                                                padding: 10
                                            }}

                                        //  onPress={handleCheckDomainPress}
                                        >
                                            <View style={{ padding: 5, borderBottomColor: "#5c6bc0", borderBottomWidth: 1 }}>
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "rgb(35, 54, 78)" }}>Courage</Text>
                                            </View>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: REACT_APP_FILE + '/reward/leader_1.png' }}
                                                    style={{
                                                        width: '100%',
                                                        height: 100,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <Text style={{ fontSize: 14, textAlign: "center", color: "rgb(35, 54, 78)" }}>Expressing and contributing yourself</Text>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: REACT_APP_FILE + '/reward/leader_2.png' }}
                                                    style={{
                                                        width: '100%',
                                                        height: 70,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <Text style={{ fontSize: 14, textAlign: "center", color: "rgb(35, 54, 78)" }}>Challenging development</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            style={{
                                                width: "48%",
                                                borderWidth: 1,
                                                borderRadius: 3,
                                                borderColor: (checkWhy == 3) ? "#ff9900" : "#5c6bc0",
                                                backgroundColor: (checkWhy == 3) ? "#FFFF66" : "none",
                                                padding: 10,
                                            }}

                                        //  onPress={handleCheckDomainPress}
                                        >
                                            <View style={{ padding: 5, borderBottomColor: "#5c6bc0", borderBottomWidth: 1 }}>
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "rgb(35, 54, 78)" }}>Humanity</Text>
                                            </View>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: REACT_APP_FILE + '/reward/leader_4.png' }}
                                                    style={{
                                                        width: '100%',
                                                        height: 100,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <Text style={{ fontSize: 14, textAlign: "center", color: "rgb(35, 54, 78)" }}>Helping people grow together</Text>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: REACT_APP_FILE + '/reward/leader_5.png' }}
                                                    style={{
                                                        width: '100%',
                                                        height: 70,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <Text style={{ fontSize: 14, textAlign: "center", color: "rgb(35, 54, 78)" }}>Excellent communication</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ textAlign: "center", color: "rgb(35, 54, 78)", fontSize: 14, padding: 10 }}>Your compliments will be approved by the admin and made visible to everyone</Text>
                                </View>
                                <View style={{ alignItems: "center", marginTop: 20 }}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 3,
                                            borderColor: "#ff9900",
                                            backgroundColor: "#FFFF66",
                                            width: "50%",
                                            padding: 10,
                                            alignItems: "center"
                                        }}

                                    //  onPress={handleCheckDomainPress}
                                    >
                                        <Text>PUBLISH</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </Modal>
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
export default CommendationScreen;
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    linearGradient2: {
        flex: 1,
        padding: 10,
    },
})