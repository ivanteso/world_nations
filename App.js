/**
 World Countries app
 */

import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import HomeScreen from './components/HomeScreen'



export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);
