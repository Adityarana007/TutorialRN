import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteParamTypes} from './RouteParamTypes';
// Custom hook to provide access to the navigation object using useNavigation hook
export const useNav = () => {
  const navigation = useNavigation<StackNavigationProp<RouteParamTypes>>();

  return navigation;
};

export const useRoutes = () => {
  const navigation = useRoute<RouteProp<RouteParamTypes>>();

  return navigation;
};
