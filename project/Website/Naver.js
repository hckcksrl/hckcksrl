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
        document.getElementById('id').value = '${this.props.navigation.state.params.username}';
        document.getElementById('pw').value = '${this.props.navigation.state.params.password}';
        document.getElementsByClassName('btn_global')[0].click();
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
                              source={{uri: 'https://nid.naver.com/nidlogin.login?svctype=262144&url=http://m.naver.com/aside/'}}
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
