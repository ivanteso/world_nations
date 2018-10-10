/**
 World Countries app
 */

import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import HomeScreen from './components/HomeScreen'
import DetailScreen from './components/DetailScreen'


export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
