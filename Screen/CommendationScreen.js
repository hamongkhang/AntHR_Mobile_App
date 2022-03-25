import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Modal, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Dialog, Searchbar, List, TextInput, Button, FAB, Portal, Provider } from 'react-native-paper';
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
    const [showModal, setShowModal] = useState(true);
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
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 10, paddingTop: 16, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 5, paddingBottom: 16 }}>
                            <View style={{ padding: 20 }}>
                                <Text style={{ fontSize: 24, color: "#ff9900", lineHeight: 20, fontWeight: "bold", textAlign: "center" }}>Internal Reward Portal</Text>
                                <Text style={{ fontSize: 16, marginTop: 10, color: "rgb(35, 54, 78)", lineHeight: 20, fontWeight: "bold", textAlign: "center" }}>Appreciate the positive contributions of your colleagues here!</Text>
                            </View>
                            <View style={{ padding: 20 }}>
                                {
                                    (avatar == "null")
                                        ?
                                        <Avatar.Image size={35} style={{ backgroundColor: "#edf8f1", marginLeft: "auto", marginRight: 10 }} source={{ uri: REACT_APP_FILE + '/avatar/avatar.png' }} />
                                        :
                                        (avatar.search('https://') != -1)
                                            ?
                                            <Avatar.Image size={35} style={{ backgroundColor: "#edf8f1", marginLeft: "auto", marginRight: 10 }} source={{ uri: avatar }} />
                                            :
                                            <Avatar.Image size={35} style={{ backgroundColor: "#edf8f1", marginLeft: "auto", marginRight: 10 }} source={{ uri: REACT_APP_FILE + '/avatar/' + avatar }} />
                                }
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
            }

            <Modal
                animationType={'slide'}
                transparent={true}
                visible={showModal}
            >
                <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient2}>
                    <ScrollView>
                        <View style={{ padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 5, paddingBottom: 16 }}>
                            <Button icon="close" color="red" onPress={() => setShowModal(!showModal)} style={{ marginRight: "auto", marginBottom: 5 }} />
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
                                        <View style={{borderWidth:1,borderColor:"grey",borderRadius:5,marginBottom:6}}>
                                        <Picker style={{ height: 40, width: "100%", color: "rgb(35, 54, 78)"}}
                                             selectedValue={"Employees"}
                                            // onValueChange={(itemValue, itemPosition) =>
                                            //     this.setState({language: itemValue, choosenIndex: itemPosition})}
                                        >
                                            <Picker.Item  label="Java" value="java" />
                                            <Picker.Item  label="JavaScript" value="js" />
                                            <Picker.Item  label="React Native" value="rn" />
                                        </Picker>
                                        </View>
                                        <View style={{borderWidth:1,borderColor:"grey",borderRadius:5}}>
                                        <Picker style={{ height: 40, width: "100%", color: "rgb(35, 54, 78)"}}
                                            selectedValue={"Scores"}
                                            // selectedValue={this.state.language}
                                            // onValueChange={(itemValue, itemPosition) =>
                                            //     this.setState({language: itemValue, choosenIndex: itemPosition})}
                                        >
                                            <Picker.Item  label="10 points" value="10" />
                                            <Picker.Item  label="50 points" value="50" />
                                            <Picker.Item  label="100 points" value="100" />
                                            <Picker.Item  label="200 points" value="200" />
                                            <Picker.Item  label="500 points" value="500" />
                                            <Picker.Item  label="1000 points" value="1000" />
                                            <Picker.Item  label="2000 points" value="2000" />
                                            <Picker.Item  label="5000 points" value="5000" />
                                            <Picker.Item  label="10000 points" value="10000" />
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
                                    <View style={{ padding: 10,flexDirection:"row" }}>
                                        <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={{
                                            width:"48%",
                                            borderWidth:1,
                                            borderRadius:3,
                                            borderColor:(checkWhy==2)?"#ff9900":"#5c6bc0",
                                            backgroundColor:(checkWhy==2)?"#FFFF66":"none",
                                            padding:10,
                                            marginRight:10
                                        }}

                                       //  onPress={handleCheckDomainPress}
                                         >
                                             <View style={{padding:5,borderBottomColor:"#5c6bc0",borderBottomWidth:1}}>
                                                 <Text style={{textAlign:"center",fontWeight:"bold",fontSize:18,color:"rgb(35, 54, 78)"}}>Clarity</Text>
                                             </View>
                                             <View style={{alignItems:"center"}}>
                                             <Image
                                                 source={{uri:REACT_APP_FILE+'/reward/leader_6.png'}}
                                                 style={{
                                                   width: '100%',
                                                   height: 100,
                                                        resizeMode: 'contain',
                                                   }}
                                                 />
                                                 </View>
                                                 <Text style={{fontSize:14,textAlign:"center",color:"rgb(35, 54, 78)"}}>Great Inspirational Leadership</Text>
                                                 <View style={{alignItems:"center"}}>
                                                 <Image
                                                 source={{uri:REACT_APP_FILE+'/reward/leader_3.png'}}
                                                 style={{
                                                   width: '100%',
                                                   height: 70,
                                                   resizeMode: 'contain',
                                                   }}
                                                 />
                                                 </View>
                                                 <Text style={{fontSize:14,textAlign:"center",color:"rgb(35, 54, 78)"}}>Growth Mindset</Text>
                                     </TouchableOpacity>
                                      <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={{
                                            width:"48%",
                                            borderWidth:1,
                                            borderRadius:3,
                                            borderColor:(checkWhy==1)?"#ff9900":"#5c6bc0",
                                            backgroundColor:(checkWhy==1)?"#FFFF66":"none",
                                            padding:10
                                        }}

                                       //  onPress={handleCheckDomainPress}
                                         >
                                             <View style={{padding:5,borderBottomColor:"#5c6bc0",borderBottomWidth:1}}>
                                                 <Text style={{textAlign:"center",fontWeight:"bold",fontSize:18,color:"rgb(35, 54, 78)"}}>Courage</Text>
                                             </View>
                                             <View style={{alignItems:"center"}}>
                                             <Image
                                                 source={{uri:REACT_APP_FILE+'/reward/leader_1.png'}}
                                                 style={{
                                                   width: '100%',
                                                   height: 100,
                                                        resizeMode: 'contain',
                                                   }}
                                                 />
                                                 </View>
                                                 <Text style={{fontSize:14,textAlign:"center",color:"rgb(35, 54, 78)"}}>Expressing and contributing yourself</Text>
                                                 <View style={{alignItems:"center"}}>
                                                 <Image
                                                 source={{uri:REACT_APP_FILE+'/reward/leader_2.png'}}
                                                 style={{
                                                   width: '100%',
                                                   height: 70,
                                                   resizeMode: 'contain',
                                                   }}
                                                 />
                                                 </View>
                                                 <Text style={{fontSize:14,textAlign:"center",color:"rgb(35, 54, 78)"}}>Challenging development</Text>
                                     </TouchableOpacity>
                                    </View>
                                    <View style={{ padding: 10,alignItems:"center" }}>
                                        <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={{
                                            width:"48%",
                                            borderWidth:1,
                                            borderRadius:3,
                                            borderColor:(checkWhy==3)?"#ff9900":"#5c6bc0",
                                            backgroundColor:(checkWhy==3)?"#FFFF66":"none",
                                            padding:10,
                                        }}

                                       //  onPress={handleCheckDomainPress}
                                         >
                                             <View style={{padding:5,borderBottomColor:"#5c6bc0",borderBottomWidth:1}}>
                                                 <Text style={{textAlign:"center",fontWeight:"bold",fontSize:18,color:"rgb(35, 54, 78)"}}>Humanity</Text>
                                             </View>
                                             <View style={{alignItems:"center"}}>
                                             <Image
                                                 source={{uri:REACT_APP_FILE+'/reward/leader_4.png'}}
                                                 style={{
                                                   width: '100%',
                                                   height: 100,
                                                        resizeMode: 'contain',
                                                   }}
                                                 />
                                                 </View>
                                                 <Text style={{fontSize:14,textAlign:"center",color:"rgb(35, 54, 78)"}}>Helping people grow together</Text>
                                                 <View style={{alignItems:"center"}}>
                                                 <Image
                                                 source={{uri:REACT_APP_FILE+'/reward/leader_5.png'}}
                                                 style={{
                                                   width: '100%',
                                                   height: 70,
                                                   resizeMode: 'contain',
                                                   }}
                                                 />
                                                 </View>
                                                 <Text style={{fontSize:14,textAlign:"center",color:"rgb(35, 54, 78)"}}>Excellent communication</Text>
                                     </TouchableOpacity>
                                    </View>
                                    <Text style={{textAlign:"center",color:"rgb(35, 54, 78)",fontSize:14,padding:10}}>Your compliments will be approved by the admin and made visible to everyone</Text>
                                </View>
                                <View style={{alignItems:"center",marginTop:20}}>
                                <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={{
                                            borderWidth:1,
                                            borderRadius:3,
                                            borderColor:"#ff9900",
                                            backgroundColor:"#FFFF66",
                                            width:"50%",
                                            padding:10,
                                            alignItems:"center"
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