import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Dialog, Searchbar, List, TextInput, Button } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';


const AttendanceScreen = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [select, setSelect] = React.useState('');
//   const [expanded, setExpanded] = React.useState(false);
//   const [news, setNews] = useState([]);
//   const [check, setCheck] = useState(false);
//   const [result, setResult] = useState([]);
//   const [detail, setDetail] = useState([]);
//   const [checkDetail, setCheckDetail] = useState(true);

//   const getNews = (token) => {
//     setLoading(true);
//     fetch(REACT_APP_API + '/new/getAllNew', {
//       method: "GET",
//       headers: { "Authorization": `Bearer ` + token }
//     })
//       .then(response => response.json())
//       .then(data => {
//         setLoading(false);
//         setNews(data.data);
//       });
//   }

//   const onChangeSearch = query => {
//     setSearchQuery(query);
//     setCheck(true);
//     var a = [];
//     for (var i = 0; i < news.length; i++) {
//       if (news[i].title.indexOf(query) != -1) {
//         a.push(news[i]);
//       } else {
//         setResult([]);
//       }
//     }
//     setResult(a);
//   }

//   const onChangeSelect = (value) => {
//     setCheck(true);
//     setSelect(value);
//     setExpanded(!expanded);
//     var a = [];
//     if (value == "Important") {
//       for (var i = 0; i < news.length; i++) {
//         if (news[i].important == 1) {
//           a.push(news[i]);
//         }
//       }
//     } else if (value == "Non Important") {
//       for (var i = 0; i < news.length; i++) {
//         if (news[i].important == 0) {
//           a.push(news[i]);
//         }
//       }
//     } else {
//       for (var i = 0; i < news.length; i++) {
//         a.push(news[i])
//       }
//     }
//     setResult(a)
//   }

//   const onChangeNewDetail = (id) => {
//     setCheckDetail(false);
//     var a = [];
//     for (var i = 0; i < news.length; i++) {
//       if (news[i].id == id) {
//         a.push(news[i]);
//       }
//     }
//     setDetail(a);
//   }
//   console.log(detail);
//   useEffect(() => {
//     const getToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem("access_token");
//         getNews(token);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     getToken();
//   }, []);

  return (
      <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
      
      </LinearGradient>
  );
};
export default AttendanceScreen;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  mainBody: {
    flex: 1,
  },
  mainBodyDetail: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item_one_detail: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "rgb(227, 235, 241)",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(227, 235, 241)",
    height: "98%",
    width: "96%",
    borderRadius: 5
  },
  header: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
  },
  item_one: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgb(227, 235, 241)",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(227, 235, 241)"
  }
})