/**
 World Countries app
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, Button, TextInput} from 'react-native';

export default class App extends React.Component {

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
  },
  text: {
    fontSize: 18,
    alignSelf:'center',
  }
});
