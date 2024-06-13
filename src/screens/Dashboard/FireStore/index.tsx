import {
  FlatList,
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
    const realtimedata = QuerySnapshot?.docs?.map(item => ({
      id: item.id,
      ...item?.data(),
    }));
    setRealTimeData(realtimedata);
  }

  function onError(error) {
    console.error(error);
  }

  // Method to get data with all queries - i.e filtering, sorting
  useEffect(() => {
    const subscriber = firestore()
      .collection(FirebaseKeys.REALTIME_DATA)
      // .where('age', '>=', 18)
      // .where('age', '<=', 30)
      // .where(firestore.Filter('age', '<=', 30))
      // .where(firestore.Filter('name', '==', 'smith')
      // .where(firestore.Filter.or(firestore.Filter('name', '==', 'smith'), firestore.Filter('name', '==', 'will')))
      // .limit(2) // to limit the user
      // .orderBy('age', 'asc')
      // .startAt(26)
      // .endAt(34)
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
  const onDeletePress = async (id: string) => {
    try {
      await firestore().collection(FirebaseKeys.REALTIME_DATA).doc(id).delete();
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };
  // on edit static data
  const onEditPress = async (id: string) => {
    try {
      await firestore().collection(FirebaseKeys.REALTIME_DATA).doc(id).update({
        name: 'aditya',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };
  const renderRealTimeData = ({item}) => {
    return (
      <View style={styles.userView}>
        <View style={styles.nameAgeView}>
          <Text style={styles.userName}>{item.name} </Text>
          <Text>|</Text>
          <Text style={styles.ageText}> Age: {item.age}</Text>
        </View>
        <View style={styles.deleteEditView}>
          <TouchableOpacity onPress={() => onDeletePress(item?.id)}>
            <Text
              style={[
                styles.emailText,
                {textDecorationLine: 'underline', color: colors.red},
              ]}>
              Delete
            </Text>
          </TouchableOpacity>
          <Text> | </Text>
          <TouchableOpacity onPress={() => onEditPress(item?.id)}>
            <Text
              style={[
                styles.emailText,
                {textDecorationLine: 'underline', color: colors.red},
              ]}>
              Edit
            </Text>
          </TouchableOpacity>
          <Text> | </Text>
          <TouchableOpacity
            onPress={() => {
              onPostLikePress(item?.id)
                .then(() =>
                  console.log('Post likes incremented via a transaction'),
                )
                .catch(error => console.error(error));
            }}>
            <Text
              style={[
                styles.emailText,
                {textDecorationLine: 'underline', color: colors.red},
              ]}>
              Like
            </Text>
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
        name: 'kane',
        age: 22,
        createdAt: firestore.FieldValue.serverTimestamp(),
        likes: 0,
      })
      .then(() => {
        console.log('Realtime data added successfully');
      });

    // To Set data with own id
    // await firestore()
    // .collection(FirebaseKeys.REALTIME_DATA)
    // .doc('myID')
    // .set({
    //   name: 'kevin',
    //   age: 26,
    // })
    // .then(() => {
    //   console.log('Realtime data added successfully');
    // });
  };

  const onPostLikePress = postId => {
    console.log('Attempting to like post:', postId);
    const postReference = firestore()
      .collection(FirebaseKeys.REALTIME_DATA)
      .doc(postId);
    return firestore().runTransaction(async transaction => {
      const postSnapshot = await transaction.get(postReference);
      console.log(`postSnapshot`, postSnapshot.data());
      if (!postSnapshot.exists) {
        throw 'Post does not exist!';
      }
      transaction.update(postReference, {
        likes: postSnapshot.data().likes + 1,
      });
    });
  };

  const onBatchDelete = async () => {
    const usersQuerySnapshot = await firestore()
      .collection(FirebaseKeys.REALTIME_DATA)
      .get();
    // Create a new batch instance
    const batch = firestore().batch();
    usersQuerySnapshot.forEach(documentSnapshot => {
      batch.delete(documentSnapshot.ref);
    });
    return batch.commit();
  };

  return (
    <View style={styles.container}>
      <Header title={'FireStore'} isLeftIcon={true} />
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

        <View style={{marginTop: 40, alignItems: 'center'}}>
          <Button title="Add Static Data" onPress={onAddRealTimeData} />
          <Button title="Delete All" onPress={onBatchDelete} />

          <View style={{marginTop: 20}}>
            <FlatList
              data={realTimeData}
              keyExtractor={({item, index}: any) => index?.toString()}
              renderItem={renderRealTimeData}
              style={{paddingBottom: 80}}
              // ListHeaderComponent={headerComponent}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FireStore;
