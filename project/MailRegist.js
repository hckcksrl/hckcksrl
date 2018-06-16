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


export default class Register extends Component{

  constructor(props){
    super(props);
    this.state = {
      id : '',
      site: '' ,
      site_id : '',
      password : ''
    };
  }
  render() {
     // document.frmNIDLogin.submit();`;
    return (
      <View style={styles.container}>
          <View style={styles.login}>
            <Text style={styles.main}>Register</Text>
            <View style={styles.log}>
              <TextInput placeholder='site' backgroundColor="white"
                style={styles.input} value={this.state.site}
                onChangeText = { (site) => this.setState({site})}>

              </TextInput>
              <TextInput placeholder='site_id' backgroundColor="white"
                style={styles.input} value={this.state.site_id}
                onChangeText = { (site_id) => this.setState({site_id})}>
              </TextInput>
              <TextInput placeholder='password' backgroundColor="white"
                style={styles.pass} value={this.state.password}
                onChangeText = { (password) => this.setState({password})}>
              </TextInput>

            </View>
            <View style={styles.click}>
              <TouchableOpacity onPress={this.register} style={styles.button}>
                <Text>Register</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
    );
  }

  register = () => {
    fetch('http://127.0.0.1:3000/auth/mail',{
      method : 'POST',
      headers:{
        Accept : 'application/json',
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
        id : this.props.navigation.state.params.site.username,
        site : this.state.site,
        site_id : this.state.site_id,
        password : this.state.password,
      })
    })
    .then((response) => response.json())
    .then((res) =>{
      if(res.success === true){
        var username = res.id;
        var password = res.pw;
        var site = res.site;
        var sites = [];
        console.log('a');
        console.log(site);
        for(var k = 0 ; k < site.length ; k ++){
          sites.push(site[k].site);
        }
        this.props.navigation.navigate('Mail' ,
        { username : username , password : password , site : site })
      }else{
        alert(res.message);
        this.setState({
          id : '',
          site : '',
          site_id: '',
          password : ''
        })
      }

    })
    .done();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    flexDirection : 'row',
  },
  login:{
    justifyContent : 'center',
    marginTop : 200,
    width : 200,
    height : 240,
    alignItems : 'center',
    borderWidth : 1,
    borderRadius:10
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
    borderRadius:10
  },
  button:{
    width : 200,
    height : 30,
    alignItems : 'center',
    backgroundColor: '#999999',
    justifyContent:'center',
    borderWidth : 1,
    borderRadius:10
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
