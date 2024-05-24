import React, {useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import Button from '../../../components/Button/Button';
import {useNav} from '../../../navigation/useNav';
import {ScreenNameKeys} from '../../../constants/ScreenNameKeys';
import InputBox from '../../../components/InputBox';
import {Icons} from '../../../assets/icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import {toast, toastType} from '../../../utils/constants';

const Register = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNav();

  const checkValidation = () => {
    if (username?.trim()?.length === 0) {
      return false;
    } else if (email?.trim()?.length === 0) {
      return false;
    } else if (password?.trim()?.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  const onRegisterPress = async () => {
    if (checkValidation()) {
      // navigation.navigate(ScreenNameKeys.HOME_TAB);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          toast('User account created & signed in!', toastType.SUCESS_TOAST);
          navigation.navigate(ScreenNameKeys.LOGIN);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            toast(
              'That email address is already in use.',
              toastType.ERROR_TOAST,
            );
          }

          if (error.code === 'auth/invalid-email') {
            toast('That email address is invalid.', toastType.ERROR_TOAST);
          }
        });
    } else {
      toast('Please fill all the fields', toastType.ERROR_TOAST);
    }
  };

  const onUsernameChange = (value: string) => {
    setUserName(value);
  };
  const onPasswordChange = (value: string) => {
    setPassword(value);
  };
  const onConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };
  const onEmailChange = (value: string) => {
    setEmail(value);
  };
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={240}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'handled'}>
      <Icons.Logo height={180} width={200} />
      <Text style={styles.signupText}>Sign up</Text>
      <View style={styles.marginTop30}>
        <InputBox
          floatingText="Firstname"
          value={username}
          onTextChange={onUsernameChange}
          placeholder="Enter Name"
        />
      </View>
      <View style={styles.marginTop30}>
        <InputBox
          floatingText="Email"
          value={email}
          onTextChange={onEmailChange}
          placeholder="Enter email"
        />
      </View>
      <View style={styles.marginTop30}>
        <InputBox
          floatingText="Password"
          secureTextEntry
          value={password}
          onTextChange={onPasswordChange}
          placeholder="Enter Password"
        />
      </View>
      {/* <View style={styles.marginTop30}>
        <InputBox
          floatingText="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onTextChange={onConfirmPasswordChange}
          placeholder="Enter Confirm Password"
        />
      </View> */}
      <View style={styles.btnOuterView}>
        <Button title="Register" onPress={onRegisterPress} />
      </View>
      <View style={styles.noAccountOuterView}>
        <Pressable style={styles.signupTextOuterView} onPress={onBackPress}>
          <Text style={styles.signup}>Back To Login</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;
