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
<<<<<<< HEAD
            value={ this.state.query }
            style={styles.input}
||||||| merged common ancestors
            style={styles.input}
=======
>>>>>>> 71d4ddfbcf006098f067a4efa079fdd9c8b0958b
            placeholder={'Find a nation'}
          />
          <Button
<<<<<<< HEAD
            title={'Press Me'}
            onPress={this.searchNation}
||||||| merged common ancestors
            title={'Press Me'}
=======
            title="Press me"
            style={styles.button}
>>>>>>> 71d4ddfbcf006098f067a4efa079fdd9c8b0958b
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
