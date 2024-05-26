import React, {useContext, useEffect} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';

import colors from '../../theme/colors';
import BootSplash from 'react-native-bootsplash';
import CustomToast from '../Toast';
interface Props {
  children?: any;
}

const WrapperContainer = ({children}: Props) => {
  /**
   * Effect to hide the bootsplash
   */
  useEffect(() => {
    setTimeout(async () => {
      const init = async () => {
        // …do multiple sync or async tasks
      };

      init().finally(async () => {
        await BootSplash.hide({fade: true});
        console.log('BootSplash has been hidden successfully');
      });
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      {/* <SafeAreaView style={{flex:1}}> */}
      {children}
      <CustomToast />
      {/* </SafeAreaView> */}
    </View>
  );
};

export default WrapperContainer;
