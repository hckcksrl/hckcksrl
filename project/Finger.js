import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import Expo, { Constants } from 'expo';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '' ,
      password : '',
      site : '',
      compatible: false,
      fingerprints: false,
      result: '',
    };
  }



  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForFingerprints();
  }

  checkDeviceForHardware = async () => {
    let compatible = await Expo.Fingerprint.hasHardwareAsync();
    this.setState({compatible})
  }

  checkForFingerprints = async () => {
    let fingerprints = await Expo.Fingerprint.isEnrolledAsync();
    this.setState({fingerprints})

  }

  scanFingerprint = async () => {
     let result = await Expo.Fingerprint.authenticateAsync('Scan your finger.');
     console.log('Scan Result:', result)
     if (result.success == true){
       console.log(this.props.navigation.state.params.username);
       this.props.navigation.navigate('Mail',
       {username : this.props.navigation.state.params.username,
        password : this.props.navigation.state.params.password,
        site : this.props.navigation.state.params.site,
       })
     }
  }



  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.scanFingerprint} style={styles.button}>
          <Text style={styles.buttonText}>
            지문
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 60,
    backgroundColor: '#056ecf',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 30,
    color: '#fff'
  }
});
