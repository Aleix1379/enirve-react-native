import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import createSwitchNavigator from '@react-navigation/core/lib/commonjs/navigators/createSwitchNavigator';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCrown, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {createAppContainer} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/AuthScreen';
import {createStackNavigator} from 'react-navigation-stack';
import FriendsScreen from './screens/FriendsScreen';

export const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      headerMode: 'none',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FontAwesomeIcon size={22} color={tintColor} icon={faCrown} />
        ),
      },
    },
    Friends: {
      screen: FriendsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FontAwesomeIcon size={22} color={tintColor} icon={faUsers} />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FontAwesomeIcon size={22} color={tintColor} icon={faUser} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthNavigator,
      App: AppNavigator,
    },
    {
      initialRouteName: 'App',
    },
  ),
);
