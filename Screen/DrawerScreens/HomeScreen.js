import {View, Text, SafeAreaView} from 'react-native';
import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import AccountScreen from '../Account';

  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');

  const AccountRoute = () => <AccountScreen></AccountScreen>;
  const FolderRoute = () => <Text>FolderRoute</Text>;
  const NewsRoute = () => <Text>NewsRoute</Text>;
  const AttendanceRoute = () => <Text>AttendanceRoute</Text>;
  const GiftRoute = () => <Text>AccountRoute</Text>;

const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  
  const [routes] = React.useState([
    { key: 'Gift', title: 'Gift', icon: 'gift', color: 'rgb(98, 0, 238)' },
    { key: 'Folder', title: 'Folder', icon: 'folder', color: '#4caf50' },
    { key: 'News', title: 'News', icon: 'newspaper', color: '#9c27b0' },
    { key: 'Attendance', title: 'Attendance', icon: 'calendar', color: '#ab003c' },
    { key: 'Account', title: 'Account', icon: 'account', color: '#b26a00' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Gift: GiftRoute,
    Folder: FolderRoute,
    News: NewsRoute,
    Attendance: AttendanceRoute,
    Account: AccountRoute,
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
      {/* <LinearGradient colors={['#312A6C', '#852D91']}>
        <Appbar.Header >
          <Appbar.BackAction onPress={_goBack} />
          <Appbar.Content title="Title" subtitle="Subtitle" />
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
          <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
        </LinearGradient> */}
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