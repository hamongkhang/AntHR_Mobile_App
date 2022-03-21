import React, {useState, createRef,useEffect} from 'react';
import { LinearGradient } from "expo-linear-gradient";
import {StyleSheet,TextInput,View,Text,ScrollView,Image,Keyboard,TouchableOpacity,KeyboardAvoidingView,ToastAndroid,useWindowDimensions } from 'react-native';
import {REACT_APP_API} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from './Components/Loader';
import { Drawer,Avatar,Dialog, Portal,List  } from 'react-native-paper';
import { TabView, SceneMap,TabBar} from 'react-native-tab-view';

  const FirstRoute = () => (
    <View
      style={{
        backgroundColor:"white",
        padding:20,
      }}
    >
      <View style={{alignItems:"center",marginBottom:10}}>
        <Text style={{fontSize:18,fontWeight:"bold",color:"rgb(35, 54, 78)"}}>Persional Information</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
        <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
        <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
        <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>Last name: </Text>
        <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Mộng Khang</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
        <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
        <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
        <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
        <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
        <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
        <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
        <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
        <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
      </View>
    </View>
  );

const SecondRoute = () => (
  <View
  style={{
    backgroundColor:"white",
    padding:20,
  }}
>
  <View style={{alignItems:"center",marginBottom:10}}>
    <Text style={{fontSize:18,fontWeight:"bold",color:"rgb(35, 54, 78)"}}>Address Information</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>Last name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Mộng Khang</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
</View>
);
const ThirdRoute = () => (
  <View
  style={{
    backgroundColor:"white",
    padding:20,
  }}
>
  <View style={{alignItems:"center",marginBottom:10}}>
    <Text style={{fontSize:18,fontWeight:"bold",color:"rgb(35, 54, 78)"}}>Bank Information</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>Last name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Mộng Khang</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
</View>
);

const fourthRoute = () => (
  <View
  style={{
    backgroundColor:"white",
    padding:20,
  }}
>
  <View style={{alignItems:"center",marginBottom:10}}>
    <Text style={{fontSize:18,fontWeight:"bold",color:"rgb(35, 54, 78)"}}>Account Information</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>Last name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Mộng Khang</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
  <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
    <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
    <Text style={{fontSize:16,color:"rgb(35, 54, 78)"}}>Hà</Text>
  </View>
</View>
);
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#edf8f1' }}
    style={{ backgroundColor: '#ff9900'}}
  />
);
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third:ThirdRoute,
  fourth:fourthRoute
});
const AccountScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] =useState(true);
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Persional',icon:"account" },
    { key: 'second', title: 'Address' },
    { key: 'third', title: 'Bank' },
    { key: 'fourth', title: 'Account' },
  ]);
  const handlePress = () => setExpanded(!expanded);
  // const [domain, setDomain] = useState('');
  // const [errorForm1, setErrorForm1] = useState({domain:null});
  // const [loading, setLoading] = useState(false);
  // const [showForm, setShowForm] = useState(true);
  // const [user, setUser] = useState({
  //   email:'',
  //   password:''
  // });

  // const [errorForm2, setErrorForm2] = useState({
  //   email:null,
  //   password:null,
  // });
  // const passwordInputRef = createRef();
  // const handleSubmitPress = () => {
  //   setLoading(true);
  //   const _formData = new FormData();
  //   _formData.append('email', user.email);
  //   _formData.append('password', user.password);
  //   const requestOptions = {
  //       method: 'POST',
  //       body: _formData,
  //   };
  //   fetch(REACT_APP_API+'/user/login', requestOptions)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         if(json.error){
  //           if (json.error === 'Unauthorized') {
  //             setLoading(false);
  //             ToastAndroid.showWithGravityAndOffset('Login information is incorrect !!!',ToastAndroid.LONG,ToastAndroid.CENTER,10,10);
  //             setErrorForm2('');
  //         } else if (json.error === 'Blocked') {
  //             setLoading(false);
  //             ToastAndroid.showWithGravityAndOffset('Your account has been blocked !!!',ToastAndroid.LONG,ToastAndroid.CENTER,10,10);
  //             setErrorForm2("");
  //         }else{
  //             setLoading(false);
  //             setErrorForm2(json.error);
  //         }
  //         }else{
  //           AsyncStorage.setItem('access_token', json.access_token);
  //           AsyncStorage.setItem('first_name', json.name.first_name);
  //           AsyncStorage.setItem('last_name', json.name.last_name);
  //           AsyncStorage.setItem('avatar', json.name.avatar);
  //           AsyncStorage.setItem('email', json.name.email);
  //           AsyncStorage.setItem('role', json.name.role);
  //           AsyncStorage.setItem('id', json.user.id);
  //           setLoading(false);
  //           ToastAndroid.showWithGravityAndOffset('Logged in successfully !!!',ToastAndroid.LONG,ToastAndroid.CENTER,10,10);
  //           navigation.navigate('HomeScreen');
  //         }
  //      });
  // };
  // const handleCheckDomainPress = () => {
  //   setLoading(true);
  //   const _formData = new FormData();
  //   _formData.append('domain', domain);
  //   const requestOptions = {
  //       method: 'POST',
  //       body: _formData,
  //   };
  //   fetch(REACT_APP_API+'/user/checkDomain', requestOptions)
  //       .then((res) => res.json())
  //       .then((json) => {
  //           if (json.error) {
  //             if(json.error=="No one have domain"){
  //               setLoading(false);
  //               ToastAndroid.showWithGravityAndOffset('Domain does not exist !!!',ToastAndroid.LONG,ToastAndroid.CENTER,10,10);
  //               setErrorForm1("");
  //             }else{
  //               setErrorForm1(json.error);
  //               setLoading(false);
  //             }
  //           } else {
  //               setLoading(false);
  //               ToastAndroid.showWithGravityAndOffset('Successfully!!!',ToastAndroid.LONG,ToastAndroid.CENTER,10,10);
  //               if(!showForm){
  //                 setShowForm(true);
  //               }else{
  //                 setShowForm(false);
  //            }
  //         }
  //       });
  // };
  // const [active, setActive] = useState('');

  // const googleLogin=()=>{
  //   setErrorForm2("");
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     ToastAndroid.showWithGravityAndOffset('Login information is incorrect !!!',ToastAndroid.LONG,ToastAndroid.CENTER,10,10);
  //   }, 3000);
  // }
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
        navigation.navigate('LoginScreen')
      }
    });
    }, []);
  return (
      <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
        <View style={styles.mainBody}>
        <Loader loading={loading} />
        <View style={styles.header}>
          <Avatar.Image size={80} source={require('../Image/logo1.png')} />
          <Text style={styles.name_header}>Hà Mộng Khang</Text>
          <Text style={styles.email_header}>hamongkhang@gmail.com</Text>
        </View>
        <View style={styles.body}>
         <Dialog.ScrollArea style={{padding:0}}> 
          <ScrollView>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ height:100,width: layout.width }}
              renderTabBar={renderTabBar}
            />
          </ScrollView>
         </Dialog.ScrollArea>  
        </View>
        </View> 
      </LinearGradient>
  );
};
export default AccountScreen;

