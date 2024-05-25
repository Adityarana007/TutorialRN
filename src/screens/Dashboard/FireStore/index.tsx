import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/Header';
import colors from '../../../theme/colors';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import Button from '../../../components/Button/Button';
import {FirebaseKeys} from '../../../utils/ConstantKeys';

interface UserData {
  name: string;
  email: string;
  password?: number;
}

const FireStore = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [realTimeData, setRealTimeData] = useState([]);

  function onResult(QuerySnapshot) {
    console.log('Got Users collection result.', QuerySnapshot?.docs[0]?.data());
    const realtimedata = QuerySnapshot?.docs?.map(item => (
      {
        id: item.id,
        ...item?.data()
      }
    ));
    console.log('realTimeData', realtimedata);
    setRealTimeData(realtimedata);
  }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection(FirebaseKeys.REALTIME_DATA)
      .onSnapshot(onResult, onError);
    return () => subscriber();
  }, []);

  /**
   * To get list of registered users from firestore
   */
  const getUsers = async () => {
    const usersCollection = await firestore()
      .collection(FirebaseKeys.USERS)
      .get();
    const usersList = usersCollection.docs.map(obj => obj.data() as UserData);
    console.log(usersList);
    setUsersData(usersList);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const renderusersList = ({item}) => {
    return (
      <View style={styles.userView}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.emailText}>{item.email}</Text>
      </View>
    );
  };

  // on delete static data
  const onDeletePress  = async (id: string) => {
    try {
      await firestore().collection(FirebaseKeys.REALTIME_DATA).doc(id).delete();
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  }
  // on edit static data
  const onEditPress  = async (id: string) => {
    try {
      await firestore().collection(FirebaseKeys.REALTIME_DATA).doc(id).update({
        name: 'aditya'
      });
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  }
  const renderRealTimeData = ({item}) => {
    console.log('item_realtime', item)
    return (
      <View style={styles.userView}>
        <Text style={styles.userName}>{item.name}</Text>
        <View style={styles.deleteEditView}>
          <TouchableOpacity onPress={() => onDeletePress(item?.id)}>
          <Text style={[styles.emailText, {textDecorationLine: 'underline', color: colors.red}]}>Delete</Text>
          </TouchableOpacity>
          <Text> | </Text>
          <TouchableOpacity onPress={() => onEditPress(item?.id)}>
          <Text style={[styles.emailText, {textDecorationLine: 'underline', color: colors.red}]}>Edit</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  };

  /**
   * To add static data in firestore
   */
  const onAddRealTimeData = async () => {
    await firestore()
      .collection(FirebaseKeys.REALTIME_DATA)
      .add({
        name: 'John ',
        age: 24,
      })
      .then(() => {
        console.log('Realtime data added successfully');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'FireStore'} isLeftIcon />
      <ScrollView>
        <StatusBar backgroundColor={colors.black} barStyle={'light-content'} />
        <View style={styles.headingView}>
          <Text style={styles.headingText}>List of All Registered Users</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <FlatList
            data={usersData}
            keyExtractor={({item, index}: any) => index?.toString()}
            renderItem={renderusersList}
          />
        </View>

        <View>
          <View style={{marginTop: 40, alignItems: 'center'}}>
            <Button title="Add Static Data" onPress={onAddRealTimeData} />
            <View style={{marginTop: 20}}>
              <FlatList
                data={realTimeData}
                keyExtractor={({item, index}: any) => index?.toString()}
                renderItem={renderRealTimeData}
                style={{paddingBottom: 40}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FireStore;
