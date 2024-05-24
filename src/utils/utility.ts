import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to set item in AsyncStorage
export function setItem(key: string, data: any) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem(key, data);
}

// Function to get item from AsyncStorage
export function getItem(key: string): Promise<any> {
  return new Promise(resolve => {
    AsyncStorage.getItem(key).then((data: any) => {
      resolve(JSON.parse(data));
    });
  });
}
