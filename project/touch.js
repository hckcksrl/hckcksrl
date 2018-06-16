'use strict';
import React, { Component } from 'react';
import {
  AlertIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules
} from 'react-native';

var TouchID = require('react-native-touch-id').default

export default class App extends Component<{}> {
  constructor() {
    super()

    this.state = {
      biometryType: null
    };
  }

  componentDidMount() {
    TouchID.isSupported()
    .then(biometryType => {
      this.setState({ biometryType });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          지문인식
        </Text>
        <TouchableHighlight
          style={styles.btn}
          onPress={this._clickHandler}
          underlayColor="#0380BE"
          activeOpacity={1}
        >
          <Text style={{
            color: '#fff',
            fontWeight: '600'
          }}>
            지문인식
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _clickHandler() {
    TouchID.isSupported()
      .then(authenticate => {
        console.log('TouchID supported');
      })
      .catch(error => {
        console.log(authenticate);
      });
  }
  authenticate() {
    return TouchID.authenticate()
      .then(success => {
        AlertIOS.alert('Authenticated Successfully');
      })
      .catch(error => {
        console.log(error)
        AlertIOS.alert(error.message);
      });
  }
  passcodeAuth() {
    return PasscodeAuth.isSupported()
      .then(() => {
        return PasscodeAuth.authenticate()
      })
      .then(success => {
        AlertIOS.alert('Authenticated Successfully');
      })
      .catch(error => {
        console.log(error)
        AlertIOS.alert(error.message);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    margin: 10,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  btn: {
    borderRadius: 3,
    marginTop: 200,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#0391D7'
  }
});


function authenticate() {
  return TouchID.authenticate()
    .then(success => {
      AlertIOS.alert('Authenticated Successfully');
    })
    .catch(error => {
      console.log(error)
      AlertIOS.alert(error.message);
    });
}

function passcodeAuth() {
  return PasscodeAuth.isSupported()
    .then(() => {
      return PasscodeAuth.authenticate()
    })
    .then(success => {
      AlertIOS.alert('Authenticated Successfully');
    })
    .catch(error => {
      console.log(error)
      AlertIOS.alert(error.message);
    });
}
