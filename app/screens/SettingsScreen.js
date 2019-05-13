import React from 'react';
import {
    AsyncStorage,
    Button,
    Picker,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Avatar } from "react-native-elements";


class SettingsScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      reqDevice:1,
      avatarTitle:'DT',
      userInfo:{
        name:'',
        surname:'',
        username:'',
      },
    };
    this._getUserInfo();
  }
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#303F9F'
    },headerTitleStyle: {
      color:'#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
  };
  _picked = (value) => {
    AsyncStorage.setItem('url',value)
  }
  _getUserInfo = async() => {
    let id = await AsyncStorage.getItem('userId');
    url = await AsyncStorage.getItem('url') + '/user/info';
    await fetch(url + '?userId='+id)
    .then(res=>res.json())
    .then(res=>this.setState({userInfo:res[0]}))
    .catch(err=>console.warn('err'))
    this.setState({avatarTitle:this.state.userInfo.name[0].toUpperCase() + this.state.userInfo.surname[0].toUpperCase()})
  }
  render() {
    return(
        <View style={styles.container}>
            <View style={{margin:20, flexDirection:'row'}}>
              <Avatar
                  size="xlarge"
                  title= {this.state.avatarTitle}
                  onPress={() => console.log("")}
                  activeOpacity={0.7}
                /> 
              <View style={{margin:10,}}>
                <Text style={styles.infoStyle}>Имя: {this.state.userInfo.name}</Text>
                <Text style={styles.infoStyle}>Фамилия: {this.state.userInfo.surname}</Text>
                <Text style={styles.infoStyle}>Логин: {this.state.userInfo.username}</Text>
              </View>
            </View>
            <Picker
              selectedValue={this.state.reqDevice}
              style={{flex:1, height: 50, width: 150,}}
              onValueChange={(itemValue, itemIndex) => {
                this._picked(itemValue);
                this.setState({reqDevice:itemValue})
              }}>
              <Picker.Item label="Server" value='https://gentle-depths-43328.herokuapp.com' />
              <Picker.Item label="Local" value='http://192.168.1.100:1337' />
            </Picker>
            <TouchableOpacity style={[styles.saveButton,{opacity:100}]} onPress={this._signOutAsync}>
              <Text style={styles.saveButtonText}>Выйти из аккаунта</Text>
            </TouchableOpacity>
        </View>
    );
  }
  _signOutAsync = async () => {
        await AsyncStorage.setItem('userToken','');
        this.props.navigation.navigate('Auth');
  };
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#C5CAE9',
    },
    saveButtonText:{textAlign:'center', fontSize:18, fontWeight:'400', color:'#000'},
    saveButton:{backgroundColor:'#fff',justifyContent:'center', height:40, borderColor:'#3F51B5', borderWidth:1, borderRadius:10, margin:7, marginBottom:20},
    infoStyle:{fontWeight:'400', fontSize:18},
});
export default withNavigation(SettingsScreen);