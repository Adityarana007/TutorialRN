import { Platform } from "react-native";
import Toast from 'react-native-toast-message';

export const FlatListData = [
    {
        id: 1,
        name: 'iPhone 14'
    },
    {
        id: 2,
        name: 'iPhone 15 Pro'
    },
    {
        id: 3,
        name: 'Macbook Pro'
    },
    {
        id: 4,
        name: 'Dell Windows Laptop'
    },
];

export const toast = (title: string, type: string) => {
    return Toast.show({
      type: type,
      topOffset: Platform.OS === 'ios' ? 70 : 35,
      visibilityTime: 6000,
      text1: title,
    });
  };

  export const toastType = {
    SUCESS_TOAST: 'successToast',
    ERROR_TOAST: 'errorToast',
  };