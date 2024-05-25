import React, { useContext } from 'react';
import { Image, Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native';
import styles from './styles';
import Button from '../../../components/Button/Button';
import { useNav } from '../../../navigation/useNav';
import { ScreenNameKeys } from '../../../constants/ScreenNameKeys';
import Header from '../../../components/Header';
import auth from '@react-native-firebase/auth';
import { toast, toastType } from '../../../utils/constants';
import { UserContext } from '../../../stores/userStorage';
import colors from '../../../theme/colors';


const Profile = () => {
    const navigation = useNav();
    const {data, setDataToStore} = useContext(UserContext);
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
    setDataToStore({
      ...data,
      userData: {},
    });
  });
    }
    return(
        <>
        <StatusBar backgroundColor={colors.black} barStyle={'light-content'}/>
      <Header title={'Profile'} />
      <SafeAreaView style={styles.container}>
        <View>
          <Image source={{uri: data?.userData?.profileUrl}} style={{
            height: 150,
            width: 150,
            borderRadius: 100
          }}/>
        </View>
        <View style={styles.signinContinueView}>
          <Text style={styles.signinText}>Welcome {data.userData.name}</Text>
        </View>
        <Button title="Logout" onPress={onLogout} />
      </SafeAreaView>
    </>
    )
};

export default Profile;