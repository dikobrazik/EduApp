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

class PickerDialog extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      displayed: false,
      marks:[
        {key:1, icon:'', label:'-', value:undefined},
        {key:1, icon:'frown', label:'2', value:2},
        {key:1, icon:'meh', label:'3', value:3},
        {key:1, icon:'smile', label:'4', value:4},
        {key:1, icon:'grin', label:'5', value:5},
      ],
    }
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
    this.hide();
  }
  getInitialState() {
    return { displayed: true };
  }
  show() {
    this.setState({ displayed: true });
  }
  hide() {
    this.setState({ displayed: false });
  }
  onPress = (item) =>{
    this.props.onPress(item)
    this.hide()
  }
  render() {
    if (this.state.displayed) {

      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.displayed}
          onRequestClose={() => {
            this.setState({ displayed: false });
          }}>
          <TouchableWithoutFeedback onPress={()=>this.hide()}>
            <View style={this.props.style}>
            <View style={{width:250, height:300, backgroundColor:'#fff'}}>
              <FlatList
                data={this.state.marks}
                renderItem={({item}) => {
                  let icon;
                  if(item.icon) icon = <Icon size={40} name={item.icon}/>
                  return(
                  <TouchableHighlight 
                    style={dialogStyles.touchableHighlightStyle} 
                    onPress={()=>{this.onPress(item)}} 
                    underlayColor='#eee'
                  >
                    <View style={{flex:1, flexDirection:'row'}}>
                      <Text style={{alignSelf:'center',fontSize:18}}>{item.label}</Text>
                      <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                        {icon}
                      </View>
                    </View>
                  </TouchableHighlight>
                )}}
              />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      );
    } else {
      return null;
    }
  }
};
const dialogStyles = StyleSheet.create({
  touchableHighlightStyle:{
    height:50, 
    paddingHorizontal:10, 
    borderBottomWidth:1, 
    borderBottomColor:'#eef'
  },
  
});
export default class MyListItem extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      check:false,
      mark:undefined,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      check:nextProps.item.checked?nextProps.item.checked:false,
      mark:nextProps.item.mark?nextProps.item.mark:undefined,
    })
  }
  componentDidUpdate(){
    // if(this.props.item.checked) this.setState({check:this.props.item.checked})
    // else this.setState({check:false})
    // if(this.props.item.mark) this.setState({mark:this.props.item.mark})
    // else this.setState({mark:undefined})
  }
  _onChange = () => {
    this.setState({check:!this.state.check});
    this.props.onCheckItem(this.props.id);
  };
  _setMark = (value) => {
    if(value){
      this.props.setItemMark(this.props.id, value)
      this.props.onCheckItem(this.props.id)
      this.setState({check:true})
    }
  }
  _onPressDialog = (item) =>{
    this.setState({mark:item.label})
    this._setMark(item.value)
  }
  render() {
    let markSelectDialogButton =
    <TouchableHighlight 
      style={{justifyContent:'center', padding:5, margin:0}} 
      onPress={()=>{this.dialog.show()}} 
      underlayColor='#ddd'
    >
      <Icon size={36} name='star' />
    </TouchableHighlight>
    let mark = 
    <TouchableHighlight onPress={()=>{this.dialog.show()}}>
      <Text style={styles.markTextStyle}>{this.state.mark}</Text>
    </TouchableHighlight>
    return (
      <View style={styles.listItem}>
        {/* Number of item */}
        <View style={styles.itemNumberView}>
          <Text style={{fontSize:16}}>
            {this.props.id+1<10?'0'+(this.props.id+1):this.props.id+1}
          </Text>
        </View>
        {/* Name-Surname */}
        <TouchableOpacity style={{flexDirection:'row', flex:2}} onPress={this._onChange}>
          <View style={{justifyContent:'center', marginLeft:15}}>
            <Text style={{fontSize:18}}>{this.props.item.name + ' ' + this.props.item.surname}</Text>
          </View>
        </TouchableOpacity>
        {/*  Mark field  */}
        <View style={styles.markViewStyle}>
          <PickerDialog 
            style={styles.pickerDialog} 
            onRef={ref => (this.dialog = ref)} 
            onPress={this._onPressDialog} 
          />
          {this.state.mark&&(this.state.mark!='-')?mark:markSelectDialogButton}
        </View>
        {/* Checker */}
        <View style={{justifyContent:'center', alignItems:'flex-end'}}>
          <CheckBox
            iconType='material-community'
            uncheckedIcon='account-remove'
            checkedIcon='account-check'
            size={30}
            style={{backgroundColor:'#f00'}}
            checked={this.state.check}
            onPress={()=>this._onChange()} />
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