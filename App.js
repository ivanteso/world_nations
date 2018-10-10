/**
 World Countries app
 */

import React, {Component} from 'react';
<<<<<<< HEAD
import {Platform, StyleSheet, Text, View, FlatList, Image, Button, TextInput} from 'react-native';
=======
import {Platform, StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import HomeScreen from './components/HomeScreen'
>>>>>>> 76f8dd37f740f83cf4ecf8c5c0091cd9a2cd342e


<<<<<<< HEAD
  state = {
    nations: [],
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(json => {
        this.setState({ nations: json });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WORLD NATIONS</Text>
        <FlatList
          data={ this.state.nations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={arg =>
            <View>
              <Text style={styles.nations}>{arg.item.name}</Text>
              {
                arg.item.borders.map(border => {
                  return <Text style={styles.text}>{border}</Text>
                })
              }

            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection:'row',
  },
  flag: {
    width:75,
    height:50,
  },
  welcome: {
    fontSize:24,
    color:'darkgray',
    textTransform: 'uppercase',
    textAlign:'center',
    letterSpacing:1,
    margin:10,
  },
  nations: {
    fontSize:60,
    alignSelf:'center',
=======
export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    }
>>>>>>> 76f8dd37f740f83cf4ecf8c5c0091cd9a2cd342e
  },
  {
    initialRouteName: 'Home',
  }
);
