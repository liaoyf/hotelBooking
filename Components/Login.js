/**
 * 登录组件
 * @author liaoyf
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  ProgressBarAndroid,
  Alert,
}
from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../CommonComponents/Colors';
import Platform from 'Platform';
import HBService from '../NetworkService/HBService';

const ICON_SIZE = 20;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: HBService.currentUser().username,
      password: HBService.currentUser().password,
      //logining: false,
    };
  }
  componentWillMount() {
    this.props.route.pressRegister = this.pressRegister.bind(this)
  }
  render() {
    // /**
    //  * 是否展示登录时转转转的图标
    //  */
    // let loginProgress;
    // if (this.state.logining) {
    //   loginProgress = <ProgressBarAndroid
    //     style={styles.indicator}
    //     styleAttr="Small"
    //   />;
    // }
    return (
      <View style={{backgroundColor: 'white',marginTop:44}}>
        <View style={styles.down}>
          <Text style={styles.nameAndPwd}>
            用户名
          </Text>
          <TextInput
            style={styles.textInput}
            returnKeyType={'next'}
            onChangeText={this.onNameChange.bind(this)}
            defaultValue={this.state.username}
          />
          <Text style={styles.nameAndPwd}>
            密码
          </Text>
          <TextInput
            style={styles.textInput}
            returnKeyType={'done'}
            //onSubmitEditing={this.submitLogin.bind(this)}
            onChangeText={this.onPwdChange.bind(this)}
            secureTextEntry={true}
            defaultValue={this.state.password}
          />
          <TouchableHighlight
            style={styles.confirm}
            onPress={this.submitLogin.bind(this)}
            underlayColor={Colors.backGray}
            >
            <Text style={styles.loginText}>
              登录
            </Text>
          </TouchableHighlight>
        </View>
      	<TouchableHighlight
          onPress={this.findPassWord.bind(this)}
          >
          <Text style={styles.findPassWord}>
            忘记密码
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
  pressRegister() {
    this.props.navigator.push({
      id: 'register',
      title: '注册',
    });
  }
  findPassWord() {
    this.props.navigator.push({
      id: 'findPassWord',
      title: '找回密码',
    });
  }
  onNameChange(text) {
    this.setState({
      username: text,
    });
  }
  onPwdChange(text) {
    this.setState({
      password: text,
    });
  }
  submitLogin() {
    //if (this.state.logining) return;
    if (this.state.username.length == 0 || this.state.password == 0) {
      Alert.alert('提示', '账号或密码不能为空!', [{
        text: '确定'
      }]);
      return;
    }
    // this.setState({
    //   logining:true,
    // })
    console.log(this.state);
    HBService.login(this.state.username, this.state.password)
      .then((res) => {
        console.log(res);
        if (res) {
          Alert.alert('提示', res.message, [{
            text: '确定'
          }]);
          return;
        } else {
          this.props.navigator && this.props.navigator.pop();
        }
      })
      .catch(err => {
        console.log('login err', err);
      })
      /*    .done(()=>{
            this.setState({
              logining:false,
            })
          })*/
  }
}

const styles = StyleSheet.create({
  findPassWord: {
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 20,
    color: Colors.pageBule,
  },
  loginText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  down: {
    margin: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nameAndPwd: {
    fontSize: 16,
    color: 'black',
  },
  textInput: {
    fontSize: 15,
    borderWidth: 1,
    height: 30,
    alignSelf: 'stretch',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 4,
    padding: 3,
    borderColor: Colors.borderColor,
  },
  confirm: {
    flexDirection: 'column',
    backgroundColor: Colors.pageBule,
    borderWidth: 1,
    height: 35,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 10,
    borderRadius: 4,
    borderColor: Colors.borderColor,
  },
});