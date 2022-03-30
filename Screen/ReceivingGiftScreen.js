import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Dialog, Searchbar, List, TextInput, Button, FAB, Portal, Provider } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';

const ReceivigGiftScreen = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [avatar, setAvatar] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [id, setId] = useState('');
  const [render, setRender] = useState(false);
  const [state, setState] = React.useState({ open: false });
  const [loading, setLoading] = useState(false);
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const [presents, setPresents] = useState([]);
  const [checked, setChecked] = React.useState(0);
  const [search, setSearch] = useState(false);
  const [searchGift, setSearchGift] = useState([]);
  const getPresents = (token) => {
    setLoading(true);
    fetch('http://192.168.43.97:8000/api/present/getAllPresent', {
      method: "GET",
      headers: { "Authorization": `Bearer ` + token }
    })
      .then(response => response.json())
      .then(data => {
        setPresents(data.data.reverse());
        setLoading(false);
      });
  }
  const handleChangeChecked = (mess) => {
    var a = [];
    if (mess == 0) {
      setChecked(0);
      setSearch(false);
    } else if (mess == 1) {
      setChecked(1);
      setSearch(true);
      for (var i = 0; i < presents.length; i++) {
        if (presents[i].category_id == 1) {
          a.push(presents[i]);
        } else {
          setSearchGift([]);
        }
      }
    } else if (mess == 2) {
      setChecked(2);
      setSearch(true);
      for (var i = 0; i < presents.length; i++) {
        if (presents[i].category_id == 2) {
          a.push(presents[i]);
        } else {
          setSearchGift([]);
        }
      }
    } else {
      setChecked(3);
      setSearch(true);
      for (var i = 0; i < presents.length; i++) {
        if (presents[i].category_id == 3) {
          a.push(presents[i]);
        } else {
          setSearchGift([]);
        }
      }
    }
    setSearchGift(a);
  };
  const clickExchangeGift = (id) => {
    setLoading(true);
    fetch('http://192.168.43.97:8000/api/present/exchangePresent/' + id, {
      method: "GET",
      headers: { "Authorization": `Bearer ` + token }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          if (data.error == 'Service not supported !!!') {
            ToastAndroid.showWithGravityAndOffset('This gift is currently sold out !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
            setLoading(false);
          } else if (data.error == 'Not enough score !!!') {
            ToastAndroid.showWithGravityAndOffset('Not enough score !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
            setLoading(false);
          } else {
            ToastAndroid.showWithGravityAndOffset('Exchange failed !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
            setLoading(false);
          }
        }
        else {
          setRender(!render)
          ToastAndroid.showWithGravityAndOffset('Exchange successfully !!!', ToastAndroid.LONG, ToastAndroid.CENTER, 10, 10);
          setLoading(false);
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
        getPresents(token);
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
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row", marginBottom: 30, justifyContent: "center" }}>
            <View style={{ alignItems: "center", width: "24%" }}>
              <View style={{ backgroundColor: (checked == 0) ? "green" : "#e65100", borderRadius: 200 / 2, width: 55, height: 55, alignItems: "center", justifyContent: "center" }}>
                <Avatar.Image size={50} style={{ backgroundColor: (checked == 0) ? "rgb(42, 210, 95)" : "#ffb74d" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/gold.png' }} />
              </View>
              <Text onPress={() => handleChangeChecked(0)} style={{ color: "rgb(35, 54, 78)", fontWeight: "bold", fontSize: 16 }}>All Gifts</Text>
            </View>
            <View style={{ alignItems: "center", width: "24%" }}>
              <View style={{ backgroundColor: (checked == 1) ? "green" : "#e65100", borderRadius: 200 / 2, width: 55, height: 55, alignItems: "center", justifyContent: "center" }}>
                <Avatar.Image size={50} style={{ backgroundColor: (checked == 1) ? "rgb(42, 210, 95)" : "#ffb74d" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/food.png' }} />
              </View>
              <Text onPress={() => handleChangeChecked(1)} style={{ color: "rgb(35, 54, 78)", fontWeight: "bold", fontSize: 16 }}>Food</Text>
            </View>
            <View style={{ alignItems: "center", width: "24%" }}>
              <View style={{ backgroundColor: (checked == 2) ? "green" : "#e65100", borderRadius: 200 / 2, width: 55, height: 55, alignItems: "center", justifyContent: "center" }}>
                <Avatar.Image size={50} style={{ backgroundColor: (checked == 2) ? "rgb(42, 210, 95)" : "#ffb74d" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/gift.png' }} />
              </View>
              <Text onPress={() => handleChangeChecked(2)} style={{ color: "rgb(35, 54, 78)", fontWeight: "bold", fontSize: 16 }}>Artifacts</Text>
            </View>
            <View style={{ alignItems: "center", width: "24%" }}>
              <View style={{ backgroundColor: (checked == 3) ? "green" : "#e65100", borderRadius: 200 / 2, width: 55, height: 55, alignItems: "center", justifyContent: "center" }}>
                <Avatar.Image size={50} style={{ backgroundColor: (checked == 3) ? "rgb(42, 210, 95)" : "#ffb74d" }} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/reward/vourcher.png' }} />
              </View>
              <Text onPress={() => handleChangeChecked(3)} style={{ color: "rgb(35, 54, 78)", fontWeight: "bold", fontSize: 16 }}>Voucher</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center" }}>
            {
              !search ?
                presents.length ?
                  presents.map((item, index) => {
                    return (
                      <View  key={index} style={{ marginTop: 6, width: Dimensions.get('window').width / 2 - 13, padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 3, marginRight: (index % 2 != 0) ? 0 : 6 }}>
                        <View style={{ alignItems: "center" }}>
                          <Image
                            source={{ uri: 'http://192.168.43.97:8000/upload'+ '/present/image/' + item.image }}
                            style={{
                              width: '100%',
                              height: 100,
                              resizeMode: 'contain',
                              marginBottom: 4
                            }}
                          />
                          {
                            (item.status == 1) ?
                              null :
                              <View style={{ backgroundColor: "red", paddingTop: 4, paddingBottom: 4, paddingRight: 8, paddingLeft: 8, justifyContent: "center", borderRadius: 14, position: "absolute", marginLeft: 6, marginTop: 16, alignSelf: "flex-start" }}>
                                <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>Sold out</Text>
                              </View>
                          }

                          <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginBottom: 4, textAlign: "center" }}>{item.name ? item.name : null}</Text>
                          <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4, textAlign: "center" }}>{item.price ? item.price : null} đồng</Text>
                          <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", marginBottom: 4, textAlign: "center" }}>{item.score ? item.score : null} Points</Text>
                          <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4, textAlign: "center" }}>{item.description ? item.description : null}</Text>
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
                            onPress={() => clickExchangeGift(item.id)}
                          >
                            <Text style={{ color: "#ff9900", fontWeight: "bold" }}>EXCHANGE</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })
                  : null
                :
                searchGift.length ?
                  searchGift.map((item, index) => {
                    return (
                      <View key={index} style={{ marginTop: 6, width: Dimensions.get('window').width / 2 - 13, padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 3, marginRight: (index % 2 != 0) ? 0 : 6 }}>
                        <View style={{ alignItems: "center" }}>
                          <Image
                            source={{ uri: 'http://192.168.43.97:8000/upload'+ '/present/image/' + item.image }}
                            style={{
                              width: '100%',
                              height: 100,
                              resizeMode: 'contain',
                              marginBottom: 4
                            }}
                          />
                          {
                            (item.status == 1) ?
                              null :
                              <View style={{ backgroundColor: "red", paddingTop: 4, paddingBottom: 4, paddingRight: 8, paddingLeft: 8, justifyContent: "center", borderRadius: 14, position: "absolute", marginLeft: 6, marginTop: 16, alignSelf: "flex-start" }}>
                                <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>Sold out</Text>
                              </View>
                          }

                          <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginBottom: 4, textAlign: "center" }}>{item.name ? item.name : null}</Text>
                          <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4, textAlign: "center" }}>{item.price ? item.price : null} đồng</Text>
                          <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", marginBottom: 4, textAlign: "center" }}>{item.score ? item.score : null} Points</Text>
                          <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4, textAlign: "center" }}>{item.description ? item.description : null}</Text>
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
                            onPress={() => clickExchangeGift(item.id)}
                          >
                            <Text style={{ color: "#ff9900", fontWeight: "bold" }}>EXCHANGE</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })
                  :
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 32, fontWeight: "bold" }}>No data found</Text>
                  </View>
            }
          </View>
        </View>
      </ScrollView>
      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? 'gift' : 'plus'}
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
                icon: 'car',
                label: 'Delivering',
                onPress: () => navigation.replace('DeliveringScreen'),
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
      : <Loader loading={loading} />
  );
};
export default ReceivigGiftScreen;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
})