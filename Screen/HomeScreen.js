import {View, Text, SafeAreaView,Image} from 'react-native';
import React, {useState, createRef,useEffect} from 'react';
import { Appbar,Avatar,BottomNavigation,Button  } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_API} from "@env";
import Loader from './Loader';
import AccountScreen from './Account';

const AccountRoute = () => <AccountScreen></AccountScreen>;
const FolderRoute = () => <Text>FolderRoute</Text>;
const NewsRoute = () => <Text>NewsRoute</Text>;
const AttendanceRoute = () => <Text>AttendanceRoute</Text>;
const GiftRoute = () => <Text>AccountRoute</Text>;

const HomeScreen = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const [routes] = React.useState([
    { key: 'Gift', title: 'Gift', icon: 'gift', color: 'rgb(98, 0, 238)' },
    { key: 'Folder', title: 'Folder', icon: 'folder', color: '#4caf50' },
    { key: 'News', title: 'News', icon: 'newspaper', color: '#9c27b0' },
    { key: 'Attendance', title: 'Attendance', icon: 'calendar', color: '#ab003c' },
    { key: 'Account', title: 'Account', icon: 'account', color: '#ff9900' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Gift: GiftRoute,
    Folder: FolderRoute,
    News: NewsRoute,
    Attendance: AttendanceRoute,
    Account: AccountRoute,
  });

  const onClickLogout=()=>{
    setLoading(true);
    const requestOptions = {
        method: 'POST',
        headers: { "Authorization": `Bearer ` + token }
    };
    fetch(REACT_APP_API + '/user/logout', requestOptions)
        .then((res) => res.json())
        .then((json) => {
        });
        setLoading(false);
        AsyncStorage.clear();
        navigation.navigate('LoginScreen')
      }

  useEffect(() => {
    const getToken = async () => {
      try {
        const savedNickname = await AsyncStorage.getItem("access_token");
        setToken(savedNickname);
      } catch (err) {
        console.log(err);
      }
    }
    getToken();
    AsyncStorage.getItem('access_token', (err, result) => {
      if (result) {
        
      }else{
        navigation.navigate('LoginScreen');
      }
    });
    }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
      <Loader loading={loading} />
      <LinearGradient colors={['#312A6C', '#852D91']}>
        <Appbar.Header>
            <Image  style={{marginLeft:10,width:60,height:60}} source={require('../Image/logo1.png')} /> 
            <Avatar.Image onPress={()=>showButton()} size={40} style={{backgroundColor:"#edf8f1",marginLeft:"auto",marginRight:10}} source={require('../Image/logo1.png')} />
        </Appbar.Header>
        <LinearGradient colors={['#FE6B8B', '#FF8E53']}>
        <View style={{padding:20,flexDirection:"row",justifyContent:"center"}}>
          <Button style={{marginRight:40}} icon="account" mode="contained" onPress={() => console.log('Pressed')}>
              Password
         </Button>
         <Button icon="logout" mode="contained" onPress={() => console.log('Pressed')}>
              Log out
         </Button>
        </View>
        </LinearGradient>
        </LinearGradient>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;