import React from 'react';
import {
  FlatList, 
  Modal, 
  StyleSheet, 
  TouchableHighlight, 
  TouchableOpacity,
  TouchableWithoutFeedback, 
  Text, 
  View 
} from 'react-native';
import {CheckBox} from 'react-native-elements';

import Icon from 'react-native-vector-icons/dist/FontAwesome5';

export default class MyListItem extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  componentWillReceiveProps(nextProps){
  }
  componentDidUpdate(){
  }
  render() {
    if(this.props.id == 0) {var header}
    return (
      <View style={styles.listItem}>
        {/* Number of item */}
        <View style={styles.itemNumberView}>
          <Text style={{fontSize:14}}>
            {this.props.id+1<10?'0'+(this.props.id+1):this.props.id+1}
          </Text>
        </View>
        {/* Name-Surname */}
        <TouchableOpacity style={{flexDirection:'row', flex:1}}>
          <View style={{justifyContent:'center', marginLeft:10}}>
            <Text style={{fontSize:15}}>{this.props.item.name + ' ' + this.props.item.surname}</Text>
          </View>
        </TouchableOpacity>
        {/*  Mark field  */}
        <View style={styles.markViewStyle}>
          
        </View>
        {/* Checker */}
        <View style={{justifyContent:'center', alignItems:'flex-end'}}>
          
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listItem:{
    flex:1, 
    flexDirection:'row',
    backgroundColor:'#fff',
    height:35,
    margin:2,
    borderRadius:3,
  },
  pickerDialog:{
    flex:1,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  markViewStyle:{
    width:60,
    borderLeftWidth:1, 
    borderRightWidth:1, 
    paddingHorizontal:3, 
    borderColor:'#C5CAE9',
  },
  markTextStyle:{
    alignSelf:'center',
    fontSize:25, 
    width:40, 
    height:40, 
    textAlign:'center', 
    borderWidth:1, 
    borderRadius:45, 
    marginTop:2
  },
  itemNumberView:{
    justifyContent:'center',
    borderRightColor:'#C5CAE9', 
    borderRightWidth:1, 
    paddingHorizontal:5
  },

});