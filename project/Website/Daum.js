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
  componentDidMount(){
    this.setState({
      code : `
        document.getElementById('id').value = '${this.props.navigation.state.params.username}';
        document.getElementById('inputPwd').value = '${this.props.navigation.state.params.password}';
        document.getElementById('loginBtn').click();
      `
    })
  }
  render(){
    // let code = `
    //   document.getElementById('id').value = '${this.props.navigation.state.params.username}';
    //   document.getElementById('pw').value = '${this.props.navigation.state.params.password}';
    // `;
    const { code } = this.state;
    return(
      <View style={styles.container}>
        <WebView  javaScriptEnabled={true}
                              injectedJavaScript={code}
                              source={{uri: 'https://logins.daum.net/accounts/loginform.do?mobilefull=1&url=http%3A%2F%2Fm.daum.net%3Fnil_rc%3DKZXd2c'}}
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
