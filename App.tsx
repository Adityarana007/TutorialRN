/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import Routes from './src/navigation';
import colors from './src/theme/colors';
import BootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';
import CustomToast from './src/components/Toast';
import WrapperContainer from './src/components/WrapperContainer/WrapperContainer';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import UserProvider from './src/stores/userStorage';

function App(): React.JSX.Element {

  GoogleSignin.configure({
    webClientId: '302401678245-l1io2gpomtesifchm1fsgnkiiv9k2t5n.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
   });

  return (
    <UserProvider>
    <WrapperContainer>
      <CustomToast/>
      <Routes />
    </WrapperContainer>
    </UserProvider>
  );
}

export default App;
