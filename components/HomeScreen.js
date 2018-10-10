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
            placeholder={'Find a nation'}
          />
          <Button
            title="Press me"
            style={styles.button}
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
