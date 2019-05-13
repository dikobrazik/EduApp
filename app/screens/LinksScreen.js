import React from 'react';
import {AsyncStorage, Animated, Button,FlatList, ScrollView, StyleSheet,Picker, Text, View } from 'react-native';
import {Avatar, Icon, ListItem, CheckBox } from 'react-native-elements';
import { Table, TableWrapper, Row } from 'react-native-table-component';

export default class LinksScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      list:[],
      items:[],
      group:5433,
      groupList:[],
      lessons:[],
      tableHead: ['#', 'Студент',],
      widthArr: [30, 160, ],
    }
    this._getGroupList('5433');
    this._getGroupsList();
    this._getLessonsList();
    
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
  _getLessonsList = async () => {
    let id = await AsyncStorage.getItem('userId');
    let url = await AsyncStorage.getItem('url') + '/lessons';
    await fetch(url + '?userId='+id)
      .then(res=>res.json())
      .then(res=>this.setState({lessons:res}))
  }
  render() {
    const state = this.state;
    const tableData = [];
    if(state.lessons.length != 0) {
      var subjs = state.list.map(val=>{
        if(val.gNum == state.group){
          return val.id
        }
      })

      for (let i = 0; i < state.groupList.length; i += 1) {
        const rowData = [];
        for (let j = 0; j < 2 + state.lessons.length; j += 1) {
          if(j==0) rowData.push(i+1<10?'0'+(i+1):i+1)
          if(j==1) rowData.push(state.groupList[i].name + ' ' + state.groupList[i].surname)
          if(j>1) {
            if(subjs.indexOf(state.lessons[j-2].subjId) != -1){
              if(state.lessons[j-2].content[i].mark) rowData.push(state.lessons[j-2].content[i].mark)
              else if(state.lessons[j-2].content[i].checked) rowData.push("+")
              else rowData.push('-')
            } 
          }
          if(i==0  && state.lessons[j-2]) {
            state.tableHead.push(state.lessons[j-2].date)
            state.widthArr.push(50)
          }
        }
        tableData.push(rowData);
      }
    }
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
              this.setState({
                list:[],
                items:[],
                lessons:[],
                tableHead: ['#', 'Студент',],
                widthArr: [30, 160, ],
              })
            }}>
            {this.state.items}
          </Picker>
          <View style={{flex:0.3}}></View>
        </View>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
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
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});
