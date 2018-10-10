import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TextInput, Button, ScrollView} from 'react-native';

export default class DetailScreen extends React.Component {

  static navigationOptions = {
    title: 'Nation Details',
    headerStyle: {
      backgroundColor: '#16425B'
    },
    headerTitleStyle: {
      color: '#D9DCD6'
    },
    headerTintColor: '#D9DCD6'
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
      <ScrollView>
        <View style={styles.container}>
          <View style={{alignSelf: 'center'}}>
            <Image style={{ width: 200, height: 150 }}
              source={{uri: `https://www.countryflags.io/${alpha2Code}/flat/64.png`}}/>
            <Text style={styles.textCountryName}>{name}</Text>
          </View>
          <View style={{marginTop: 40, marginBottom: 40}}>
            <Text style={styles.text}>Capital: {capital}</Text>
            <Text style={styles.text}>Region: {region}</Text>
            <Text style={styles.text}>Population: {population}</Text>
            <Text style={styles.text}>Area: {area} m2 </Text>
            <Text style={styles.text}>Native name: {nativeName}</Text>
            <Text style={styles.text}>Time zones:</Text>
            {
              timezones.map((timezone, id) =>
                <Text style={styles.text} key={id}>{timezone}</Text>
              )
            }
          </View>
        </View>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#B7CFDE'
  },
  text: {
    fontSize: 18,
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#B7CFDE'
  },
  textCountryName: {
    fontSize: 35,
    alignSelf: 'center'
  }
});
