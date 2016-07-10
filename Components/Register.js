/**
 * 注册组件
 * @author liao_yf
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
}
from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../CommonComponents/Colors';
import Platform from 'Platform';
import HBService from '../NetworkService/HBService'

const ICON_SIZE = 20;
const USER_REGISTER_PATH = HBService.apiPath() + '/web/user/register';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginId: '',
      repasswd: '',
      passwd: '',
      tel: '',
      realName: '',
      email: '',
      loginErr: '',
      passwdErr: '',
      repasswdErr: '',
      telErr: '',
      emailErr: '',
    }
  }

  render() {
    let flag = this.state.loginId !== '' &&
      this.state.repasswd !== '' &&
      this.state.passwd !== '' &&
      this.state.tel !== '' &&
      this.state.realName !== '' &&
      this.state.email !== '';
    let ConfirmBotton = flag === true ?
      <TouchableHighlight
        style={styles.confirm}
        onPress={this.submitRegister.bind(this)}
        underlayColor={Colors.backGray}
      >
        <Text style={styles.registerText}>
          注册
        </Text>
      </TouchableHighlight> :
      <TouchableHighlight
        onPress={this.submit}
        style={[styles.confirm,{backgroundColor:Colors.backGray}]}
        underlayColor={Colors.backGray}
      >
        <Text style={styles.registerText}>
          注册
        </Text>
      </TouchableHighlight>
      /**
       * 是否展示注册时转转转的图标
       */
      /*let loginProgress;
		if (this.state.logining){
			registerProgress=<ProgressBarAndroid
        style={styles.indicator}
        styleAttr="Small"
      />;
		}*/
    return (
      <View style={{backgroundColor: 'white',marginTop:44}}>
        <View style={styles.down}>
          <Text style={styles.nameAndPwd}>
            用户名<Text style={{fontSize:12}}>(大于3个字符)</Text>
            <Text style={{fontSize:12,color:Colors.red}}>{this.state.loginErr}</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onLoginIdChange.bind(this)}
            defaultValue={this.state.loginId}
          />
          <Text style={styles.nameAndPwd}>
            密码<Text style={{fontSize:12}}>(大于6位)</Text>
            <Text style={{fontSize:12,color:Colors.red}}>{this.state.passwdErr}</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onPasswdChange.bind(this)}
            defaultValue={this.state.passwd}
          />
          <Text style={styles.nameAndPwd}>
            再次输入密码<Text style={{fontSize:12,color:Colors.red}}>{this.state.repasswdErr}</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onRePasswdChange.bind(this)}
            defaultValue={this.state.repasswd}
          />
          <Text style={styles.nameAndPwd}>
            真实姓名
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onRealNameChange.bind(this)}
            defaultValue={this.state.realName}
          />
          <Text style={styles.nameAndPwd}>
            邮箱<Text style={{fontSize:12,color:Colors.red}}>{this.state.emailErr}</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onEmailChange.bind(this)}
            defaultValue={this.state.email}
          />
          <Text style={styles.nameAndPwd}>
            手机号<Text style={{fontSize:12,color:Colors.red}}>{this.state.telErr}</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onTelChange.bind(this)}
            defaultValue={this.state.tel}
          />
          {ConfirmBotton}
        </View>
      </View>
    )
  }

  onLoginIdChange(text) {
    if (text.length >= 3) {
      this.setState({
        loginErr: '',
        loginId: text,
      });
    } else {
      this.setState({
        loginErr: '（！用户名长度有误）',
        loginId: '',
      });
    }
  }
  onPasswdChange(text) {
    if (text.length >= 6) {
      this.setState({
        passwdErr: '',
        passwd: text,
      });
    } else {
      this.setState({
        passwdErr: '（！密码长度有误）',
        passwd: '',
      });
    }
  }
  onRePasswdChange(text) {
    if (text === this.state.passwd) {
      this.setState({
        repasswdErr: '',
        repasswd: text,
      });
    } else {
      this.setState({
        repasswdErr: '（!密码不一致）',
        repasswd: '',
      });
    }
  }
  onEmailChange(text) {
    let emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (emailReg.test(text)) {
      this.setState({
        emailErr: '',
        email: text,
      });
    } else {
      this.setState({
        emailErr: '（！邮箱输入有误）',
        email: '',
      });
    }
  }
  onTelChange(text) {
    let telReg = /^1\d{10}$/;
    if (telReg.test(text)) {
      this.setState({
        telErr: '',
        tel: text,
      });
    } else {
      this.setState({
        telErr: '（！手机输入有误）',
        tel: '',
      });
    }
  }
  onRealNameChange(text) {
    this.setState({
      realName: text,
    });
  }
  submitRegister() {
    console.log(this.state);
    return (
      fetch(USER_REGISTER_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          "loginId": this.state.loginId,
          "passwd": this.state.passwd,
          "email": this.state.email,
          "tel": this.state.tel,
          "realName": this.state.realName
        })
      })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        if (json.code == 0) {
          HBService.login(this.state.loginId, this.state.passwd)
            .then(() => {
              this.props.navigator && this.props.navigator.popToTop();
            })
        }
      })
      .catch(err => {
        console.error('RegisterFail is：' + err);
      })
    )
  }
}

const styles = StyleSheet.create({
  registerText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
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