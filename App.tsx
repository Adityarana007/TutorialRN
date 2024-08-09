/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import Routes from './src/navigation';
import CustomToast from './src/components/Toast';
import WrapperContainer from './src/components/WrapperContainer/WrapperContainer';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import UserProvider from './src/stores/userStorage';
import { SendbirdUIKitContainer } from '@sendbird/uikit-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { platformServices } from './src/sendbird/PlatformService';
import { sendBirdAPICreds } from './src/utils/constants';

function App(): React.JSX.Element {
  GoogleSignin.configure({
    webClientId: '302401678245-l1io2gpomtesifchm1fsgnkiiv9k2t5n.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
   });

  return (
    <UserProvider>
       <SendbirdUIKitContainer
      appId={sendBirdAPICreds.apiKey}
      chatOptions={{ localCacheStorage: AsyncStorage }}
      platformServices={platformServices}
    >
    <WrapperContainer>
      <CustomToast/>
      <Routes />
    </WrapperContainer>
    </SendbirdUIKitContainer>
    </UserProvider>
  );
}

export default App;
