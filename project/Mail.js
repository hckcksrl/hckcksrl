import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ListView,
 } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Ionicons} from "@expo/vector-icons";

export default class Naver extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      site : '',
      id :'',
      pw : '',
    }

  }
  componentDidMount(){
    var site = this.props.navigation.state.params.site;
    var sites = [];
    if(typeof(site.length) != 'undefined'){
      for(var a = 0 ; a < site.length ; a ++){
        sites.push({
          key : site[a].site,
          id : site[a].site_id,
          pw : site[a].password,
        });

      }
      console.log(sites);
      this.setState({
        site : sites
      })
    }else{
      this.setState({
        site : null
      })
    }
  }
  render(){
    var { site } = this.state;
    return(
      <View style={styles.container}>
        <View style= {styles.box}>
          <TouchableOpacity onPress = {this.regist} style={styles.touch}>
            <Text>Email Regist</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.web}>
          <FlatList
              data = {site}
              renderItem={
                ({item}) =>
                <TouchableOpacity onPress = {() => this._site(item.key,item.id,item.pw)} style={styles.site}>
                  <Text>{item.key}</Text>
                  {/* <Ionicons onPress = {() => this._delete(item.key)} color="white" size={144} name={weatherCases['Clear'].icon}/> */}
                </TouchableOpacity>
              }>
          </FlatList>
        </View>
      </View>
    )
  }
  regist = () => {
    this.props.navigation.navigate('MailRegist', { site : this.props.navigation.state.params });
  }
  _site = (item,id,pw) => {


    if(item == 'Naver'){
      this.props.navigation.navigate('Naver' , { username : id , password : pw});
    }
    else if(item == 'Daum'){
      this.props.navigation.navigate('Daum', {username : id , password : pw});
    }
    else if(item == 'Nate'){
      this.props.navigation.navigate('Nate', {username : id, password : pw});
    }
    else if(item == 'Facebook'){
      this.props.navigation.navigate('Facebook', {username : id ,password : pw})
    }
    else if(item == 'Google'){
      this.props.navigation.navigate('Google', {username : id ,password : pw})
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  box :{
    alignItems :'flex-end',
  },
  touch : {
    width : 100,
    height : 30,
    alignItems : 'center',
    backgroundColor: '#AAAAAA',
    justifyContent:'center',
    borderWidth : 1,
    borderRadius : 10
  },
  web: {
    alignItems : 'center',
  },
  site :{
    margin : 10,
    width : 200,
    height : 30,
    alignItems : 'center',
    backgroundColor: '#AAAAAA',
    justifyContent:'center',
    borderWidth : 1,
    borderRightWidth : 1,
    borderRadius:10
  }
});
