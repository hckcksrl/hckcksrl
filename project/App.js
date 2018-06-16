import React ,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
 } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';


import Home from './Home';
import Register from './Register';
import Mail from './Mail';
import MailRegist from './MailRegist';
import Daum from './Website/Daum';
import Nate from './Website/Nate';
import Facebook from './Website/Facebook'
import Google from './Website/Google'
import Naver from './Website/Naver';
import Touch from './touch';
import Finger from './Finger'
export default class App extends React.Component {
  render(){
    return(
      <Navigation />
    );
  }
}

const Navigation= StackNavigator({
  Home : {screen : Home},
  Finger : {screen : Finger},
  Touch : {screen : Touch},
  Naver : {screen : Naver},
  Register : {screen : Register},
  Mail : {screen : Mail},
  MailRegist : {screen : MailRegist},
  Daum : {screen : Daum},
  Nate : {screen : Nate},
  Facebook : {screen : Facebook},
  Google : {screen : Google},

})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  linearGradient: {
  flex: 1,
  paddingLeft: 15,
  paddingRight: 15,
  borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

});
