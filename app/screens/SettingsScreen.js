import React from 'react';
import {
    AsyncStorage,
    Button,
    View,
    StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';

class SettingsScreen extends React.Component {
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

  render() {
    return(
        <View style={styles.container}>
            <Button title="Exit!" color='#FFBC55' onPress={this._signOutAsync} />
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
        backgroundColor: '#FFD663',
    }
});
export default withNavigation(SettingsScreen);