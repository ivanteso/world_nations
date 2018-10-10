import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TextInput, Button} from 'react-native';

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
            style={styles.input}
            placeholder={'Find a nation'}
          />
          <Button
            title={'Press Me'}
            onPress={this.searchNation}
          />

        </View>

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
  nations: {
    fontSize:60,
    alignSelf:'center',
  },
  search: {
    flexDirection: 'row',
    margin: 20
  },
  textInput: {
    height: 40,
    fontSize: 18,
    flex: 2
  },
  buttonContainer: {
    flex: 1
  },
  text: {
    fontSize: 18,
    alignSelf:'center',
  }
});
