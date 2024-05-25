import React from 'react';
import {Pressable, SafeAreaView, StatusBar, Text, View} from 'react-native';
import styles from './styles';
import Button from '../../../components/Button/Button';
import {useNav} from '../../../navigation/useNav';
import {ScreenNameKeys} from '../../../constants/ScreenNameKeys';
import Header from '../../../components/Header';
import { DrawerActions } from '@react-navigation/native';
import colors from '../../../theme/colors';

const Home = () => {
  const navigation = useNav();
  const onScrollToIndexPress = () => {
    navigation.navigate(ScreenNameKeys.SCROLL_TO_INDEX);
  }
  const onBasicAnimationPress = () => {
    navigation.navigate(ScreenNameKeys.BASIC_ANIMATION);
  }
  return (
    <>
      <Header title={'Home'} isHamburger={true}/>
      <StatusBar backgroundColor={colors.black} barStyle={'light-content'}/>

      <SafeAreaView style={styles.container}>
        <View style={styles.signinContinueView}>
          <View style={styles.flexRow}>
            
            <Button title='Scroll To Index' onPress={onScrollToIndexPress}/>
            <Button title='Basic Animation' onPress={(onBasicAnimationPress)}/>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
