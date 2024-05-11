import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react';
  import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
  import {Platform, StyleSheet, Text, View} from 'react-native';
  import {moderateScaleVertical, textScale} from '../theme/responsiveSize';
import colors from '../theme/colors';
import { ScreenNameKeys } from '../constants/ScreenNameKeys';
import Home from '../screens/Dashboard/Home';
import { Icons } from '../assets/icons';
import Profile from '../screens/Dashboard/Profile';
 
  const Tab = createBottomTabNavigator();
  
  const ICON_SIZE = 24;
  
  function HomeTabs() {
    const [route, setRoute] = useState(ScreenNameKeys.HOME);

    // Return the bottom tab navigator with specified screens and options
    return (
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarBadgeStyle: styles.badgeStyle,
          }}>
          <Tab.Screen
            name={ScreenNameKeys.HOME}
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarLabelStyle: {
                fontSize: textScale(10),
                marginTop: 10,
                color: route === ScreenNameKeys.HOME ? colors.yellow : colors.white
              },
              tabBarIcon: ({focused}) => {
                if(focused){
                    return <Icons.HomeFill height={ICON_SIZE} width={ICON_SIZE} />
                } else {
                    return <Icons.Home height={ICON_SIZE} width={ICON_SIZE} />
                }
              },
            }}
            listeners={{
                focus: () => setRoute(ScreenNameKeys.HOME)
            }}
          />

<Tab.Screen
            name={ScreenNameKeys.PROFILE}
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarLabelStyle: {
                fontSize: textScale(10),
                marginTop: 10,
                color: route === ScreenNameKeys.PROFILE ? colors.yellow : colors.white
              },
              tabBarIcon: ({focused}) => {
                if(focused){
                    return <Icons.ProfileFill height={ICON_SIZE} width={ICON_SIZE} />
                } else {
                    return <Icons.ProfileIcon height={ICON_SIZE} width={ICON_SIZE} />
                }
              },
            }}
            listeners={{
                focus: () => setRoute(ScreenNameKeys.PROFILE)
            }}
          />

          {/* <Tab.Screen
            name={ScreenNameKeys.CART}
            component={MyCart}
            listeners={{
              tabPress: handleCartPress,
            }}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({color}) => tabBarIcon(color, ScreenNameKeys.CART),
            }}
          /> */}
        </Tab.Navigator>
      </View>
    );
  }
  
  export default HomeTabs;
  
  const styles = StyleSheet.create({
    container: {flex: 1},
    tabBarStyle: {
      paddingTop: moderateScaleVertical(22),
      paddingBottom: Platform.OS === 'android' ? 6 : 15,
      height:
        Platform.OS === 'android'
          ? moderateScaleVertical(68)
          : moderateScaleVertical(75),
        backgroundColor: colors.black
    },
    badgeStyle: {
      top: -5,
    },
    cartCountView: {
      position: 'absolute',
      backgroundColor: 'red',
      borderRadius: 1000,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
    },
    cartCountText: {
      color: colors.white,
      fontSize: textScale(10),
      fontWeight: '500',
      textAlign: 'center',
    },
    cartCountSphere: {
      position: 'absolute',
      left: moderateScaleVertical(10),
      top: moderateScaleVertical(-8),
    },
  });
  