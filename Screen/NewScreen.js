import React, {useState,useEffect} from 'react';
import { LinearGradient } from "expo-linear-gradient";
import {StyleSheet,View,Text,ScrollView,Image,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Avatar,Dialog,Searchbar,List,TextInput,Button    } from 'react-native-paper';
import {REACT_APP_API,REACT_APP_FILE} from "@env"
import Loader from './Loader';


const NewScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [select, setSelect] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);

  const onChangeSearch = query => setSearchQuery(query);
  const onChangeSelect=(value)=>{
    setSelect(value);
    setExpanded(!expanded);
  }
  return (
      <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
        <View style={styles.mainBody}>
        <Loader loading={loading} />
            <View style={styles.header}>
              <Searchbar
                style={{borderColor:"rgb(212, 223, 231)",borderWidth:1,boxShadow:"rgb(0 0 0 / 24%) 0px 3px 4px",height:60,marginBottom:10}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
              <List.Section style={{borderColor:"rgb(212, 223, 231)",borderWidth:1,boxShadow:"rgb(0 0 0 / 24%) 0px 3px 4px"}}>
                <List.Accordion onPress={()=>setExpanded(!expanded)}  expanded={expanded} title={select?select:"All News"} >
                  <List.Item onPress={()=>onChangeSelect('Important')} title="Important" />
                  <List.Item onPress={()=>onChangeSelect('Non Important')} title="Non Important" />
                </List.Accordion>
              </List.Section>
            </View>
            <ScrollView> 
              <View style={styles.item_one}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Text style={{fontSize:18,fontHeight:20,color:"rgb(35, 54, 78)",fontWeight:"bold"}}>Tin tức 1</Text>
                  <Text style={{fontSize:17,paddingTop:4,paddingBottom:4,paddingRight:7,paddingLeft:7,backgroundColor:"rgb(216, 246, 226)",color:"rgb(31, 153, 70)",borderRadius:3,marginLeft:10}}>Publish</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Image
                    source={require('../Image/clock_icon.png')}
                    style={{
                      width: 14,
                      height: 14,
                      marginRight:5
                    }}
                  />                  
                  <Text style={{fontWeight:500,fontSize:16,color:"rgb(105, 129, 148)",marginRight:5}}>Tin tức 1 |</Text>
                  <Text style={{fontWeight:500,fontSize:16,color:"rgb(105, 129, 148)",marginRight:5}}>Important</Text>
                </View>
              </View> 
            </ScrollView>   
        </View> 
      </LinearGradient>
  );
};
export default NewScreen;
const styles = StyleSheet.create({
  linearGradient: {
      flex:1,
  },
  mainBody: {
    flex: 1,
  },
  header:{
    backgroundColor:"white",
    width:"100%",
    padding:20
  },
  item_one:{
    backgroundColor:"white",
    width:"100%",
    padding:20,
    marginTop:10,
    borderTopWidth:1,
    borderTopColor:"rgb(227, 235, 241)",
    borderBottomWidth:1,
    borderBottomColor:"rgb(227, 235, 241)"
  }
})