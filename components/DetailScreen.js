import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TextInput, Button} from 'react-native';

export default class DetailScreen extends React.Component {

  static navigationOptions = {
    title: 'Nation Details',
  };

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('name');
    const region = navigation.getParam('region');
    const area = navigation.getParam('area');
    const population = navigation.getParam('population');
    const alpha2Code = navigation.getParam('alpha2Code');
    const capital = navigation.getParam('capital');
    const timezones = navigation.getParam('timezones');
    const nativeName = navigation.getParam('nativeName');

    return (
      <View>
        <Image style={{ width: 64, height: 64 }}
          source={{uri: `https://www.countryflags.io/${alpha2Code}/flat/64.png`}}/>
        <Text>{name}</Text>
        <Text>{region}</Text>
        <Text>{area}</Text>
        <Text>{population}</Text>
        <Text>{capital}</Text>
        <Text>{nativeName}</Text>
        {
          timezones.map(timezone =>
            <Text>{timezone}</Text>
          )
        }

      </View>

    )
  }

}
