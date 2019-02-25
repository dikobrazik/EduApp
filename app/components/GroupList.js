import React from 'react';
import {StyleSheet, TouchableOpacity, TextInput, Text, View } from 'react-native';
import {CheckBox} from 'react-native-elements';
//import { TextInput } from 'react-native-gesture-handler';

export default class MyListItem extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      check:false,
      mark:'',
    }
  }
  _onChange = () => {
    this.setState({check:!this.state.check});
    this.props.onCheckItem(this.props.id)
  };
  _setMark = () => {
    if(this.state.mark){
      this.props.setItemMark(this.props.id, this.state.mark)
      this.setState({check:true})
    }
  }
  render() {
    return (
      <View style={styles.listItem}>
        <View style={{justifyContent:'center',borderRightColor:'#C5CAE9', borderRightWidth:1, paddingHorizontal:5}}>
          <Text style={{fontSize:16}}>{this.props.id+1<10?'0'+(this.props.id+1):this.props.id+1}</Text>
        </View>
        <TouchableOpacity style={{flexDirection:'row', flex:2}} onPress={this._onChange}>
          <View style={{justifyContent:'center', marginLeft:15}}>
            <Text style={{fontSize:18}}>{this.props.title}</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={{borderWidth: 1}}
          onChangeText={(text) => this.setState({mark:text})}
          value={this.state.mark}
          keyboardType='number-pad'
          onEndEditing={this._setMark}
         />
        <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
          <CheckBox
            iconType='font-awesome'
            uncheckedIcon='user-times'
            checkedIcon='user'
            style={{backgroundColor:'#f00'}}
            checked={this.state.check}
            onPress={this._onChange} />
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
    height:45,
    margin:2,
    borderRadius:3,
  }
});