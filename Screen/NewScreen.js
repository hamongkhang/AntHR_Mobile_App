import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Dialog, Searchbar, List, TextInput, Button } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';


const NewScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [select, setSelect] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [news, setNews] = useState([]);
  const [check, setCheck] = useState(false);
  const [result, setResult] = useState([]);
  const [detail, setDetail] = useState([]);
  const [checkDetail, setCheckDetail] = useState(true);

  const getNews = (token) => {
    setLoading(true);
    fetch('http://192.168.43.97:8000/api/new/getAllNew', {
      method: "GET",
      headers: { "Authorization": `Bearer ` + token }
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setNews(data.data);
      });
  }

  const onChangeSearch = query => {
    setSearchQuery(query);
    setCheck(true);
    var a = [];
    for (var i = 0; i < news.length; i++) {
      if (news[i].title.indexOf(query) != -1) {
        a.push(news[i]);
      } else {
        setResult([]);
      }
    }
    setResult(a);
  }

  const onChangeSelect = (value) => {
    setCheck(true);
    setSelect(value);
    setExpanded(!expanded);
    var a = [];
    if (value == "Important") {
      for (var i = 0; i < news.length; i++) {
        if (news[i].important == 1) {
          a.push(news[i]);
        }
      }
    } else if (value == "Non Important") {
      for (var i = 0; i < news.length; i++) {
        if (news[i].important == 0) {
          a.push(news[i]);
        }
      }
    } else {
      for (var i = 0; i < news.length; i++) {
        a.push(news[i])
      }
    }
    setResult(a)
  }

  const onChangeNewDetail = (id) => {
    setCheckDetail(false);
    var a = [];
    for (var i = 0; i < news.length; i++) {
      if (news[i].id == id) {
        a.push(news[i]);
      }
    }
    setDetail(a);
  }
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        getNews(token);
      } catch (err) {
        console.log(err);
      }
    }
    getToken();
  }, []);

  return (
    !loading?
    checkDetail ?
      <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
        <View style={styles.mainBody}>
          <Loader loading={loading} />
          <View style={styles.header}>
            <Searchbar
              style={{ borderColor: "rgb(212, 223, 231)", borderWidth: 1, boxShadow: "rgb(0 0 0 / 24%) 0px 3px 4px", height: 60, marginBottom: 10 }}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
            <List.Section style={{ borderColor: "rgb(212, 223, 231)", borderWidth: 1, boxShadow: "rgb(0 0 0 / 24%) 0px 3px 4px" }}>
              <List.Accordion onPress={() => setExpanded(!expanded)} expanded={expanded} title={select ? select : "All News"} >
                <List.Item onPress={() => onChangeSelect('All News')} title="All News" />
                <List.Item onPress={() => onChangeSelect('Important')} title="Important" />
                <List.Item onPress={() => onChangeSelect('Non Important')} title="Non Important" />
              </List.Accordion>
            </List.Section>
          </View>
          <ScrollView>
            {!check ?
              news.length ?
                news.map((item,index) => {
                  return (
                    <View key={index} style={styles.item_one}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text onPress={() => onChangeNewDetail(item.id)} style={{width:"65%", fontSize: 18, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>{item.title ? item.title : "-"}</Text>
                        {(item.important == 1)
                          ?
                          <Text style={{fontSize: 17, paddingTop: 4, paddingBottom: 4, paddingRight: 7, paddingLeft: 7, backgroundColor: "rgb(216, 246, 226)", color: "rgb(31, 153, 70)", borderRadius: 3, marginLeft: 10 }}>IMPORTANT</Text>
                          :
                          null}
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                          source={require('../Image/clock_icon.png')}
                          style={{
                            width: 14,
                            height: 14,
                            marginRight: 5
                          }}
                        />
                        <Text style={{fontSize: 16, color: "rgb(105, 129, 148)", marginRight: 5 }}>
                          {item.updated_at?item.updated_at:"-"} | Admin</Text>
                      </View>
                    </View>
                  )
                }) : null
              : result.length ? result.map((item,index) => {
                return (
                  <View  key={index} style={styles.item_one}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text onPress={() => onChangeNewDetail(item.id)} style={{width:"65%",fontSize: 18, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>{item.title ? item.title : "-"}</Text>
                      {(item.important == 1)
                        ?
                        <Text style={{ fontSize: 17, paddingTop: 4, paddingBottom: 4, paddingRight: 7, paddingLeft: 7, backgroundColor: "rgb(216, 246, 226)", color: "rgb(31, 153, 70)", borderRadius: 3, marginLeft: 10 }}>IMPORTANT</Text>
                        :
                        null}
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image
                        source={require('../Image/clock_icon.png')}
                        style={{
                          width: 14,
                          height: 14,
                          marginRight: 5
                        }}
                      />
                      <Text style={{fontSize: 16, color: "rgb(105, 129, 148)", marginRight: 5 }}>
                        {item.updated_at?item.updated_at:"-"} | Admin</Text>
                    </View>
                  </View>
                )
              }) :
                null
            }
          </ScrollView>
        </View>
      </LinearGradient>
      :
      <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
        <View style={styles.mainBodyDetail}>
          <View style={styles.item_one_detail}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 40 }}>
              <Image
                source={require('../Image/back_icon.png')}
                style={{
                  width: 15,
                  height: 15,
                  marginRight: 5
                }}
              />
              <Text style={{ fontSize: 14, color: "rgb(79, 94, 113)", fontWeight: "bold", marginLeft: 5 }} onPress={() => setCheckDetail(true)}>Back</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "rgb(35, 54, 78)", fontWeight: "bold" }}>
                {detail[0].title ? detail[0].title : "-"}
              </Text>
              {(detail[0].important == 1)
                ?
                <Text style={{ fontSize: 17, paddingTop: 4, paddingBottom: 4, paddingRight: 7, paddingLeft: 7, backgroundColor: "rgb(216, 246, 226)", color: "rgb(31, 153, 70)", borderRadius: 3, marginLeft: 10 }}>IMPORTANT</Text>
                :
                null}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require('../Image/clock_icon.png')}
                style={{
                  width: 14,
                  height: 14,
                  marginRight: 5
                }}
              />
              <Text style={{fontSize: 16, color: "rgb(105, 129, 148)", marginRight: 5 }}>
                {detail[0].updated_at?detail[0].updated_at:"-"} | Admin</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 50 }}>
              <Text style={{ color: "rgb(14, 34, 61)" }}>{detail[0].content ? detail[0].content : "-"}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      : <Loader loading={loading} />
  );
};
export default NewScreen;
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