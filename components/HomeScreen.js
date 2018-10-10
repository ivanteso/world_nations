import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TextInput, Button, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'World Nations',
  };

  state = {
    nations: [],
    query: ''
  }

  textInputRef = React.createRef();

  componentDidMount() {
    this.catchAllNations()
  }

  catchAllNations = () => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(json => {
        this.setState({ nations: json });
      });
  }

  searchNation = () => {
    this.textInputRef.current.clear();
    const query = this.state.query;
    fetch(`https://restcountries.eu/rest/v2/name/${query}`)
    .then(res => res.json())
    .then(json => {
      if (json.status === 404) {
        alert('Not found')
        return;
      }
      this.setState({ nations: json });
    });
  }

  goToDetails = () => {

  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.search}>
          <TextInput
            ref={this.textInputRef}
            style={styles.textInput}
            onChangeText={text => {
              this.setState({ query: text})
            }}
            value={ this.state.query }
            placeholder={'Find a nation'}
          />
          <Button
            title={'Press Me'}
            onPress={this.searchNation}
            style={styles.button}
          />
          <Button
            title={'Get All'}
            onPress={this.catchAllNations}
            style={styles.button}
          />
        </View>



        <FlatList
          data={ this.state.nations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={arg =>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Details', arg.item )}
            >
              <View>
                <Text style={styles.nations}>{arg.item.name}</Text>
                <Image style={{ width: 80, height: 80 }}
                  source={{uri: `https://www.countryflags.io/${arg.item.alpha2Code}/flat/64.png`}}/>
                <Text>{arg.item.capital}</Text>

              </View>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft:10,
  },
  nations: {
    fontSize:24,
    alignItems:'flex-start',
    marginBottom:5,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  textInput: {
    height: 40,
    fontSize: 18,
    flex:1,
  },
  button: {
    flex:2,
  },
  text: {
    fontSize: 18,
    alignSelf:'flex-start',
  }
});
