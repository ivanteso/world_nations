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
            title={'Search'}
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
            <View style={styles.row}>
            <View>
              <Image style={styles.flag}
                source={{uri: `https://www.countryflags.io/${arg.item.alpha2Code}/flat/64.png`}}/>
              </View>
                <View style={styles.info}>
                <Text style={styles.nations}>{arg.item.name}</Text>
                <Text>{arg.item.capital}</Text>
                </View>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft:10,
  },
  row: {
    flexDirection:'row',
    alignItems:'stretch',
    borderBottomColor:'#333',
    marginBottom:15,
  },
  info: {
    textAlign:'left',
  },
  nations: {
    fontSize:20,
    marginBottom:5,
  },
  flag: {
    width:80,
    height:50,
    marginRight:10,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom:20,
    marginTop:10,
    marginRight:10,
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