const styles = StyleSheet.create({
  linearGradient: {
      flex:1,
      paddingLeft: 15,
      paddingRight: 15,
  },
  mainBody: {
    flex: 1,
    alignItems:"center"
  },
  header:{
    marginTop:"15%",
    alignItems:"center",
    backgroundColor:"white",
    padding:20,
    width:"100%",
    borderRadius:5,
    borderWidth:1,
    borderColor:"rgb(227, 235, 241)"
  },
  body:{
    flex: 1,
    marginTop:10,
    backgroundColor:"white",
    paddingTop:20,
    width:"100%",
    borderRadius:5,
    borderWidth:1,
    borderColor:"rgb(227, 235, 241)",
  },
  email_header:{
    marginTop:5,
    fontSize:16,
    color:"rgb(35, 54, 78)",
  },
  name_header:{
    marginTop:15,
    fontSize:18,
    fontWeight:"bold",
    color:"rgb(35, 54, 78)",
  },
  // SectionStyle: {
  //   flexDirection: 'row',
  //   height: 40,
  //   marginTop: 20,
  //   marginLeft: 35,
  //   marginRight: 35,
  //   margin: 10,
  // },
  // buttonStyle: {
  //   backgroundColor: '#FFFF66',
  //   borderWidth: 1,
  //   borderColor: '#ff9900',
  //   height: 42,
  //   alignItems: 'center',
  //   borderRadius: 30,
  //   marginLeft: 35,
  //   marginRight: 35,
  //   marginTop: 20,
  //   marginBottom: 25,
  // },
  // buttonTextStyle: {
  //   color: '#ff9900',
  //   paddingVertical: 10,
  //   fontSize: 16,
  //   fontWeight:"bold"
  // },
  // buttonTextStyleOr: {
  //   color: 'white',
  //   textAlign: 'center',
  //   fontSize: 12,
  //   fontWeight:"bold",
  // },
  // inputStyle: {
  //   flex: 1,
  //   color: 'white',
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderWidth: 1,
  //   borderRadius: 30,
  //   borderColor: '#dadae8',
  // },
  // errorTextStyle: {
  //   color: 'red',
  //   textAlign: 'center',
  //   fontSize: 14,
  // },
  // buttonStyleGoogle:{
  //   borderWidth: 1,
  //   borderColor: '#dadae8',
  //   height: 42,
  //   alignItems: 'center',
  //   borderRadius: 30,
  //   marginLeft: 35,
  //   marginRight: 35,
  //   marginTop: 20,
  //   marginBottom: 25,
  // },
  // buttonTextStyleGoogle: {
  //   color: 'white',
  //   fontSize: 12,
  //   fontWeight:"bold",
  //   marginLeft:10
  // },
  // buttonTextStyleForgot: {
  //   color: '#ff9900',
  //   fontSize: 12,
  //   fontWeight:"bold",
  //   marginLeft:10,
  //   textAlign:"right",
  //   paddingRight: 40,
  // },
  // buttonTextStyleAccount2: {
  //   color: '#ff9900',
  //   fontSize: 18,
  //   fontWeight:"bold",
  //   textAlign:"center",
  // }, 
  // buttonTextStyleAccount: {
  //   color: 'white',
  //   fontSize: 14,
  //   fontWeight:"bold",
  //   textAlign:"left",
  //   marginLeft: 35,
  // },
});