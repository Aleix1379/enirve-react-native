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
import ExercisesScreen from './screens/ExercisesScreen';
import ResumeScreen from './screens/ResumeScreen';

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

/*const HomeStack = createStackNavigator(
  {
    HomeRoot: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Exercises: {
      screen: ExercisesScreen,
    },
  },
  {
    initialRouteName: 'HomeRoot',
  },
);*/

/*HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  console.log('navigation.state.index: ' + navigation.state.index);

  if (navigation.state.index > 0) {
    console.log('tabBarVisible FALSE');
    tabBarVisible = false;
  }

  console.log(`TabBarVisible: ${tabBarVisible}`);

  return {
    tabBarVisible,
  };
};*/

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        header: null,
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

const HomeDetailStack = createStackNavigator({
  Tabs: {
    screen: BottomTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  Exercises: ExercisesScreen,
  Resume: {
    screen: ResumeScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthNavigator,
      App: BottomTabNavigator,
      HomeDetailStack: HomeDetailStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);
