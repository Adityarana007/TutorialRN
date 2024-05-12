import React, {useEffect, useState} from 'react';
import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import Button from '../../../components/Button/Button';
import {useNav} from '../../../navigation/useNav';
import {ScreenNameKeys} from '../../../constants/ScreenNameKeys';
import InputBox from '../../../components/InputBox';
import {Icons} from '../../../assets/icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {toast, toastType} from '../../../utils/constants';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const navigation = useNav();
  const checkValidation = () => {
    if(username?.trim()?.length === 0 ){
      return false
    } else if(password?.trim()?.length === 0 ){
      return false
    } else {
      return true;
    }
  }
  const onLoginPress = () => {
    console.log(checkValidation())
    if(checkValidation()){
      auth()
      .signInWithEmailAndPassword(username, password)
      .then(res => {
        toast('Logged in successfully.', toastType.SUCESS_TOAST);
        navigation.reset({
          index: 0,
          routes: [{name: ScreenNameKeys.HOME_TAB}],
        });
      })
      .catch(err => {
        console.log(err.code);
        if (err.code === 'auth/wrong-password') {
          toast('Invalid Credentials', toastType.ERROR_TOAST);
        } else if (err.code === 'auth/invalid-email') {
          toast('Pleae enter valid email', toastType.ERROR_TOAST);
        } else {
          toast(err.toString(), toastType.ERROR_TOAST);
        }
        // toast(err.toString(), toastType.ERROR_TOAST)
      });
    } else {
      toast('Please enter username and password.', toastType.ERROR_TOAST);

    }

  };

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    if(idToken) {
      toast('Logged in successfully.', toastType.SUCESS_TOAST);
        navigation.reset({
          index: 0,
          routes: [{name: ScreenNameKeys.HOME_TAB}],
        });
    }
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const onUsernameChange = (value: string) => {
    setUserName(value);
  };
  const onPasswordChange = (value: string) => {
    setPassword(value);
  };
  const onSignupPress = () => {
    navigation.navigate(ScreenNameKeys.REGISTER);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        extraScrollHeight={ Platform.OS === 'ios' ? 240 : 60}
        enableOnAndroid={true}
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        style={{flex:1}}
        contentContainerStyle={[styles.container]}
        keyboardShouldPersistTaps={'handled'}>
        <Icons.Logo height={180} width={200} />
        <View style={styles.marginTop30}>
          <InputBox
            floatingText="Username"
            value={username}
            onTextChange={onUsernameChange}
            placeholder="User Name"
          />
        </View>
        <View style={styles.marginTop30}>
          <InputBox
            floatingText="Password"
            secureTextEntry
            value={password}
            onTextChange={onPasswordChange}
            placeholder="Password"
          />
        </View>
        <View style={styles.btnOuterView}>
          <Button title="Login" onPress={onLoginPress} />
        </View>
        <View style={styles.noAccountOuterView}>
          <Text style={styles.noAccountText}>Not having account? </Text>
          <Pressable style={styles.signupTextOuterView} onPress={onSignupPress}>
            <Text style={styles.signup}>Signup</Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.anotherSigninView}
          onPress={() => {
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            );
          }}>
            <Icons.GoogleLogo height={20} width={20}/>
          <Text style={styles.googleText}>Continue With Google</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
