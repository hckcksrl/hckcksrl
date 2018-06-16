import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  WebView,
 } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Naver extends React.Component {

  state = {
    code : null
  };

  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.setState({
      code : `
        document.getElementById('identifierId').value = '${this.props.navigation.state.params.username}';
        document.getElementsByClassName('CwaK9')[0].click();
      `
    })
  }
  render(){
    const { code } = this.state;
    return(
      <View style={styles.container}>
        <WebView  javaScriptEnabled={true}
                              injectedJavaScript={code}
                              source={{uri: 'https://accounts.google.com/'}}
                              style={{marginTop: 20 , height : 1000}}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  }
});
