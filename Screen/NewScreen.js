import React, {useState,useEffect} from 'react';
import { LinearGradient } from "expo-linear-gradient";
import {StyleSheet,View,Text,ScrollView,Image,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Avatar,Dialog,Searchbar,List,TextInput    } from 'react-native-paper';
import {REACT_APP_API,REACT_APP_FILE} from "@env"
import Loader from './Loader';


const NewScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expanded, setExpanded] = React.useState(true);
  const [text, setText] = React.useState('');
  const handlePress = () => setExpanded(!expanded);
  const onChangeSearch = query => setSearchQuery(query);

  return (
      <LinearGradient colors={['#edf8f1', '#f7f9fc']} style={styles.linearGradient}>
        <View style={styles.mainBody}>
        <Loader loading={loading} />
            <View style={styles.header}>
              <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
              <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
            </View>

            <View style={styles.body}>
            {/* <TextInput
      mode="outlined"
      label="Outlined input"
      placeholder="Type something"
      right={<TextInput.Affix text="/100" />}
    /> */}
            {/* <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section> */}
            </View>         
        </View> 
      </LinearGradient>
  );
};
export default NewScreen;
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
    backgroundColor:"white",
    width:"100%",
    padding:20
  }
})