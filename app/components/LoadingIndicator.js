import React from 'react';
import {
    ActivityIndicator,
    Modal,
    View,
} from 'react-native';


export default class LoadingIndicator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      animate:false,
      displayed:false,
    }
  }
  componentDidMount(){
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  start = () => {
    this.setState({animate:true, displayed:true})
  }

  stop = () => {
    this.setState({animate:false, displayed:false})
  }
  render(){
    return(
      <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.displayed}
          onRequestClose={() => {
            this.setState({ displayed: false });
      }}>
        <View style={{flex:1, flexDirection:'column' ,justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.4)'}}>
          <ActivityIndicator animating={this.state.animate} size="large" color="#0000ff" />
        </View>
      </Modal>
    )
  }
}