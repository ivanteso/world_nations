import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, SearchBar, Image} from 'react-native';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };

  state = {
    nations: [],
    
  }
  inputText = '';

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(json => {
        this.setState({ nations: json });
      });
  }

  handleChangeSearch = (event) => {
    this.setState({countryFilter: event.target.value})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>World Nations</Text>
        <SearchBar
        showLoading
        onChangeText={text => {
          this.inputText = text;
        }}
        placeholder='Search'
       >
       </SearchBar>
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
  welcome: {
    fontSize:30,
    color:'darkgray',
    textTransform: 'uppercase',
    textAlign:'center',
    letterSpacing:1,
    margin:30,
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
