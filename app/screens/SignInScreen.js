import React from 'react';
import {
  Animated,
  AsyncStorage,
  Button,
  Dimensions,
  View, 
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

export default class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topPadding:Dimensions.get('window').height / 4, 
      width:Dimensions.get('window').width, 
    };
  }
  static navigationOptions = {
    title: 'Please sign in',
    headerStyle: {
      backgroundColor: '#303F9F'
    },headerTitleStyle: {
      color:'#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
  };
  /*componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  _keyboardDidShow = async () => {
    await this.setState({topPadding:this.state.topPadding-20});
  }

  _keyboardDidHide = async () => {
    this.setState({topPadding:this.state.topPadding+20});
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }*/
  render() {
    return (
      <View style={{alignSelf:'center', width:this.state.width - 40, paddingVertical:this.state.topPadding}}>
        <View style={{flexDirection:'row', paddingVertical:15}}>
          <Icon style={{alignSelf:'flex-end', borderBottomColor: '#0000cc', borderBottomWidth: 1}} name="user" size={30} color="#0000cc" />
          <TextInput
            style={{paddingLeft:15, paddingVertical:0, flex:1, fontSize:20, height: 40, borderBottomColor: '#0000cc', borderBottomWidth: 1}}
            onChangeText={(username) => this.setState({username:username})}
          />
        </View>
        <View style={{flexDirection:'row', paddingVertical:15}}>
          <Icon style={{alignSelf:'flex-end', borderBottomColor: '#ff0066', borderBottomWidth: 1}} name="lock" size={30} color="#900" />
          <TextInput
            textContentType='password'
            style={{paddingLeft:15, paddingVertical:0, flex:1, fontSize:20, height: 40, borderBottomColor: '#ff0066', borderBottomWidth: 1}}
            onChangeText={(password) => this.setState({password:password})}
          />
        </View>
        <Button
          style={{ position:'absolute',marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="SIGN IN"
          onPress={() => {this._signInAsync()}}
        />
      </View>
    );
  }

  _signInAsync = async () => {
    let url = await AsyncStorage.getItem('url') + '/session/create'
    await fetch(url, {
      method: 'POST',
      headers: {
        'user-agent': 'mobile-app',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res)=>{
        if(res.status == 200){
          AsyncStorage.setItem('userToken', 'abc');
          this.props.navigation.navigate('Main');
        }
        return res.json()
      })
      .then(res => AsyncStorage.setItem('userId', res.id))
      .catch((error)=>{
        console.log('There has been a problem with your fetch operation: ' + error);
      });
  };
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput:{
    //flex:1,
    height:30,
    backgroundColor:'gray',
    justifyContent: 'center',
  },
});*/