import React, { useEffect } from 'react';
import {Pressable, SafeAreaView, StatusBar, Text, View} from 'react-native';
import styles from './styles';
import Button from '../../../components/Button/Button';
import {useNav} from '../../../navigation/useNav';
import {ScreenNameKeys} from '../../../constants/ScreenNameKeys';
import Header from '../../../components/Header';
import { DrawerActions } from '@react-navigation/native';
import colors from '../../../theme/colors';
import dynamicLinks from '@react-native-firebase/dynamic-links';


const Home = () => {
  const navigation = useNav();
  const onScrollToIndexPress = () => {
    navigation.navigate(ScreenNameKeys.PRODUCTS_LISTING);
  }
  const onBasicAnimationPress = () => {
    navigation.navigate(ScreenNameKeys.BASIC_ANIMATION);
  }
 const handleDynamicLinks = async (link) => {
  console.log('linkss')
}



  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);


  return (
    <>
      <Header title={'Home'} isHamburger={true}/>
      <StatusBar backgroundColor={colors.black} barStyle={'light-content'}/>

      <SafeAreaView style={styles.container}>
        <View style={styles.signinContinueView}>
          <View style={styles.flexRow}>
            
            <Button title='Show All Products' onPress={onScrollToIndexPress}/>
            {/* <Button title='Basic Animation' onPress={(onBasicAnimationPress)}/> */}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
