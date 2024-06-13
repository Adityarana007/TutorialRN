import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {RouteParamTypes} from './RouteParamTypes';
import colors from '../theme/colors';
import {ScreenNameKeys} from '../constants/ScreenNameKeys';
import Login from '../screens/PreLogin/Login';
import HomeTabs from './HomeTabs';
import ScrollToIndex from '../screens/Dashboard/Home/ProductsListing';
import BasicAnimation from '../screens/Dashboard/Home/Basic';
import Register from '../screens/PreLogin/Register';
import auth from '@react-native-firebase/auth';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from '../screens/Dashboard/FireStore';
import CustomDrawerContent from './CustomDrawerContent';
import FireStore from '../screens/Dashboard/FireStore';
import ProductsListing from '../screens/Dashboard/Home/ProductsListing';
import ProductDetails from '../screens/Dashboard/Home/ProductDetail';
import dynamicLinks from '@react-native-firebase/dynamic-links'
import { useNav } from './useNav';


const Stack = createStackNavigator<RouteParamTypes>();
const Drawer = createDrawerNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

const MainStackNavigator = ({user}) => (
  <Stack.Navigator
    initialRouteName={!user ? ScreenNameKeys.LOGIN : ScreenNameKeys.HOME_TAB}
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={ScreenNameKeys.LOGIN} component={Login} />
    <Stack.Screen name={ScreenNameKeys.REGISTER} component={Register} />
    <Stack.Screen name={ScreenNameKeys.HOME_TAB} component={HomeTabs} />
    <Stack.Screen
      name={ScreenNameKeys.PRODUCTS_LISTING}
      component={ProductsListing}
    />
    <Stack.Screen
      name={ScreenNameKeys.BASIC_ANIMATION}
      component={BasicAnimation}
    />
       <Stack.Screen
      name={ScreenNameKeys.FIRESTORE}
      component={FireStore}
    />
       <Stack.Screen
      name={ScreenNameKeys.PRODUCT_DETAILS}
      component={ProductDetails}
    />
  </Stack.Navigator>
);

const DrawerNavigator = ({user}) => (
  <Drawer.Navigator
    initialRouteName={ScreenNameKeys.HOME_TAB}
    screenOptions={{headerShown: false}}
    drawerContent={props => <CustomDrawerContent {...props} />}
    >
    <Drawer.Screen
      name={ScreenNameKeys.HOME_TAB}
      component={() => <MainStackNavigator user={user} />}
    />
  </Drawer.Navigator>
);

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

  const HandleDeepLinking = () => {
    const navigation = useNav();
    const handleLink = async (link) => {
      let productId = link.url.split('=').pop();
      console.log('linksss', productId)
      navigation.navigate(ScreenNameKeys.PRODUCT_DETAILS, {
        id: productId
      })
    }
    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleLink)
      return () => unsubscribe; 
    }, []);


    useEffect(() => {
      const unsubscribe = dynamicLinks().getInitialLink().then(async (link) => {
        console.log('link in quit state', link);
        let productId = link.url.split('=').pop();
        console.log('quitLink', productId)
        navigation.navigate(ScreenNameKeys.PRODUCT_DETAILS, {
          id: productId
        })
      })
      return () => unsubscribe; 
    }, []);
  
    return null;
  }

 
  return (
    <NavigationContainer theme={MyTheme}>
      {!user ? (
        <MainStackNavigator user={user} />
      ) : (
        <>
        <HandleDeepLinking/>
        <DrawerNavigator user={user} />
        </>
      )}
    </NavigationContainer>
  );
};

export default Routes;
