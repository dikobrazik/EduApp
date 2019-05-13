import React from 'react';
import {AsyncStorage, Animated, Button,FlatList, ScrollView, StyleSheet,Picker, Text, View } from 'react-native';
import {Avatar, Icon, ListItem, CheckBox } from 'react-native-elements';
import MyListItem from '../components/ListItem'

export default class LinksScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      list:[],
      items:[],
      group:0,
      groupList:[],
    }
    this._getGroupList('2331');
    this._getGroupsList();
  }
  static navigationOptions = {
    title: 'Журнал',
    headerStyle: {
      backgroundColor: '#303F9F'
    },headerTitleStyle: {
      color:'#fff',
      fontSize: 24,
      fontWeight: 'bold',
    }
  };
  componentWillUpdate(){
    
  }
  componentDidUpdate(){
  }
  componentDidMount(){
    
  }
  componentWillUnmount(){
  }
  _getGroupList = async (group) => {
    let url = await AsyncStorage.getItem('url') + '/groups/list?index='+group;
    var groupList = [];
    await fetch(url)
      .then(res=>res.json())
      .then(res=> this.setState({groupList:JSON.parse(res[0].content)}))
      .catch(err=>console.warn('err'))
  }
  _getGroupsList = async () => {
    let id = await AsyncStorage.getItem('userId');
    let url = await AsyncStorage.getItem('url') + '/edu/groups';
    await fetch(url + '?id='+id)
    .then(res=>res.json())
    .then(res=>this.setState({list:res}))
    .catch(err=>console.warn('err'))

    days = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']
    list = []
    this.state.list.map(info => {
      for(var i = 0; i < list.length; i++){
        if(list[i].name==info.name && list[i].gNum==info.gNum) return
      }
      list.push(info) 
    })
    pickerItemsList = list.map((info, index) => {
        return (
        <Picker.Item key={index} label={info.name ? info.gNum + '. ' + info.name: days[info.day] + ' ' +info.number+' пара'} value={info.gNum} />
        ) 
      }
    );
    this.setState({items:pickerItemsList})
  };
   /**
   * Инициация каждого элемента списка
   */
  _renderItem = ({item, i}) => (
    <MyListItem
      key={i}
      item={item}
      id={this.state.groupList.indexOf(item)}
      onPressItem={this._onPressItem}
      onCheckItem={this._onCheckItem}
      setItemMark={this._setItemMark}
    />
  );
  render() {
    return (
      <View style={styles.container}>
        <View style={{height:50, flexDirection:"row", backgroundColor:'#3F51B5', borderBottomWidth:1,}}>
          <View style={{flex:0.3}}></View>
          <Picker
            selectedValue={this.state.group}
            style={{flex:1, height: 50, color:'white', textAlign:'center', fontSize:18, fontWeight:'400'}}
            prompt = 'Выбор предмета..'
            onValueChange={(itemValue, itemIndex) => {
              this.setState({group:itemValue})
              this._getGroupList(itemValue)
            }}>
            {this.state.items}
          </Picker>
          <View style={{flex:0.3}}></View>
        </View>
        <View style={{flex:1}}>
          { <FlatList
              data={this.state.groupList}
              extraData={this.state}
              keyExtractor={index => String(index)}
              renderItem={this._renderItem}
          />}
        </View>
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
});
