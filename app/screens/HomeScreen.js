import React from 'react';
import {
  AsyncStorage,
  DatePickerAndroid,
  DatePickerIOS,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MyListItem from '../components/GroupListItem'
import LoadingIndicator from '../components/LoadingIndicator'
import {Icon} from 'react-native-elements';


export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      language:'',
      day:-1,
      date:this._currentDate(),
      selectedDate:undefined,
      group:'',
      groupList:[],
    };
    this._getGroupList('2331');
  }
  
  static navigationOptions = {
    title: 'Header',
    headerStyle: {
      backgroundColor: '#303F9F'
    },headerTitleStyle: {
      color:'#fff',
      fontSize: 24,
      fontWeight: 'bold',
    }
  };
  /**
   * Преобразование даты в удобовримую строку
   */
  _currentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    if(month<10) return date+'.0'+month+'.'+year;
    else return date+'.'+month+'.'+year;
  }
  /**
   * Передается в окно выбора групп
   */
  returnData(group) {
    this.setState({group: group[0]});
    if(group[1]) console.warn(group[1])
    if(group[1]) this.setState({groupList:group[1].content})
    else this._getGroupList(group[0]);
  }
  componentDidMount() {
    this.setState({day:(new Date().getDay())})
  }
  /**
   * Загрузка списка группы
   */
  _getGroupList = async (group) => {
    let url = await AsyncStorage.getItem('url') + '/groups/list?index='+group;
    await fetch(url)
      .then(res=>res.json())
      .then(res=>this.setState({groupList:JSON.parse(res[0].content)}))
      .catch(err=>console.warn('err'))
  }
  /**
   * Метод для выбора даты(вызывает датапикер)
   */
  _chooseData = async() =>{
    if(Platform.OS === 'ios'){
      <View style={styles.container}>
        <DatePickerIOS
          date={new Date(this.state.date.split('.')[2],(this.state.date.split('.')[1]-1),this.state.date.split('.')[0])}
          onDateChange={this.setDate}
        />
      </View>
    }else{
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date(this.state.date.split('.')[2],(this.state.date.split('.')[1]-1),this.state.date.split('.')[0])
        });
        if (action == DatePickerAndroid.dateSetAction){
          this.setState({selectedDate:new Date(year, month, day).toDateString()})
          this.setState({day:new Date(year, month, day).getDay()})
          if(month<9) this.setState({date:day+'.0'+(month+1)+'.'+year})
          else this.setState({date:day+'.'+(month+1)+'.'+year})
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
    }
  }
  /**
   * Сохранение данных на сервере
   */
  _sendData = async () => {
    this.loading.start();
    let subjId = await AsyncStorage.getItem('subjId');
    let groupNumber = await AsyncStorage.getItem('groupNumber');
    let url = await AsyncStorage.getItem('url') + '/lessons/update';
    await fetch(url, {
      method:'POST', 
      body:JSON.stringify({
        data:{
          group:groupNumber, 
          subjId:subjId, 
          date:(
            this.state.selectedDate?new Date(this.state.selectedDate).toDateString():new Date().toDateString()), 
          content:this.state.groupList}})})
    .then(res=>this.loading.stop())
  }
  /*
    Обработчик нажатия на ФИО
  */
  _onPressItem = (index) => {
    this.setState((state)=>{
      state.groupList[Number(index)].checked = !state.groupList[Number(index)].checked;
    });
  };
  /**
   * Обработчик нажатия на иконку присутствия
   */
  _onCheckItem = (index) => {
    this.setState((state)=>{
      state.groupList[Number(index)].checked = !state.groupList[Number(index)].checked;
    });
  };
  /**
   * Сеттер оценки в ГСОН
   */
  _setItemMark = (index, mark) => {
    this.setState((state)=>{
      state.groupList[Number(index)].mark = Number(mark);
      if(!state.groupList[Number(index)].checked)
       state.groupList[Number(index)].checked = true
    });
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
    const {navigate} = this.props.navigation;
    let pickerParams = {returnData:this.returnData.bind(this), day:this.state.day, date:this.state.selectedDate?new Date(this.state.selectedDate).toDateString():new Date().toDateString()};
    const groupChooseIcon = <Icon size={30} underlayColor='#C5CAE9' name='torsos-all' type='foundation'/>;
    const groupNumber = <Text style={{fontSize:16}} >{this.state.group}</Text>
    return (
      <View style={styles.container}>
        <LoadingIndicator onRef={(loading)=>this.loading = loading} />
        <StatusBar backgroundColor="#3a3F9F" barStyle="light-content" />
        {/*Строки изменения даты*/}
        <TouchableOpacity style={styles.datePickerView} onPress={async () => {this._chooseData()}}>
            <View style={{flex:1}}>
            </View>
            <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:18, fontWeight:'500', color:'#FFFFFF'}} >
                {this.state.date}
              </Text>
            </View>
            <TouchableOpacity style={{flexDirection:'row',flex:1,paddingRight:15,justifyContent:'flex-end'}} onPress={async () => {this._chooseData()}}>
              <Icon size={30} underlayColor='#6C665677' color='#FFFFFF' name='calendar-edit' type='material-community'/>
            </TouchableOpacity>
        </TouchableOpacity>
        {/*Choose the group number...*/}
        <View style={{flex:1, backgroundColor:'#C5CAE9'}}>
          <TouchableOpacity style={{flexDirection:'row', marginTop:5, borderBottomRadius:3}} onPress={()=>{navigate('Picker', pickerParams)}}>
            <View style={{}}>
              <Text style={{padding:15, fontSize:18, fontWeight:'400', color:'#212121'}}>
                Choose the group number:
              </Text>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              {this.state.group?groupNumber:groupChooseIcon}
            </View>
          </TouchableOpacity>
          {/* Список  */}
          <View style={{flex:1}}>
            { <FlatList
                data={this.state.groupList}
                extraData={this.state}
                keyExtractor={index => String(index)}
                renderItem={this._renderItem}
            />}
          </View>
        </View>
        {/* Кнопка "Сохранить" */}
        <TouchableOpacity style={[styles.saveButton,{opacity:100}]} onPress={this._sendData}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5CAE9',
  },
  saveButtonText:{textAlign:'center', fontSize:18, fontWeight:'400', color:'#000'},
  saveButton:{backgroundColor:'#fff',justifyContent:'center', height:40, borderColor:'#3F51B5', borderWidth:1, borderRadius:10, margin:7},
  datePickerView:{backgroundColor:'#3F51B5',flexDirection:'row',borderBottomWidth:1, justifyContent:'space-between', paddingVertical:10},

});
/*
BCKG -   FFD663
topClr - C59200
tabClr - 6C6656
C59200
9B7200
 */