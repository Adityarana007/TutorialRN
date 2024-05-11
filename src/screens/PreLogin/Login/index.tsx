import React, {useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import Button from '../../../components/Button/Button';
import {useNav} from '../../../navigation/useNav';
import {ScreenNameKeys} from '../../../constants/ScreenNameKeys';
import InputBox from '../../../components/InputBox';
import {Icons} from '../../../assets/icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNav();
  const onLoginPress = () => {
    navigation.navigate(ScreenNameKeys.HOME_TAB);
  };

  const onUsernameChange = (value: string) => {
    setUserName(value);
  };
  const onPasswordChange = (value: string) => {
    setPassword(value);
  };
  const onSignupPress = () => {
    navigation.navigate(ScreenNameKeys.REGISTER)
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        extraScrollHeight={240}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
