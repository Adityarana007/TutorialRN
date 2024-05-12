import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import styles from './styles';
import Button from '../../../components/Button/Button';
import { useNav } from '../../../navigation/useNav';
import { ScreenNameKeys } from '../../../constants/ScreenNameKeys';
import Header from '../../../components/Header';
import auth from '@react-native-firebase/auth';
import { toast, toastType } from '../../../utils/constants';


const Profile = () => {
    const navigation = useNav();
    const onLogout = () => {
      auth()
  .signOut()
  .then(() => {
    console.log('User signed out!');
    toast('Logged Out Successfully.', toastType.ERROR_TOAST);
    navigation.reset({
      index: 0,
      routes: [{name: ScreenNameKeys.LOGIN}],
    });

  });
    }
    return(
        <>
      <Header title={'Profile'} />
      <SafeAreaView style={styles.container}>
        <View style={styles.signinContinueView}>
          <Text style={styles.signinText}>Welcome to Profile Screen</Text>
        </View>
        <Button title="Logout" onPress={onLogout} />
      </SafeAreaView>
    </>
    )
};

export default Profile;