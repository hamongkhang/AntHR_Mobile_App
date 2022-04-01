import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Dialog } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';


const AccountScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showTab, setShowTab] = useState(1)
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const getInforEmployee = (token, id) => {
    setLoading(true);
    fetch('http://192.168.43.97:8000/api/employee/getAllEmployee', {
      method: "GET",
      headers: { "Authorization": `Bearer ` + token }
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data.data[0]);
        setEmployees(data.data[1]);
        setLoading(false)
      });
  }

  const onChangeTab = (value) => {
    setShowTab(value);
  }
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const id_user = await AsyncStorage.getItem("id");
        setId(id_user);
        getInforEmployee(token, id_user);
      } catch (err) {
        console.log(err);
      }
    }
    getToken();
  }, []);
  return (
    !loading?
    <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
      <View style={styles.mainBody}>
        <Loader loading={loading} />
        {
          employees.length ?
            employees.map((item,index) => {
              if (item.user_id == id) {
                return (
                  <>
                    <View style={styles.header}>
                      {item.avatar
                        ?
                        (item.avatar.search('https://') != -1)
                          ?
                          <Avatar.Image size={80} source={{ uri: item.avatar }} />
                          :
                          <Avatar.Image size={80} source={{ uri: 'http://192.168.43.97:8000/upload' + '/avatar/' + item.avatar }} />
                        :
                        <Avatar.Image size={80} source={{ uri: 'http://192.168.43.97:8000/upload'+ '/avatar/avatar.png' }} />
                      }
                      <Text style={styles.name_header}>{item.last_name + " " + item.first_name}</Text>
                      <Text style={styles.email_header}>{item.email}</Text>
                    </View>
                    <View  style={styles.body}>
                      <View style={{ backgroundColor: "#ffa000", flexDirection: 'row', opacity: 1, borderRadius: 5, marginLeft: 10, marginRight: 10 }}>
                        {
                          (showTab == 1)
                            ?
                            <View
                              style={{
                                width: "25%",
                                alignItems: "center",
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderBottomWidth: 4,
                                borderBottomColor: "#edf8f1"
                              }}
                            >
                              <Image
                                source={require('../Image/persional_icon.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                              />
                              <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }} onPress={() => onChangeTab(1)}>Persional</Text>
                            </View>
                            :
                            <View
                              style={{
                                width: "25%",
                                alignItems: "center",
                                paddingTop: 10,
                                paddingBottom: 10,
                                opacity: 0.5
                              }}
                            >
                              <Image
                                source={require('../Image/persional_icon.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                              />
                              <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }} onPress={() => onChangeTab(1)}>Persional</Text>
                            </View>
                        }
                        {
                          (showTab == 2)
                            ?
                            <View
                              style={{
                                width: "25%",
                                alignItems: "center",
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderBottomWidth: 4,
                                borderBottomColor: "#edf8f1"
                              }}
                            >
                              <Image
                                source={require('../Image/address_icon.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                              />
                              <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }} onPress={() => onChangeTab(2)}>Address</Text>
                            </View>
                            :
                            <View
                              style={{
                                width: "25%",
                                alignItems: "center",
                                paddingTop: 10,
                                paddingBottom: 10,
                                opacity: 0.5
                              }}
                            >
                              <Image
                                source={require('../Image/address_icon.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                              />
                              <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }} onPress={() => onChangeTab(2)}>Address</Text>
                            </View>
                        }
                        {
                          (showTab == 3)
                            ?
                            <View
                              style={{
                                width: "25%",
                                alignItems: "center",
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderBottomWidth: 4,
                                borderBottomColor: "#edf8f1"
                              }}
                            >
                              <Image
                                source={require('../Image/bank_icon.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                              />
                              <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }} onPress={() => onChangeTab(3)}>Bank</Text>
                            </View>
                            :
                            <View
                              style={{
                                width: "25%",
                                alignItems: "center",
                                paddingTop: 10,
                                paddingBottom: 10,
                                opacity: 0.5
                              }}
                            >
                              <Image
                                source={require('../Image/bank_icon.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                              />
                              <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }} onPress={() => onChangeTab(3)}>Bank</Text>
                            </View>
                        }
                        {
                          (showTab == 4)
                            ?
                            <View
                              style={{
                                width: "25%",
                                alignItems: "center",
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderBottomWidth: 4,
                                borderBottomColor: "#edf8f1"
                              }}
                            >
                              <Image
                                source={require('../Image/account_icon.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                              />
                              <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }} onPress={() => onChangeTab(4)}>Account</Text>
                            </View>
                            :
                            <View
                              style={{
                                width: "25%",
                                alignItems: "center",
                                paddingTop: 10,
                                paddingBottom: 10,
                                opacity: 0.5
                              }}
                            >
                              <Image
                                source={require('../Image/account_icon.png')}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                              />
                              <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }} onPress={() => onChangeTab(4)}>Account</Text>
                            </View>
                        }
                      </View>
                      <Dialog.ScrollArea>
                        <ScrollView>
                          {
                            (showTab == 1)
                              ?
                              <View style={{ padding: 15 }}>
                                <View style={{ alignItems: "center", marginBottom: 10 }}>
                                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginTop: 20 }}>Persional Information</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>First name: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.first_name ? item.first_name : "-"}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Last name: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.last_name ? item.last_name : "-"}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Email: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.email ? item.email : "-"}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Phone: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.phone ? item.phone : "-"}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Birthday: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.birthday ? item.birthday : "-"}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Gender: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.gender ? item.gender : "-"}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Join At: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.created_at ? item.created_at : "-"}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Position: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Departmant: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Office: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>Viet Nam</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Line Manager: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Health Insurance: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Marital Status: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Social Insurance: </Text>
                                  <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                </View>
                              </View>
                              :
                              (showTab == 2)
                                ?
                                <View style={{ padding: 15 }}>
                                  <View style={{ alignItems: "center", marginBottom: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginTop: 20 }}>Address Information</Text>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Primary Address: </Text>
                                    <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Country: </Text>
                                    <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>State/Province: </Text>
                                    <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>City: </Text>
                                    <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Postal Code: </Text>
                                    <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Relationship: </Text>
                                    <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Phone Number: </Text>
                                    <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                  </View>
                                </View>
                                :
                                (showTab == 3)
                                  ?
                                  <View style={{ padding: 15 }}>
                                    <View style={{ alignItems: "center", marginBottom: 10 }}>
                                      <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginTop: 20 }}>Bank Information</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Bank Name: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Branch: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>SWIFT / BIC: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Account Name: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Account Number: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>IBAN: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>-</Text>
                                    </View>
                                  </View>
                                  :
                                  <View style={{ padding: 15 }}>
                                    <View style={{ alignItems: "center", marginBottom: 10 }}>
                                      <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginTop: 20 }}>Account Information</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Email: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.email ? item.email : "-"}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>First name: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.first_name ? item.first_name : "-"}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Last name: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.last_name ? item.last_name : "-"}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Created at: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.created_at ? item.created_at : "-"}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                      <Text style={{ fontWeight: "bold", fontSize: 16, color: "rgb(35, 54, 78)" }}>Updated at: </Text>
                                      <Text style={{ fontSize: 16, color: "rgb(35, 54, 78)", textAlign: "right", marginLeft: 'auto' }}>{item.updated_at ? item.updated_at : "-"}</Text>
                                    </View>
                                  </View>
                          }
                        </ScrollView>
                      </Dialog.ScrollArea>
                    </View>
                  </>
                );
              }
            }) : null
        }
      </View>
    </LinearGradient>
    : <Loader loading={loading} />
  );
};
export default AccountScreen;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  mainBody: {
    flex: 1,
    alignItems: "center"
  },
  header: {
    marginTop: "5%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(227, 235, 241)"
  },
  body: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "white",
    paddingTop: 20,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(227, 235, 241)",
    marginBottom: 10
  },
  footer: {
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(227, 235, 241)",
    flexDirection: 'row',
    marginBottom: 10
  },
  email_header: {
    marginTop: 5,
    fontSize: 16,
    color: "rgb(35, 54, 78)",
  },
  name_header: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(35, 54, 78)",
  },
  buttonStyle: {
    backgroundColor: '#FFFF66',
    borderWidth: 1,
    borderColor: '#ff9900',
    height: 42,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,

  },
  buttonTextStyle: {
    color: '#ff9900',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
})