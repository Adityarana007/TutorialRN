/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';

import Routes from './src/navigation';
import colors from './src/theme/colors';
import BootSplash from "react-native-bootsplash";


function App(): React.JSX.Element {

  useEffect(() => {
    setTimeout(async () => {
      const init = async () => {
        // …do multiple sync or async tasks
      };
  
      init().finally(async () => {
        await BootSplash.hide({ fade: true });
        console.log("BootSplash has been hidden successfully");
      })
    }, 3000)
;
  }, []);

  return (
    <>
    <StatusBar barStyle={'light-content'} backgroundColor={colors.black}/>
    <Routes />
    </>
  );
}

export default App;
