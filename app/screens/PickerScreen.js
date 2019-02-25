import React from 'react';
import {
  AsyncStorage,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';

import {Avatar, Icon, ListItem } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[],
      dayOTWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    };
    let day = this.props.navigation.getParam('day');
    this._getGroupsList(day);
  }
  
  static navigationOptions = {
    title: 'Subject selection',
    headerStyle: {
      backgroundColor: '#303F9F'
    },headerTitleStyle: {
      color:'#fff',
      fontSize: 24,
      fontWeight: 'bold',
    }
  };
  _getGroupsList = async (day) => {
    let id = await AsyncStorage.getItem('userId');
    let url = await AsyncStorage.getItem('url') + '/edu/groups';
    axios
    .get(url, {params:{id:id, day:Number(day)}})
    .then(response => this.setState({list:response.data}));
  };
  _onPress = (item)=>{
    this.props.navigation.state.params.returnData(item.gNum);
    AsyncStorage.setItem('subjId', item.id)
    AsyncStorage.setItem('groupNumber', item.gNum)
    this.props.navigation.goBack();
  };
  render() {
    let days = [1,2,3,4,5,6];
    return (
      <View style={styles.container}>
        {
          days.map((val, i)=>{
            let first = this.state.list.filter(v=>Number(v.number)===i);
            let second = this.state.list.filter(v=>Number(v.number)===i+1);
            if(i%2===0){
              return(
                <View key={i} style={{flex:1, flexDirection:"row",}}>
                  <TouchableOpacity style={styles.day} onPress={()=>this._onPress(first[0])} disabled={first[0]?false:true} >
                    <Text style={first[0]?styles.header:[styles.header,{backgroundColor:'#BDBDBD'}]}>{`Пара #${val}`}</Text>
                    <Text style={styles.groupNumber}>{first[0]?'Group number '+first[0].gNum:'Нет пары'}</Text>                
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.day} onPress={()=>this._onPress(second[0])} disabled={second[0]?false:true} > 
                    <Text style={second[0]?styles.header:[styles.header,{backgroundColor:'#BDBDBD'}]}>{`Пара #${val+1}`}</Text>
                    <Text style={styles.groupNumber}>{second[0]?'Group number '+second[0].gNum:'Нет пары'}</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor:'#C5CAE9',
  },
  day:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#f5f5f5',
    justifyContent:'flex-start',
    borderColor: '#f5f5f5',
    margin:10,
    borderRadius:5,
    borderTopLeftRadius:7,
    borderTopRightRadius:7,
    borderWidth: 1
  },
  header:{
    color:'white',
    fontSize:16, 
    fontWeight:'400', 
    backgroundColor:'#3f51b5',
    textAlign: 'center',
    borderTopColor:'white',
    borderTopWidth:1,
    borderRadius:7,
  },
  groupNumber:{marginTop:10,fontSize:16,textAlign: 'center'},
});