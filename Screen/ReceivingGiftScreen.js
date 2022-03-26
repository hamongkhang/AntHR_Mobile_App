import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Dialog, Searchbar, List, TextInput, Button, FAB, Portal, Provider } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';

const ReceivigGiftScreen = ({ navigation }) => {
  const [state, setState] = React.useState({ open: false });
  const [loading, setLoading] = useState(false);

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
      <Loader loading={loading} />
      <ScrollView>
        <View style={{ padding: 10}}>
          <View style={{ flexDirection: "row",marginBottom:30,justifyContent:"center" }}> 
          <View style={{alignItems:"center",width:"24%"}}>
                <View style={{backgroundColor:"#e65100",borderRadius:200/2,width:55,height:55,alignItems:"center",justifyContent:"center"}}>
                <Avatar.Image size={50} style={{ backgroundColor: "#ffb74d" }} source={{ uri: REACT_APP_FILE+'/reward/gold.png' }} />
                </View>
              <Text style={{color:"rgb(35, 54, 78)",fontWeight:"bold",fontSize:16}}>All Gifts</Text>
              </View>
              <View style={{alignItems:"center",width:"24%"}}>
                <View style={{backgroundColor:"#e65100",borderRadius:200/2,width:55,height:55,alignItems:"center",justifyContent:"center"}}>
                <Avatar.Image size={50} style={{ backgroundColor: "#ffb74d" }} source={{ uri: REACT_APP_FILE+'/reward/food.png' }} />
                </View>
              <Text style={{color:"rgb(35, 54, 78)",fontWeight:"bold",fontSize:16}}>Food</Text>
              </View>
              <View style={{alignItems:"center",width:"24%"}}>
                <View style={{backgroundColor:"#e65100",borderRadius:200/2,width:55,height:55,alignItems:"center",justifyContent:"center"}}>
                <Avatar.Image size={50} style={{ backgroundColor: "#ffb74d" }} source={{ uri: REACT_APP_FILE+'/reward/gift.png' }} />
                </View>
              <Text style={{color:"rgb(35, 54, 78)",fontWeight:"bold",fontSize:16}}>Artifacts</Text>
              </View>
              <View style={{alignItems:"center",width:"24%"}}>
                <View style={{backgroundColor:"#e65100",borderRadius:200/2,width:55,height:55,alignItems:"center",justifyContent:"center"}}>
                <Avatar.Image size={50} style={{ backgroundColor: "#ffb74d" }} source={{ uri: REACT_APP_FILE+'/reward/vourcher.png' }} />
                </View>
              <Text style={{color:"rgb(35, 54, 78)",fontWeight:"bold",fontSize:16}}>Voucher</Text>
              </View>
          </View>
          <View style={{ flexDirection: "row",marginBottom:6 }}>
            <View style={{ width: "49%", padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 3,marginRight:6 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: REACT_APP_FILE + '/present/image/33_15-03-2022-09-55-20.jpg' }}
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 4
                  }}
                />
                <View style={{backgroundColor:"red",paddingTop:4,paddingBottom:4,paddingRight:8,paddingLeft:8,justifyContent:"center",borderRadius:14,position:"absolute",marginLeft:6,marginTop:16,alignSelf:"flex-start"}}>
                <Text style={{color:"white",fontSize:14,fontWeight:"bold"}}>Sold out</Text>
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginBottom: 4 }}>Cơm gà</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>600000 đồng</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", marginBottom: 4 }}>400 Points</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>Nóng hổi cực kỳ</Text>
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

                //  onPress={handleCheckDomainPress}
                >
                  <Text style={{ color: "#ff9900", fontWeight: "bold" }}>EXCHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: "50%", padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 3 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: REACT_APP_FILE + '/present/image/33_15-03-2022-09-55-20.jpg' }}
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 4
                  }}
                />
                 <View style={{backgroundColor:"red",paddingTop:4,paddingBottom:4,paddingRight:8,paddingLeft:8,justifyContent:"center",borderRadius:14,position:"absolute",marginLeft:6,marginTop:16,alignSelf:"flex-start"}}>
                <Text style={{color:"white",fontSize:14,fontWeight:"bold"}}>Sold out</Text>
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginBottom: 4 }}>Cơm gà</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>600000 đồng</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", marginBottom: 4 }}>400 Points</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>Nóng hổi cực kỳ</Text>
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

                //  onPress={handleCheckDomainPress}
                >
                  <Text style={{ color: "#ff9900", fontWeight: "bold" }}>EXCHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row",marginBottom:6 }}>
            <View style={{ width: "49%", padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 3,marginRight:6 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: REACT_APP_FILE + '/present/image/33_15-03-2022-09-55-20.jpg' }}
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 4
                  }}
                />
                 <View style={{backgroundColor:"red",paddingTop:4,paddingBottom:4,paddingRight:8,paddingLeft:8,justifyContent:"center",borderRadius:14,position:"absolute",marginLeft:6,marginTop:16,alignSelf:"flex-start"}}>
                <Text style={{color:"white",fontSize:14,fontWeight:"bold"}}>Sold out</Text>
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginBottom: 4 }}>Cơm gà</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>600000 đồng</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", marginBottom: 4 }}>400 Points</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>Nóng hổi cực kỳ</Text>
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

                //  onPress={handleCheckDomainPress}
                >
                  <Text style={{ color: "#ff9900", fontWeight: "bold" }}>EXCHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: "50%", padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 3 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: REACT_APP_FILE + '/present/image/33_15-03-2022-09-55-20.jpg' }}
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 4
                  }}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginBottom: 4 }}>Cơm gà</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>600000 đồng</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", marginBottom: 4 }}>400 Points</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>Nóng hổi cực kỳ</Text>
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

                //  onPress={handleCheckDomainPress}
                >
                  <Text style={{ color: "#ff9900", fontWeight: "bold" }}>EXCHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row",marginBottom:6 }}>
            <View style={{ width: "49%", padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 3,marginRight:6 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: REACT_APP_FILE + '/present/image/33_15-03-2022-09-55-20.jpg' }}
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 4
                  }}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginBottom: 4 }}>Cơm gà</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>600000 đồng</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", marginBottom: 4 }}>400 Points</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>Nóng hổi cực kỳ</Text>
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

                //  onPress={handleCheckDomainPress}
                >
                  <Text style={{ color: "#ff9900", fontWeight: "bold" }}>EXCHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: "50%", padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 3 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: REACT_APP_FILE + '/present/image/33_15-03-2022-09-55-20.jpg' }}
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 4
                  }}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginBottom: 4 }}>Cơm gà</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>600000 đồng</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", marginBottom: 4 }}>400 Points</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>Nóng hổi cực kỳ</Text>
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

                //  onPress={handleCheckDomainPress}
                >
                  <Text style={{ color: "#ff9900", fontWeight: "bold" }}>EXCHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row",marginBottom:6 }}>
            <View style={{ width: "49%", padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 3,marginRight:6 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: REACT_APP_FILE + '/present/image/33_15-03-2022-09-55-20.jpg' }}
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 4
                  }}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginBottom: 4 }}>Cơm gà</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>600000 đồng</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", marginBottom: 4 }}>400 Points</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>Nóng hổi cực kỳ</Text>
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

                //  onPress={handleCheckDomainPress}
                >
                  <Text style={{ color: "#ff9900", fontWeight: "bold" }}>EXCHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: "50%", padding: 10, backgroundColor: "white", borderColor: "rgb(227, 235, 241)", borderWidth: 1, borderRadius: 3 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: REACT_APP_FILE + '/present/image/33_15-03-2022-09-55-20.jpg' }}
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 4
                  }}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgb(35, 54, 78)", marginBottom: 4 }}>Cơm gà</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>600000 đồng</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", marginBottom: 4 }}>400 Points</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", color: "rgb(95, 125, 149)", marginBottom: 4 }}>Nóng hổi cực kỳ</Text>
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

                //  onPress={handleCheckDomainPress}
                >
                  <Text style={{ color: "#ff9900", fontWeight: "bold" }}>EXCHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>
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
                                onPress:()=>setState({open:false})
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
  );
};
export default ReceivigGiftScreen;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
})