/**
 * 找回密码组件
 * （这里做账户名和设定的邮箱判断，如果正确新设置的密码才能生效）
 * （点击确定后弹框设置成功或者提示安全邮箱不正确）
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
  AsyncStorage,
}
from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../CommonComponents/Colors';
import HBService from '../NetworkService/HBService'

const UPDATE_USERINFO_PATH = HBService.apiPath() + '/web/user/updateUserInfo';
const HB_USER_KEY = 'HB_USER_KEY';

export default class CommonUserProfile extends Component {
  /*
    static defaultProps = {
      realName:this.props.route.data.currentUser.realName,
      tel:this.props.route.data.currentUser.tel,
      email:this.props.route.data.currentUser.email,
      passwd:this.props.route.data.currentUser.passwd,
    };*/

  constructor(props) {
    super(props);
    this.state = {
      editValue: this.props.route.data.editValue
    }
  }
  componentWillMount() {
    this.props.route.pressSave = this.onPressSave.bind(this);
  }
  render() {
    console.log(this.state);
    return (
      <View style={{backgroundColor: 'white',marginTop:44}}>
          <View style={styles.down}>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onChange.bind(this)}
              defaultValue={this.state.editValue}
            />
          </View>
      </View>
    )
  }
  onChange(text) {
    this.setState({
      editValue: text,
    });
  }
  onPressSave() {
    let editInfo = this.props.route.data.currentUser;
    switch (this.props.route.data.editTitle) {
      case 'realName':
        editInfo.realName = this.state.editValue;
        break;
      case 'tel':
        editInfo.tel = this.state.editValue;
        break;
      case 'email':
        editInfo.email = this.state.editValue;
        break;
      case 'passwd':
        editInfo.passwd = this.state.editValue;
        break;
    }
    console.log(this.state);
    return (
      fetch(UPDATE_USERINFO_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          "realName": editInfo.realName,
          "tel": editInfo.tel,
          "email": editInfo.email,
          "passwd": editInfo.passwd,
        })
      })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        if (json.code == 0) {
          console.log(HBService.currentUser());
          /*
          这里要重新设置AsyncStorage的数据，不然还保留着之前的缓存，修改的数据不进行更新
           */
          AsyncStorage.setItem(
            HB_USER_KEY,
            JSON.stringify(HBService.currentUser())
          );
          console.log(AsyncStorage.getItem(HB_USER_KEY));
          this.props.navigator && this.props.navigator.pop();
        }
      })
      .catch(err => {
        console.error('EditFail is：' + err);
      })
    )
  }
}

const styles = StyleSheet.create({
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
  }
});