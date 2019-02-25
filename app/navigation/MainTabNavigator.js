import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome'
//pickerScreen
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ListScreen from '../screens/PickerScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Picker: ListScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'home'
      }
      size={30}
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={Platform.OS === 'ios' ? 'gratipay' : 'heart'}
      size={28}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={Platform.OS === 'ios' ? 'user-circle' : 'user'}
      size={30}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
},{
  tabBarOptions:{
    activeBackgroundColor:'#303F9F',
    animationEnabled:true,
    activeTintColor:'#fff',
    style:{
      backgroundColor:'#3F51B5'
    }
  }
});
