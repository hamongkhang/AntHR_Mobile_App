import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Modal, Picker, ToastAndroid, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, TextInput, FAB, Portal, Provider, IconButton } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';
import moment from 'moment';

const CommendationScreen = ({ navigation }) => {
    const [token, setToken] = useState('');
    const [avatar, setAvatar] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [id, setId] = useState('');
    const [render, setRender] = useState(false);
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [checkWhy, setCheckWhy] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [users, setUsers] = useState([]);
    const [myScore, setMyScore] = useState([]);
    const [praiseGet, setPraiseGet] = useState([]);
    const [like, setLike] = useState([]);
    const [comment, setComment] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const [addComment, setAddComment] = useState({ praise_id: "", messeger: "" });
    const getEmployees = (token) => {
        setLoading(true);
        fetch('http://192.168.43.97:8000/api/employee/getAllEmployee', {
            method: "GET",
            headers: { "Authorization": `Bearer ` + token }
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data.data[0].reverse());
                setEmployees(data.data[1].reverse());
            });
    }
    const getPoints = (token) => {
        setLoading(true);
        fetch('http://192.168.43.97:8000/api/score/getOneScore', {
            method: "GET",
            headers: { "Authorization": `Bearer ` + token }
        })
            .then(response => response.json())
            .then(data => {
                setMyScore(data.data);
            });
    }
    const [praise, setPraise] = useState({
        image: '',
        recipient: '',
        message: '',
        score: '',
        present: '',
        cheer: ''
    });
    const [error, setError] = useState({
        image: null,
        recipient: null,
        message: null,
        score: null,
        present: null,
        cheer: null
    });
    const onSelectEmployees = (id) => {
        setPraise({ ...praise, ['recipient']: id });
    }
    const onSelectCheer = (mess) => {
        setPraise({ ...praise, ["cheer"]: mess });
        if (mess == "Great Inspirational Leadership,Growth Mindset") {
            setCheckWhy(1);
        } else if (mess == "Expressing and contributing yourself,Challenging development") {
            setCheckWhy(2);
        } else if (mess == "Helping people grow together,Excellent communication") {
            setCheckWhy(3);
        }
    }
    const onAddPraises = (e) => {
        setLoading(true);
        const _formData = new FormData();
        _formData.append('image', praise.image);
        _formData.append('recipient', praise.recipient);
        _formData.append('message', praise.message);
        _formData.append('score', praise.score);
        _formData.append('present', praise.present);
        _formData.append('cheer', praise.cheer);
        const requestOptions = {
            method: 'POST',
            body: _formData,
            headers: { "Authorization": `Bearer ` + token }
        };
        fetch('http://192.168.43.97:8000/api/praise/createPraise', requestOptions)
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    if (json.error == 'Score not found!!!') {
                        ToastAndroid.showWithGravityAndOffset('Your score is still not enough !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
                        setError('');
                        setLoading(false);
                    } else {
                        setError(json.error);
                        setLoading(false);
                    }
                } else {
                    ToastAndroid.showWithGravityAndOffset('Congratulations, Successfully !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
                    setError('');
                    setRender(!render);
                    setLoading(false);
                    setShowModal(false);
                }
            });
    };
    const getLike = (token) => {
        setLoading(true);
        fetch('http://192.168.43.97:8000/api/praise/getAllLike', {
            method: "GET",
            headers: { "Authorization": `Bearer ` + token }
        })
            .then(response => response.json())
            .then(data => {
                setLike(data.data.reverse());
            });
    }
    const getComment = (token) => {
        setLoading(true);
        fetch('http://192.168.43.97:8000/api/praise/getAllComment', {
            method: "GET",
            headers: { "Authorization": `Bearer ` + token }
        })
            .then(response => response.json())
            .then(data => {
                setComment(data.data);
            });
    }
    const getPraise = (token) => {
        setLoading(true);
        fetch('http://192.168.43.97:8000/api/praise/getAllPraise', {
            method: "GET",
            headers: { "Authorization": `Bearer ` + token }
        })
            .then(response => response.json())
            .then(data => {
                setPraiseGet(data.data.reverse());
            });
    }
    const sumLike = (id) => {
        var sum = 0;
        like.map((item) => {
            if (item.praise_id == id) {
                sum = sum + 1;
            }
        })
        return sum;
    }
    const sumComment = (id) => {
        var sum = 0;
        comment.map((item) => {
            if (item.praise_id == id) {
                sum = sum + 1;
            }
        })
        return sum;
    }
    const checkLike = (idGet) => {
        var kt = false;
        like.map((item) => {
            if ((item.user_id == id) && (item.praise_id == idGet)) {
                kt = true;
            }
        })
        return kt;
    }
    const onChangeAddLike = (id) => {
        setLoading(true);
        const _formData = new FormData();
        _formData.append('praise_id', id);
        const requestOptions = {
            method: 'POST',
            body: _formData,
            headers: { "Authorization": `Bearer ` + token }
        };
        fetch('http://192.168.43.97:8000/api/praise/createLike', requestOptions)
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    setLoading(false);
                } else {
                    setRender(!render);
                    setLoading(false);
                }
            });
    };
    const onAddComment = (id) => {
        const _formData = new FormData();
        _formData.append('praise_id', addComment.praise_id);
        _formData.append('messeger', addComment.messeger);
        const requestOptions = {
            method: 'POST',
            body: _formData,
            headers: { "Authorization": `Bearer ` + token }
        };
        fetch('http://192.168.43.97:8000/api/praise/createComment', requestOptions)
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    setLoading(false);
                } else {
                    setRender(!render);
                    setLoading(false);
                }
            });
    };
    const onClickAddComment = (id) => {
        setAddComment({ ...addComment, ["praise_id"]: id });
        setShowComment(!showComment);
    }
    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await AsyncStorage.getItem("access_token");
                const id_user = await AsyncStorage.getItem("id");
                const avatar_user = await AsyncStorage.getItem("avatar");
                const last_name = await AsyncStorage.getItem("last_name");
                const first_name = await AsyncStorage.getItem("first_name");
                getEmployees(token);
                getPoints(token);
                getComment(token);
                getLike(token);
                getPraise(token);
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
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [render]);
    return (
        !loading?
        <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
            <Loader loading={loading} />
            {(showModal || showComment)
                ?
                null :
                <ScrollView>
                    {
                        praiseGet.length
                            ?
                            praiseGet.map((item,index) => {
                                if (item.status == 1) {
                                    return (
                                        <View key={index} style={{ padding: 10, paddingTop: 10 }}>
                                            <View style={{ padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 5, paddingBottom: 16, boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px" }}>
                                                <View style={{ alignItems: "center", flexDirection: "row" }}>
                                                    <View style={{ width: "20%" }}>
                                                        {employees.length ?
                                                            employees.map((itemUser,index2) => {
                                                                if (itemUser.user_id == item.author) {
                                                                    if (itemUser.avatar) {
                                                                        console.warn(itemUser.avatar)

                                                                        if (itemUser.avatar.search('https://') != -1) {
                                                                            return (
                                                                                <Avatar.Image key={index2}  size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: itemUser.avatar }} />
                                                                            );
                                                                        } else {
                                                                            return (
                                                                                <Avatar.Image key={index2+1} size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/' + itemUser.avatar }} />
                                                                            );
                                                                        }
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <Avatar.Image key={index2+2} size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/avatar.png' }} />
                                                                        );
                                                                    }
                                                                } else {
                                                                    return (
                                                                        null
                                                                    );
                                                                }
                                                            }
                                                            )
                                                            : null
                                                        }
                                                    </View>
                                                    <View style={{ width: "80%" }}>
                                                        <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>
                                                            {employees.length ?
                                                                employees.map((itemUser,index2) => {
                                                                    if (itemUser.user_id == item.author) {
                                                                        return (
                                                                            itemUser.last_name + " " + itemUser.first_name + " "
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            null
                                                                        )
                                                                    }
                                                                })
                                                                : null
                                                            }
                                                            <Text style={{ fontSize: 16, fontWeight: "normal" }}> đã khen thưởng </Text>
                                                            {employees.length ?
                                                                employees.map((itemUser) => {
                                                                    if (itemUser.user_id == item.recipient) {
                                                                        return (
                                                                            " " + itemUser.last_name + " " + itemUser.first_name
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            null
                                                                        )
                                                                    }
                                                                })
                                                                : null
                                                            }
                                                        </Text>
                                                        <Text style={{ fontSize: 12, color: "rgb(35, 54, 78)" }}>{moment(item.updated_at).fromNow()}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: "center", flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
                                                    <View style={{ alignItems: "center", width: "40%" }}>
                                                        {employees.length ?
                                                            employees.map((itemUser,index3) => {
                                                                if (itemUser.user_id == item.author) {
                                                                    if (itemUser.avatar) {
                                                                        if (itemUser.avatar.search('https://') != -1) {
                                                                            return (
                                                                                <Avatar.Image key={index3} size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: itemUser.avatar }} />
                                                                            );
                                                                        } else {
                                                                            return (
                                                                                <Avatar.Image key={index3+1} size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/' + itemUser.avatar }} />
                                                                            );
                                                                        }
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <Avatar.Image key={index3+2} size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/avatar.png' }} />
                                                                        );
                                                                    }
                                                                } else {
                                                                    return (
                                                                        null
                                                                    );
                                                                }
                                                            }
                                                            )
                                                            : null
                                                        }
                                                        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", color: "rgb(35, 54, 78)", marginTop: 10 }}>
                                                            {employees.length ?
                                                                employees.map((itemUser) => {
                                                                    if (itemUser.user_id == item.author) {
                                                                        return (
                                                                            itemUser.last_name + " " + itemUser.first_name + " "
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            null
                                                                        )
                                                                    }
                                                                })
                                                                : null
                                                            }
                                                        </Text>
                                                        <Text style={{ textAlign: "center", fontSize: 12, color: "rgb(35, 54, 78)", marginTop: 5 }}>Executive Cum Legal Assistant Consultant Employee</Text>
                                                    </View>
                                                    <View style={{ alignItems: "center", width: "16%", marginLeft: 10, marginRight: 10 }}>
                                                        <Avatar.Image size={70} style={{ backgroundColor: "white" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/gold.png' }} />
                                                    </View>
                                                    <View style={{ alignItems: "center", width: "40%" }}>
                                                        {employees.length ?
                                                            employees.map((itemUser,index4) => {
                                                                if (itemUser.user_id == item.recipient) {
                                                                    if (itemUser.avatar) {
                                                                        if (itemUser.avatar.search('https://') != -1) {
                                                                            return (
                                                                                <Avatar.Image key={index4+1} size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: itemUser.avatar }} />
                                                                            );
                                                                        } else {
                                                                            return (
                                                                                <Avatar.Image key={index4+2} size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/' + itemUser.avatar }} />
                                                                            );
                                                                        }
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <Avatar.Image key={index4+3} size={45} style={{ backgroundColor: "#edf8f1" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/avatar.png' }} />
                                                                        );
                                                                    }
                                                                } else {
                                                                    return (
                                                                        null
                                                                    );
                                                                }
                                                            }
                                                            )
                                                            : null
                                                        }
                                                        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", color: "rgb(35, 54, 78)", marginTop: 10 }}>
                                                            {employees.length ?
                                                                employees.map((itemUser) => {
                                                                    if (itemUser.user_id == item.recipient) {
                                                                        return (
                                                                            itemUser.last_name + " " + itemUser.first_name + " "
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            null
                                                                        )
                                                                    }
                                                                })
                                                                : null
                                                            }
                                                        </Text>
                                                        <Text style={{ textAlign: "center", fontSize: 12, color: "rgb(35, 54, 78)", marginTop: 5 }}>Manager Programme Development(Partnership)</Text>
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: "center", marginBottom: 10 }}>
                                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "green" }}>+ {item.score ? item.score : null} Points</Text>
                                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "green" }}>+ {item.present ? item.present : null}</Text>
                                                </View>
                                                <View style={{ marginBottom: 10 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "rgb(35, 54, 78)" }}>{item.message ? item.message : null}</Text>
                                                </View>
                                                <View style={{ marginBottom: 10, alignItems: "center", flexDirection: "row" }}>
                                                    <View style={{ width: "26%", marginRight: 10 }}>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "rgb(35, 54, 78)", backgroundColor: "#a7ffeb", padding: 7, borderRadius: 5 }}>Achievements</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row", width: "65%", alignItems: "center" }}>
                                                        <Avatar.Image size={28} style={{ backgroundColor: "white" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/value.png' }} />
                                                        <Text style={{ fontSize: 12, color: "rgb(35, 54, 78)", marginLeft: 5 }}>{item.cheer ? item.cheer : " - "}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    {
                                                        (checkLike(item.id) == true)
                                                            ?
                                                            <IconButton
                                                                icon="hand"
                                                                color={"blue"}
                                                                size={30}
                                                            />
                                                            :
                                                            <IconButton
                                                                icon="hand"
                                                                color={"grey"}
                                                                size={30}
                                                                onPress={() => onChangeAddLike(item.id)}
                                                            />
                                                    }
                                                    <Text style={{ marginLeft: -10, marginRight: 10 }}>{(sumLike(item.id) != 0) ? sumLike(item.id) + " Likes" : "0 Like"}</Text>
                                                    <IconButton
                                                        icon="comment"
                                                        color={"grey"}
                                                        size={30}
                                                        onPress={() => onClickAddComment(item.id)}
                                                    />
                                                    <Text style={{ marginLeft: -10, marginRight: 10 }}>{(sumComment(item.id) != 0) ? sumComment(item.id) + " Comments" : "0 Comment"}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                            })
                            :
                            null
                    }
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
                                onPress={() => setShowModal(!showModal)} style={{ marginRight: "auto", marginBottom: 5 }} />
                            <View>
                                <Text style={{ fontSize: 24, color: "#ff9900", lineHeight: 24, fontWeight: "bold", textAlign: "center" }}>Internal Reward Portal</Text>
                                <Text style={{ fontSize: 14, marginTop: 10, color: "rgb(35, 54, 78)", lineHeight: 20, fontWeight: "bold", textAlign: "center" }}>Appreciate the positive contributions of your colleagues here!</Text>
                            </View>
                            <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                {
                                    (avatar == "null")
                                        ?
                                        <Avatar.Image size={35} style={{ backgroundColor: "#edf8f1", marginRight: 10 }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/avatar.png' }} />
                                        :
                                        (avatar.search('https://') != -1)
                                            ?
                                            <Avatar.Image size={35} style={{ backgroundColor: "#edf8f1", marginRight: 10 }} source={{ uri: avatar }} />
                                            :
                                            <Avatar.Image size={35} style={{ backgroundColor: "#edf8f1", marginRight: 10 }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/' + avatar }} />
                                }
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "rgb(35, 54, 78)" }}>{"Hello, " + lastName + " " + firstName}</Text>
                            </View>
                            <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: "48%", backgroundColor: "#dcedc8", justifyContent: "center", marginRight: 10, padding: 5, borderRadius: 3 }}>
                                    <Text style={{ textAlign: "center", fontSize: 12 }}>Recognition Points Redeemed</Text>
                                    <Text style={{ textAlign: "center", fontSize: 16, color: "#4caf50", fontWeight: "bold" }}>{myScore.gift ? myScore.gift : 0} Points</Text>
                                    <Text style={{ textAlign: "center", fontSize: 8 }}>Please reward colleagues or exchange gifts.</Text>
                                    <Text style={{ textAlign: "center", fontSize: 8, color: "#ef5350" }}>Expiration Date: 31/12/2030</Text>
                                </View>
                                <View style={{ width: "48%", backgroundColor: "#b2ebf2", justifyContent: "center", padding: 5, borderRadius: 3 }}>
                                    <Text style={{ textAlign: "center", fontSize: 12 }}>Recognition Coins</Text>
                                    <Text style={{ textAlign: "center", fontSize: 16, color: "#03a9f4", fontWeight: "bold" }}>{myScore.score ? myScore.score : 0} Points</Text>
                                    <Text style={{ textAlign: "center", fontSize: 8 }}>Get special offers and rewards packages, discount codes and travel packages.</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 5, alignItems: "center" }}>
                                <View style={{ backgroundColor: "#ffe0b2", justifyContent: "center", padding: 5, borderRadius: 3 }}>
                                    <Text style={{ textAlign: "center", fontSize: 12 }}>Recognition Points Spent</Text>
                                    <Text style={{ textAlign: "center", fontSize: 16, color: "#f4511e", fontWeight: "bold" }}>{myScore.score_spent ? myScore.score_spent : 0} Points</Text>
                                    <Text style={{ textAlign: "center", fontSize: 8 }}>This is the score you have awarded to your friends after positive contributions.</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "rgb(35, 54, 78)", textAlign: "center" }}>You want to reward</Text>
                                <View style={{ marginTop: 5, borderRadius: 3, borderColor: "#5c6bc0", borderWidth: 1 }}>
                                    <View style={{ padding: 10 }}>
                                        <View style={{ borderWidth: 1, borderColor: "grey", borderRadius: 5, marginBottom: 6 }}>
                                            <Picker style={{ height: 40, width: "100%", color: "rgb(35, 54, 78)" }}
                                                onValueChange={(itemValue, itemLabel) => onSelectEmployees(itemValue)}
                                            >
                                                {
                                                    employees.length
                                                        ?
                                                        employees.map((item,index) => {
                                                            if (item.user_id != id) {
                                                                return (
                                                                    <Picker.Item key={index} label={item.last_name + " " + item.first_name + " ( " + item.email + " ) "} value={item.user_id} />
                                                                )
                                                            }
                                                        })
                                                        :
                                                        null
                                                }
                                            </Picker>
                                        </View>
                                        {error.recipient != '' ? (
                                            <Text style={{ color: 'red', textAlign: 'center', fontSize: 14, marginBottom: 10 }}>
                                                {error.recipient}
                                            </Text>
                                        ) : null}
                                        <View style={{ borderWidth: 1, borderColor: "grey", borderRadius: 5 }}>
                                            <Picker style={{ height: 40, width: "100%", color: "rgb(35, 54, 78)" }}
                                                onValueChange={(itemValue, itemLabel) => setPraise({ ...praise, ['score']: itemValue })}
                                            >
                                                <Picker.Item label="10 points" value={10} />
                                                <Picker.Item label="50 points" value={50} />
                                                <Picker.Item label="100 points" value={100} />
                                                <Picker.Item label="200 points" value={200} />
                                                <Picker.Item label="500 points" value={500} />
                                                <Picker.Item label="1000 points" value={1000} />
                                                <Picker.Item label="2000 points" value={2000} />
                                                <Picker.Item label="5000 points" value={5000} />
                                                <Picker.Item label="10000 points" value={10000} />
                                            </Picker>
                                        </View>
                                        {error.score != '' ? (
                                            <Text style={{ color: 'red', textAlign: 'center', fontSize: 14, marginBottom: 10 }}>
                                                {error.score}
                                            </Text>
                                        ) : null}
                                        <TextInput
                                            mode="outlined"
                                            label="Present *"
                                            numberOfLines={4}
                                            placeholder="Present *"
                                            onChangeText={(text) => setPraise({ ...praise, ['present']: text })}
                                        />
                                        {error.present != '' ? (
                                            <Text style={{ color: 'red', textAlign: 'center', fontSize: 14, marginBottom: 10 }}>
                                                {error.present}
                                            </Text>
                                        ) : null}
                                        <TextInput
                                            multiline
                                            mode="outlined"
                                            label="Message"
                                            numberOfLines={4}
                                            placeholder="Message..."
                                            onChangeText={(text) => setPraise({ ...praise, ['message']: text })} />
                                        {error.message != '' ? (
                                            <Text style={{ color: 'red', textAlign: 'center', fontSize: 14, marginBottom: 10 }}>
                                                {error.message}
                                            </Text>
                                        ) : null}
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
                                                borderColor: (checkWhy == 1) ? "#ff9900" : "#5c6bc0",
                                                backgroundColor: (checkWhy == 1) ? "#FFFF66" : "none",
                                                padding: 10,
                                                marginRight: 10
                                            }}
                                            onPress={() => onSelectCheer("Great Inspirational Leadership,Growth Mindset")}
                                        >
                                            <View style={{ padding: 5, borderBottomColor: "#5c6bc0", borderBottomWidth: 1 }}>
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "rgb(35, 54, 78)" }}>Clarity</Text>
                                            </View>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/leader_6.png' }}
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
                                                    source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/leader_3.png' }}
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
                                                borderColor: (checkWhy == 2) ? "#ff9900" : "#5c6bc0",
                                                backgroundColor: (checkWhy == 2) ? "#FFFF66" : "none",
                                                padding: 10
                                            }}
                                            onPress={() => onSelectCheer("Expressing and contributing yourself,Challenging development")}
                                        >
                                            <View style={{ padding: 5, borderBottomColor: "#5c6bc0", borderBottomWidth: 1 }}>
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "rgb(35, 54, 78)" }}>Courage</Text>
                                            </View>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/leader_1.png' }}
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
                                                    source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/leader_2.png' }}
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
                                            onPress={() => onSelectCheer("Helping people grow together,Excellent communication")}
                                        >
                                            <View style={{ padding: 5, borderBottomColor: "#5c6bc0", borderBottomWidth: 1 }}>
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "rgb(35, 54, 78)" }}>Humanity</Text>
                                            </View>
                                            <View style={{ alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/leader_4.png' }}
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
                                                    source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/leader_5.png' }}
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
                                    {error.cheer != '' ? (
                                        <Text style={{ color: 'red', textAlign: 'center', fontSize: 14, marginBottom: 10 }}>
                                            {error.cheer}
                                        </Text>
                                    ) : null}
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
                                        onPress={() => onAddPraises()}
                                    >
                                        <Text style={{ color: "#ff9900", fontWeight: "bold" }}>PUBLISH</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </Modal>
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={showComment}
            >
                <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient2}>
                    <ScrollView>
                        <View style={{ padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 5, paddingBottom: 16, height: Dimensions.get('window').height }}>
                            <IconButton
                                icon="close"
                                color={"red"}
                                size={25}
                                onPress={() => setShowComment(!showComment)} style={{ marginRight: "auto", marginBottom: 5}} />
                            {
                                comment.length
                                    ?
                                    comment.map((itemComment,index) => {
                                        if (itemComment.praise_id == addComment.praise_id) {
                                            return (
                                                <View key={index} style={{ marginTop: 15, flexDirection: "row", alignItems: "center", paddingLeft: 20, paddingRight: 20 }}>
                                                    <View style={{ marginRight: 10, justifyContent: "center", width: "15%" }}>
                                                        {employees.map((itemEmployee,index2) => {
                                                            if (itemComment.user_id == itemEmployee.user_id) {
                                                                if (itemEmployee.avatar) {
                                                                    if (itemEmployee.avatar.search('https://') !== -1) {
                                                                        return (
                                                                            <Avatar.Image key={index2+1} size={40} style={{ backgroundColor: "#edf8f1", marginRight: 10 }} source={{ uri: itemEmployee.avatar }} />
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <Avatar.Image key={index2+2} size={40} style={{ backgroundColor: "#edf8f1", marginRight: 10 }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/' + itemEmployee.avatar }} />
                                                                        );
                                                                    }
                                                                }
                                                                else {
                                                                    return (
                                                                        <Avatar.Image key={index2+3} size={40} style={{ backgroundColor: "#edf8f1", marginRight: 10 }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/avatar.png' }} />
                                                                    );
                                                                }
                                                            } else {
                                                                return (
                                                                    null
                                                                )
                                                            }
                                                        })}
                                                    </View>
                                                    <View style={{ width: "80%", marginRight: 10, justifyContent: "center", borderRadius: 5, backgroundColor: "#eeeeee", padding: 5, borderColor: "#e0e0e0", borderWidth: 1 }}>
                                                        <Text style={{ fontSize: 14, color: "rgb(79, 94, 113)" }}>{itemComment.messeger}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                    })
                                    : null
                            }
                            <View style={{ marginTop: "auto", marginBottom: 10, flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: "80%" }}>
                                    <TextInput
                                        mode="outlined"
                                        label="Message"
                                        placeholder="Message..."
                                        onChangeText={(text) => setAddComment({ ...addComment, ['messeger']: text })}
                                    />
                                </View>
                                <View style={{ width: "18%" }}>
                                    <IconButton
                                        icon="send"
                                        color={"#ff9900"}
                                        size={50}
                                        onPress={() => onAddComment()}
                                        style={{ marginRight: "auto", marginBottom: 5 }}
                                    />
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
                                onPress: () => setState({ open: false })
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
                                onPress: () => setShowModal(!showModal),
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
        :
        <Loader loading={loading} />
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