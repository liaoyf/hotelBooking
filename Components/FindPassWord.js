/**
 * 找回密码组件
 * （这里做账户名和设定的邮箱判断，如果正确新设置的密码才能生效）
 * （点击确定后路由到新的页面成功或者提示安全邮箱不正确）
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
  Alert,
}
from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../CommonComponents/Colors';
import HBService from '../NetworkService/HBService'

const FINDPASSWORD_PATH = HBService.apiPath() + '/web/user/findPassword';

export default class FindPassWord extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pwd: '',
      repwd: '',
      email: '',
      passwdErr: '',
      repasswdErr: '',
    }
  }
  render() {
    let flag = this.state.username !== '' &&
      this.state.pwd !== '' &&
      this.state.repwd !== '' &&
      this.state.email !== '';
    let findPasswordBtn = flag === true ?
      <TouchableHighlight
        style={styles.confirm}
        onPress={this.findPassword.bind(this)}
        underlayColor={Colors.backGray}
        >
        <Text style={styles.confirmText}>
          确定
        </Text>
      </TouchableHighlight> :
      <TouchableHighlight
        style={[styles.confirm,{backgroundColor:Colors.backGray}]}
        onPress={this.find}
        underlayColor={Colors.backGray}
        >
        <Text style={styles.confirmText}>
          确定
        </Text>
      </TouchableHighlight>


    return (
      <View style={{backgroundColor: 'white',marginTop:44}}>
          <View style={styles.down}>
            <Text style={styles.nameAndPwd}>
              用户名
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onUsernameChange.bind(this)}
              defaultValue={this.state.username}
            />
            <Text style={styles.nameAndPwd}>
              安全邮箱
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onEmailChange.bind(this)}
              defaultValue={this.state.email}
            />
            <Text style={styles.nameAndPwd}>
              重新设置密码<Text style={{fontSize:12}}>(大于6位)</Text>
              <Text style={{fontSize:12,color:Colors.red}}>{this.state.passwdErr}</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onPwdChange.bind(this)}
              defaultValue={this.state.pwd}
            />
            <Text style={styles.nameAndPwd}>
              再次输入密码<Text style={{fontSize:12,color:Colors.red}}>{this.state.repasswdErr}</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onRepwdChange.bind(this)}
              defaultValue={this.state.repwd}
            />
            {findPasswordBtn}
          </View>
      </View>
    )
  }
  onUsernameChange(text) {
    this.setState({
      username: text,
    });
  }
  onEmailChange(text) {
    this.setState({
      email: text,
    });
  }
  onPwdChange(text) {
    if (text.length >= 6) {
      this.setState({
        passwdErr: '',
        pwd: text,
      });
    } else {
      this.setState({
        passwdErr: '（！密码长度有误）',
        pwd: '',
      });
    }
  }
  onRepwdChange(text) {
    if (text === this.state.pwd) {
      this.setState({
        repasswdErr: '',
        repwd: text,
      });
    } else {
      this.setState({
        repasswdErr: '（!密码不一致）',
        repwd: '',
      });
    }
  }
  findPassword() {
    console.log(this.state);
    return (
      fetch(FINDPASSWORD_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          "username": this.state.username,
          "email": this.state.email,
          "pwd": this.state.pwd,
          "repwd": this.state.repwd,
        })
      })
      .then((response) => {
        console.log(response);
        if (response.ok === false) {
          Alert.alert('提示', '用户名不存在！', [{
            text: '确定'
          }]);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
          if(json.code===0){
            Alert.alert('提示', '恭喜你！修改成功！', [{
              text: '确定',onPress:()=>this.props.navigator.pop()
            }]);
          }else{
            Alert.alert('提示', '邮箱错误！', [{
              text: '确定'
            }]);
          }
      })
      .catch(err => {
        console.log('RegisterFail is：' + err);
      })
    )
  }
}

const styles = StyleSheet.create({
  confirmText: {
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