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
        document.getElementById('uid').value = '${this.props.navigation.state.params.username}';
        document.getElementById('upw').value = '${this.props.navigation.state.params.password}';
        document.getElementsByClassName('btn_login')[0].click();
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
                              source={{uri: 'http://xo.nate.com/Notfound.sk?redirect=http%3A%2F%2Fwww.nate.com%2F&cpurl=www_ndr.nate.com%252Flogin%252F&viewnid=&flag=Y&e_url=http%3A%2F%2Fwww.nate.com%2F&mode='}}
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
