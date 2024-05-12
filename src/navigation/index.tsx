import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {RouteParamTypes} from './RouteParamTypes';
import colors from '../theme/colors';
import {ScreenNameKeys} from '../constants/ScreenNameKeys';
import Login from '../screens/PreLogin/Login';
import HomeTabs from './HomeTabs';
import ScrollToIndex from '../screens/Dashboard/Home/ScrollToIndex';
import BasicAnimation from '../screens/Dashboard/Home/Basic';
import Register from '../screens/PreLogin/Register';
import auth from '@react-native-firebase/auth';


const Stack = createStackNavigator<RouteParamTypes>();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};
const Routes = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;

  return (
    <NavigationContainer  theme={MyTheme} 
    >
      <Stack.Navigator initialRouteName={!user ? ScreenNameKeys.LOGIN: ScreenNameKeys.HOME_TAB} screenOptions={{headerShown: false}}>
      {/* <Stack.Navigator initialRouteName={ScreenNameKeys.LOGIN} screenOptions={{headerShown: false}}> */}

        <Stack.Screen name={ScreenNameKeys.LOGIN} component={Login} />
        <Stack.Screen name={ScreenNameKeys.REGISTER} component={Register} />
        <Stack.Screen name={ScreenNameKeys.HOME_TAB} component={HomeTabs} />
        <Stack.Screen name={ScreenNameKeys.SCROLL_TO_INDEX} component={ScrollToIndex} />
        <Stack.Screen name={ScreenNameKeys.BASIC_ANIMATION} component={BasicAnimation} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
