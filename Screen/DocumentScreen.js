import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Dialog, Searchbar, List, TextInput, Button, DataTable } from 'react-native-paper';
import { REACT_APP_API, REACT_APP_FILE } from "@env"
import Loader from './Loader';

const optionsPerPage = [2, 3, 4];

const DocumentScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [select, setSelect] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [news, setNews] = useState([]);
  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [result2, setResult2] = useState([]);
  const [searchQuery2, setSearchQuery2] = React.useState('');

  const [result, setResult] = useState([]);
  const [detail, setDetail] = useState([]);
  const [checkDocuments, setCheckDocuments] = useState(true);
  const [folders, setFolders] = useState([]);
  const [token, setToken] = useState('');
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
  const getOneDocumentFolders = (id) => {
    setLoading(true);
    setCheckDocuments()
    fetch('http://192.168.43.97:8000/api/document/getOneFolder/' + id, {
      method: "GET",
      headers: { "Authorization": `Bearer ` + token }
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setDocuments(data.data);
      });
  }
  console.log(result2)
  const onChangeSearch2 = query => {
    setSearchQuery2(query);
    setCheck2(true);
    var a = [];
    for (var i = 0; i < documents.length; i++) {
      if (documents[i].name_show.indexOf(query) != -1) {
        a.push(documents[i]);
      } else {
        setResult2([]);
      }
    }
    setResult2(a);

  }

  const getFolder = (token) => {
    setLoading(true);
    fetch('http://192.168.43.97:8000/api/document/getAllFolder', {
      method: "GET",
      headers: { "Authorization": `Bearer ` + token }
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setFolders(data.data);
      });
  }
  const onChangeSearch = query => {
    setSearchQuery(query);
    setCheck(true);
    var a = [];
    for (var i = 0; i < folders.length; i++) {
      if (folders[i].name.indexOf(query) != -1) {
        a.push(folders[i]);
      } else {
        setResult([]);
      }
    }
    setResult(a);

  }
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        setToken(token);
        getFolder(token);
      } catch (err) {
        console.log(err);
      }
    }
    getToken();
    setPage(0);
  }, [itemsPerPage]);
  return (
    !loading?
    checkDocuments ?
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
          </View>
          <View style={styles.item_one}>
          <ScrollView horizontal={true}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{width:250}}>Name</DataTable.Title>
                <DataTable.Title style={{width:200}}>Author</DataTable.Title>
                <DataTable.Title style={{width:300}}>Description</DataTable.Title>
                <DataTable.Title style={{width:120}}>Number Of Files</DataTable.Title>
                <DataTable.Title style={{width:180}}>Created At</DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {!check ?
                  folders.length ?
                    folders.map((item,index) => {
                      if (item.share == 1) {
                        return (
                          <DataTable.Row key={index}>
                            <DataTable.Cell style={{width:250}} onPress={() => getOneDocumentFolders(item.id)}>{item.name ? item.name : "-"}</DataTable.Cell>
                            <DataTable.Cell style={{width:200}}>{item.author ? item.author : "-"}</DataTable.Cell>
                            <DataTable.Cell style={{width:300}}>{item.description ? item.description : "-"}</DataTable.Cell>
                            <DataTable.Cell style={{width:120}}>{item.sum ? item.sum : "-"}</DataTable.Cell>
                            <DataTable.Cell style={{width:180}}>
                              {item.updated_at}
                            </DataTable.Cell>
                          </DataTable.Row>
                        )
                      }
                    }) : null
                  : result.length ? result.map((item,index) => {
                    if (item.share == 1) {
                      return (
                        <DataTable.Row key={index}>
                          <DataTable.Cell style={{width:250}} onPress={() => getOneDocumentFolders(item.id)}>{item.name ? item.name : "-"}</DataTable.Cell>
                          <DataTable.Cell style={{width:200}}>{item.author ? item.author : "-"}</DataTable.Cell>
                          <DataTable.Cell style={{width:300}}>{item.description ? item.description : "-"}</DataTable.Cell>
                          <DataTable.Cell style={{width:120}}>{item.sum ? item.sum : "-"}</DataTable.Cell>
                          <DataTable.Cell style={{width:180}}>
                            {item.updated_at}
                          </DataTable.Cell>
                        </DataTable.Row>
                      )
                    }
                  }) :
                    null
                }
              </ScrollView>
              <DataTable.Pagination
                page={page}
                numberOfPages={4}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
              />
            </DataTable>
            </ScrollView>
          </View>

        </View>
      </LinearGradient>
      :
      <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
        <View style={styles.mainBody}>
          <Loader loading={loading} />

          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 40 }}>
              <Image
                source={require('../Image/back_icon.png')}
                style={{
                  width: 15,
                  height: 15,
                  marginRight: 5
                }}
              />
              <Text style={{ fontSize: 14, color: "rgb(79, 94, 113)", fontWeight: "bold", marginLeft: 5 }} onPress={() => setCheckDocuments(true)}>Back</Text>
            </View>
            <Searchbar
              style={{ borderColor: "rgb(212, 223, 231)", borderWidth: 1, boxShadow: "rgb(0 0 0 / 24%) 0px 3px 4px", height: 60, marginBottom: 10 }}
              placeholder="Search"
              onChangeText={onChangeSearch2}
              value={searchQuery2}
            />
          </View>
          <View style={styles.item_one}>
          <ScrollView horizontal={true}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{width:250}}>Name</DataTable.Title>
                <DataTable.Title style={{width:120}}>Size</DataTable.Title>
                <DataTable.Title style={{width:150}}>Created At</DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {!check2 ?
                  documents.length ?
                    documents.map((item,index) => {
                      return (
                        <DataTable.Row key={index}>
                          <DataTable.Cell style={{width:250}}>{item.name_show ? item.name_show : "-"}</DataTable.Cell>
                          <DataTable.Cell style={{width:120}}>{item.size ? item.size : "-"}</DataTable.Cell>
                          <DataTable.Cell style={{width:150}}>
                            {item.updated_at}
                          </DataTable.Cell>
                        </DataTable.Row>
                      )

                    }) : null
                  : result2.length ? result2.map((item,index) => {
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell style={{width:250}}>{item.name_show ? item.name_show : "-"}</DataTable.Cell>
                        <DataTable.Cell style={{width:120}}>{item.size ? item.size : "-"}</DataTable.Cell>
                        <DataTable.Cell style={{width:150}}>
                          {item.updated_at}
                        </DataTable.Cell>
                      </DataTable.Row>
                    )
                  }) :
                    null
                }
              </ScrollView>
              <DataTable.Pagination
                page={page}
                numberOfPages={4}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
              />
            </DataTable>
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    :
    <Loader loading={loading} />
  );
};
export default DocumentScreen;
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