import React, {useState, createRef,useEffect} from 'react';
import { LinearGradient } from "expo-linear-gradient";
import {StyleSheet,TextInput,View,Text,ScrollView,Image,Keyboard,TouchableOpacity,KeyboardAvoidingView,ToastAndroid,useWindowDimensions } from 'react-native';
import {REACT_APP_API} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from './Components/Loader';
import { Drawer,Avatar,Dialog, Portal,List  } from 'react-native-paper';
  
const AccountScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [showTab,setShowTab]=useState(1)
  const [token, setToken] = useState('');

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
  const onChangeTab=(value)=>{
    setShowTab(value);
  }
  const onClickLogout=()=>{
    const requestOptions = {
        method: 'POST',
        headers: { "Authorization": `Bearer ` + token }
    };
    fetch(REACT_APP_API + '/user/logout', requestOptions)
        .then((res) => res.json())
        .then((json) => {
        });
        AsyncStorage.clear();
        navigation.navigate('LoginScreen');
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
        <View style={{backgroundColor:"#ffa000",flexDirection: 'row',opacity:1,borderRadius:5,marginLeft:10,marginRight:10}}>
          {
                  (showTab==1)
                ?
                <View 
                style={{
                  width:"25%",
                  alignItems:"center",
                  paddingTop:10,
                  paddingBottom:10,
                  borderBottomWidth:4,
                  borderBottomColor:"#edf8f1"
                }}
                >
                <Image
                  source={require('../Image/persional_icon.png')}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text style={{color:"white",fontWeight:"bold",fontSize:12}} onPress={()=>onChangeTab(1)}>Persional</Text>
              </View>
              :
              <View 
              style={{
                width:"25%",
                alignItems:"center",
                paddingTop:10,
                paddingBottom:10,
                opacity:0.5
              }}
              >
              <Image
                source={require('../Image/persional_icon.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
                <Text style={{color:"white",fontWeight:"bold",fontSize:12}} onPress={()=>onChangeTab(1)}>Persional</Text>
            </View>
          }
          {
                  (showTab==2)
                ?
                <View 
                style={{
                  width:"25%",
                  alignItems:"center",
                  paddingTop:10,
                  paddingBottom:10,
                  borderBottomWidth:4,
                  borderBottomColor:"#edf8f1"
                }}
                >
                <Image
                  source={require('../Image/address_icon.png')}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text style={{color:"white",fontWeight:"bold",fontSize:12}} onPress={()=>onChangeTab(2)}>Address</Text>
              </View>
              :
              <View 
              style={{
                width:"25%",
                alignItems:"center",
                paddingTop:10,
                paddingBottom:10,
                opacity:0.5
              }}
              >
              <Image
                source={require('../Image/address_icon.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text style={{color:"white",fontWeight:"bold",fontSize:12}} onPress={()=>onChangeTab(2)}>Address</Text>
            </View>
          }
          {
                  (showTab==3)
                ?
                <View 
                style={{
                  width:"25%",
                  alignItems:"center",
                  paddingTop:10,
                  paddingBottom:10,
                  borderBottomWidth:4,
                  borderBottomColor:"#edf8f1"
                }}
                >
                <Image
                  source={require('../Image/bank_icon.png')}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text style={{color:"white",fontWeight:"bold",fontSize:12}} onPress={()=>onChangeTab(3)}>Bank</Text>
              </View>
              :
              <View 
              style={{
                width:"25%",
                alignItems:"center",
                paddingTop:10,
                paddingBottom:10,
                opacity:0.5
              }}
              >
              <Image
                source={require('../Image/bank_icon.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text style={{color:"white",fontWeight:"bold",fontSize:12}} onPress={()=>onChangeTab(3)}>Bank</Text>
            </View>
          }
          {
                  (showTab==4)
                ?
                <View 
                style={{
                  width:"25%",
                  alignItems:"center",
                  paddingTop:10,
                  paddingBottom:10,
                  borderBottomWidth:4,
                  borderBottomColor:"#edf8f1"
                }}
                >
                <Image
                  source={require('../Image/account_icon.png')}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text style={{color:"white",fontWeight:"bold",fontSize:12}} onPress={()=>onChangeTab(4)}>Account</Text>
              </View>
              :
              <View 
              style={{
                width:"25%",
                alignItems:"center",
                paddingTop:10,
                paddingBottom:10,
                opacity:0.5
              }}
              >
              <Image
                source={require('../Image/account_icon.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text style={{color:"white",fontWeight:"bold",fontSize:12}} onPress={()=>onChangeTab(4)}>Account</Text>
            </View>
          }
            </View>
         <Dialog.ScrollArea> 
          <ScrollView>
            {
                (showTab==1)
              ?
              <View style={{padding:15}}> 
                <View style={{alignItems:"center",marginBottom:10}}>
                  <Text style={{fontSize:18,fontWeight:"bold",color:"rgb(35, 54, 78)",marginTop:20}}>Persional Information</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
                  <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
                  <Text style={{fontSize:16,color:"rgb(35, 54, 78)", textAlign: "right",marginLeft: 'auto'}}>Hà</Text>
                </View>         
              </View>
              :
                  (showTab==2)
                ?
                <View style={{padding:15}}> 
                <View style={{alignItems:"center",marginBottom:10}}>
                  <Text style={{fontSize:18,fontWeight:"bold",color:"rgb(35, 54, 78)",marginTop:20}}>Address Information</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
                  <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
                  <Text style={{fontSize:16,color:"rgb(35, 54, 78)", textAlign: "right",marginLeft: 'auto'}}>Hà</Text>
                </View>         
              </View>
                :
                (showTab==3)
                ?
                <View style={{padding:15}}> 
                <View style={{alignItems:"center",marginBottom:10}}>
                  <Text style={{fontSize:18,fontWeight:"bold",color:"rgb(35, 54, 78)",marginTop:20}}>Bank Information</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
                  <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
                  <Text style={{fontSize:16,color:"rgb(35, 54, 78)", textAlign: "right",marginLeft: 'auto'}}>Hà</Text>
                </View>         
              </View>
              :
              <View style={{padding:15}}> 
              <View style={{alignItems:"center",marginBottom:10}}>
                <Text style={{fontSize:18,fontWeight:"bold",color:"rgb(35, 54, 78)",marginTop:20}}>Account Information</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
                <Text style={{fontWeight:"bold",fontSize:16,color:"rgb(35, 54, 78)"}}>First name: </Text>
                <Text style={{fontSize:16,color:"rgb(35, 54, 78)", textAlign: "right",marginLeft: 'auto'}}>Hà</Text>
              </View>       
            </View>
            }
          </ScrollView>
         </Dialog.ScrollArea> 
         { 
          (showTab==4)
          ?
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                //onPress={handleSubmitPress}
              >
                <Text style={styles.buttonTextStyle}>CHANGE PASSWORD</Text>
              </TouchableOpacity>  
          :null
         }
        </View>
        <TouchableOpacity onPress={()=>onClickLogout()} style={styles.footer}>
              <Image
                source={require('../Image/logout_icon.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text style={{ marginLeft:10,fontSize:22,fontWeight:"bold",color:"rgb(35, 54, 78)"}} >Log out</Text>
        </TouchableOpacity>
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
    marginTop:"10%",
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
  footer:{
    marginTop:10,
    justifyContent:"center",
    backgroundColor:"white",
    padding:20,
    width:"100%",
    borderRadius:5,
    borderWidth:1,
    borderColor:"rgb(227, 235, 241)",
    flexDirection: 'row',
    marginBottom:10
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
    fontWeight:"bold"
  },
})