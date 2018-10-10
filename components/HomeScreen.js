import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TextInput, Button, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'World Nations',
    headerStyle: {
      backgroundColor: '#16425B'
    },
    headerTitleStyle: {
      color: '#D9DCD6'
    },
    headerTintColor: '#D9DCD6'
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
          <View style={styles.button}>
            <Button
              color='#2F6690'
              title={'Search'}
              onPress={this.searchNation}
            />
          </View>
          <View style={styles.button}>
            <Button
              color='black'
              title={'Get All'}
              onPress={this.catchAllNations}
            />
          </View>
        </View>



        <FlatList
          style={styles.flatList}
          data={ this.state.nations}
          keyExtractor={(item, index) => item.alpha3Code}
          renderItem={arg =>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Details', arg.item )}
            >
              <View style={styles.row}>
                <Image style={styles.flag}
                  source={{uri: `https://www.countryflags.io/${arg.item.alpha2Code}/flat/64.png`}}/>

                <View style={styles.info}>
                  <Text style={styles.nations} numberOfLines={1}>{arg.item.name}</Text>
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
    backgroundColor: '#B7CFDE',
    flex: 1,
  },
  flatList: {
    alignSelf: 'stretch'
  },
  row: {
    flexDirection:'row',
    alignItems:'stretch',
    alignSelf: 'stretch',
    marginLeft:10,
    marginRight: 10,
    borderBottomColor:'#93B7CD',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  nations: {
    fontSize:20,
    marginBottom:5,
    flex: 1
  },
  flag: {
    width:80,
    height:50,
    marginRight:10,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding:10,
    backgroundColor: '#A5C3D6'
  },
  textInput: {
    height: 40,
    fontSize: 18,
    flex:1,
  },
  button: {
    width: 80,
    marginRight: 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    alignSelf:'flex-start',
  }
});
