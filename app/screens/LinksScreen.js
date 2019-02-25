import React from 'react';
import {AsyncStorage, Animated, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import {Avatar, Icon, ListItem, CheckBox } from 'react-native-elements';
import axios from 'axios';

export default class LinksScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      list:[],
      fadeAnim: new Animated.Value(0)
    }
    //this._getGroupsList();
  }
  static navigationOptions = {
    title: 'Links',
    headerStyle: {
      backgroundColor: '#303F9F'
    },headerTitleStyle: {
      color:'#fff',
      fontSize: 24,
      fontWeight: 'bold',
    }
  };
  componentDidUpdate(){
  }
  componentDidMount(){
    /*Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: -50,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();  */
  }
  componentWillUnmount(){
  }
  _getGroupsList = async () => {
    let id = await AsyncStorage.getItem('userId');
    let url = await AsyncStorage.getItem('url') + '/edu/groups';
    axios
    .get(url, {params:{id:id, day:2}})
    .then(response => this.setState({list:response.data}));
  };
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    //backgroundColor: '#fff176aa',
    backgroundColor:'#C5CAE9',
  },
});
