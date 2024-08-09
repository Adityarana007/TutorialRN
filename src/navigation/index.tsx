import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {RouteParamTypes} from './RouteParamTypes';
import colors from '../theme/colors';
import {ScreenNameKeys} from '../constants/ScreenNameKeys';
import Login from '../screens/PreLogin/Login';
import HomeTabs from './HomeTabs';
import BasicAnimation from '../screens/Dashboard/Home/Basic';
import Register from '../screens/PreLogin/Register';
import auth from '@react-native-firebase/auth';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import FireStore from '../screens/Dashboard/FireStore';
import ProductsListing from '../screens/Dashboard/Home/ProductsListing';
import ProductDetails from '../screens/Dashboard/Home/ProductDetail';
import dynamicLinks from '@react-native-firebase/dynamic-links'
import { useNav } from './useNav';
import ChatScreen from '../screens/Dashboard/ChatScreen';
import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import { sendBirdAPICreds } from '../utils/constants';
import { UserContext } from '../stores/userStorage';
import { sbConnect } from '../sendbird/sendbirdActions';
import { GroupChannelCreateScreen, GroupChannelListScreen, GroupChannelScreen } from '../screens/Dashboard/sendbirdUiKit';
import { useConnection } from '@sendbird/uikit-react-native';



const Stack = createStackNavigator<RouteParamTypes>();
const Drawer = createDrawerNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};
const APP_ID = sendBirdAPICreds.apiKey;


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
    <Stack.Screen
      name={ScreenNameKeys.CHAT_SCREEN}
      component={ChatScreen}
    />
    <Stack.Screen
      name={'GroupChannelList'} component={GroupChannelListScreen}
    />
    <Stack.Screen
      name={'GroupChannelCreate'} component={GroupChannelCreateScreen}
    />
    <Stack.Screen
      name={'GroupChannel'} component={GroupChannelScreen}
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
  const {data, setDataToStore} = useContext(UserContext);

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

  // // sendbird initialization code starts ----
  // useEffect(() => {
  //   console.log('hsjksh')
  //   // sendbirdInit();
  //   const params = {
  //     userId: data.userData.id,
  //     nickname: data.userData.name,
  //   }
  //   // sbConnect(params.userId, params.nickname)
  //   connect(String(params.userId), { nickname: data.userData.name })
  //  }, [])

  //  const sendbirdInit = () => {
  //   const params = {
  //     userId: data.userData.id,
  //     nickname: data.userData.name,
  //   }
  //   // sbConnect(params.userId, params.nickname)
  //   connect(String(params.userId), { nickname: data.userData.name })
  //  }
  //  sendbirdInit();

 
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
