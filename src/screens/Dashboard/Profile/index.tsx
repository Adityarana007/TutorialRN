import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import styles from './styles';
import Button from '../../../components/Button/Button';
import { useNav } from '../../../navigation/useNav';
import { ScreenNameKeys } from '../../../constants/ScreenNameKeys';
import Header from '../../../components/Header';

const Profile = () => {
    const navigation = useNav();
    return(
        <>
      <Header title={'Profile'} />
      <SafeAreaView style={styles.container}>
        <View style={styles.signinContinueView}>
          <Text style={styles.signinText}>Welcome to Profile Screen</Text>
        </View>
      </SafeAreaView>
    </>
    )
};

export default Profile;