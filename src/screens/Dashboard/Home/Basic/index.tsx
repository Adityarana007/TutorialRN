import React, { useState } from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {FlatListData} from '../../../../utils/constants';
import styles from './styles';
import Header from '../../../../components/Header';

/**
 * Component to practice basic react native animations
 * @returns JSX
 */

const BasicAnimation = () => {
 
  return (
    <SafeAreaView>
      <View style={styles.container}>
      <Header title={'Basic Animations'} isLeftIcon={true} />
        
      </View>
    </SafeAreaView>
  );
};
export default BasicAnimation;
