import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TextInput, Button} from 'react-native';

export default class DetailScreen extends React.Component {

  static navigationOptions = {
    title: 'Nation Details',
  };

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('name');
    return (
      <Text>{name}</Text>
    )
  }

}
