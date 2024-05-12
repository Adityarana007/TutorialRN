import React from 'react';
import {Text, View} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {BaseToast, ErrorToast, ToastConfig} from 'react-native-toast-message';
import colors from '../../theme/colors';
import fonts from '../../assets/fonts';
import {textScale} from '../../theme/responsiveSize';


const CustomToast = () => {
  const toastConfig: ToastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'pink'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: textScale(15),
          fontWeight: '400',
        }}
      />
    ),

    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: textScale(17),
        }}
        text2Style={{
          fontSize: textScale(15),
        }}
      />
    ),
    successToast: ({text1, props}) => (
      <View
        style={{
          width: '80%',
          backgroundColor: 'green',
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          borderRadius: 10,
          paddingEnd: 20,
          opacity: 1,
          paddingStart: 20,
          paddingTop: 15,
          paddingBottom: 15,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colors.white,
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: fonts.mulishSemiBold,
          }}>
          {text1}
        </Text>
      </View>
    ),

    errorToast: ({text1, props}) => (
      <View
        style={{
          width: '80%',
          backgroundColor: colors.toastRed,
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          borderRadius: 10,
          paddingEnd: 20,
          opacity: 1,
          paddingStart: 20,
          paddingTop: 15,
          paddingBottom: 15,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colors.white,
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: fonts.mulishRegular,
          }}>
          {text1}
        </Text>
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
};

export default CustomToast;
