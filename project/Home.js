import React ,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Navigator,
  WebView,
 } from 'react-native';
 import Expo, { Constants } from 'expo';


export default class Home extends Component{

  constructor(props){
    super(props);
    this.state = {username: '' , password : '', site : '' ,id : '' , pw : ''};
  }
  render() {
    const {isloaded,username,password} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.login}>
          <Text style={styles.main}>Login And Logout</Text>
          <View style={styles.log}>
            <TextInput placeholder='username' backgroundColor="white"
              style={styles.input} value={this.state.username}
              onChangeText = { (username) => this.setState({username})}>

            </TextInput>
            <TextInput placeholder='password' backgroundColor="white"
              style={styles.pass} value={this.state.password}
              onChangeText = { (password) => this.setState({password})}>

            </TextInput>
          </View>
          <View style={styles.click}>
            <TouchableOpacity onPress={this.login} style={styles.button}>
              <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.register} style={styles.register}>
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  register = () => {
    this.props.navigation.navigate('Register')
  }

  login = () => {
    fetch('http://127.0.0.1:3000/auth/login',{
      method : 'POST',
      headers:{
        Accept : 'application/json',
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
        username : this.state.username,
        password : this.state.password
      })
    })
    .then((response) => response.json())
    .then((res) =>{
      if(res.success === true){
        var username = res.id;
        var password = res.pw;
        var site = res.site;
        var sites = [];
        for(var k = 0 ; k < site.length ; k ++){
          sites.push(site[k].site);
        }
        console.log(sites);

        // this.props.navigation.navigate('Finger' , { username : username , password : password , site : site})
        this.setState({
          id : username,
          pw : password,
          site : site
        })
        this.scanFingerprint();
      }else{
        alert(res.message);
        this.setState({
          username : '',
          password : '',
          site : '',
        })
      }

    })
    .done();
  }
  scanFingerprint = async () => {
     let result = await Expo.Fingerprint.authenticateAsync('Scan your finger.');
     console.log('Scan Result:', result)
     if (result.success == true){
       this.props.navigation.navigate('Mail',
       {username : this.state.id,
        password : this.state.pw,
        site : this.state.site,
       })
     }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection : 'row',
    backgroundColor: '#eeeeee',
  },
  login:{
    justifyContent : 'center',
    marginTop : 200,
    width : 200,
    height : 180,
    alignItems : 'center',
    borderWidth : 1,
    borderRadius: 10,
    borderBottomColor : 'white'
  },
  main:{
    textAlign : 'center',
    margin : 10,
    fontSize : 20
  },
  input:{
    textAlign : 'center',
    marginTop : 10,
    marginBottom : 10,
    width : 150,
    height : 30,
    borderWidth : 1,
    borderRadius:10
  },
  pass:{
    textAlign : 'center',
    marginTop : 10,
    width : 150,
    height : 30,
    borderWidth : 1,
    borderRadius: 10,
  },
  button:{
    width : 100,
    height : 30,
    alignItems : 'center',
    backgroundColor: '#999999',
    justifyContent:'center',
    borderWidth : 1,
  },
  log:{
    backgroundColor : '#AAAAAA',
    flex : 1,
    width : 200,
    alignItems : 'center',
    opacity :0.5,
    borderWidth : 1,
  },
  register:{
    width : 100,
    height : 30,
    alignItems : 'center',
    backgroundColor: '#999999',
    justifyContent:'center',
    borderWidth : 1,
  },
  click:{
    flexDirection:'row',
  }

});
