/**
 * @author liaoyf
 * 登录状态下的用户个人资料界面
 */
'use strict';

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Navigator,
}
from 'react-native';
import HBService from '../NetworkService/HBService'
import UserProfile from './UserProfile'
import Colors from '../CommonComponents/Colors';

export default class User extends Component {

  render() {
    const currentUser = HBService.currentUser().data;
    return (
      <ScrollView
        style={[styles.container, {marginTop: 50}]}
        automaticallyAdjustContentInsets={false}
        contentInset={{top: 64, left: 0, bottom: 49, right: 0}}
        contentOffset={{x:0, y:-64}}
       >
       	<UserProfile
          iconName={'ios-person'}
          iconColor={Colors.green}
          settingName={'用户姓名'}
          onPress={()=>{this.edit('realName',currentUser.realName)}}
          defaultInfo={currentUser.realName}
        />
        <UserProfile
          iconName={'ios-telephone'}
          iconColor={Colors.green}
          settingName={'用户电话'}
          onPress={()=>{this.edit('tel',currentUser.tel)}}
          defaultInfo={currentUser.tel}
        />
        <UserProfile
          iconName={'ios-email'}
          iconColor={Colors.green}
          settingName={'电子邮箱'}
          onPress={()=>{this.edit('email',currentUser.email)}}
          defaultInfo={currentUser.email}
        />
        <UserProfile
          iconName={'ios-locked'}
          iconColor={Colors.green}
          settingName={'用户密码'}
          onPress={()=>{this.edit('passwd','')}}
          defaultInfo={'修改'}
        />
				<TouchableOpacity
				  style={styles.logout}
					onPress={()=>this.logout()}>
					<Text style={styles.logoutText}>退出登录</Text>
				</TouchableOpacity>
			</ScrollView>
    )
  }
  logout() {
    HBService.logout()
      .then(() => {
        this.props.navigator && this.props.navigator.pop();
      })
  }
  edit(title, value) {
    this.props.navigator.push({
      id: 'commonUserProfile',
      title: '编辑信息',
      data: {
        currentUser: HBService.currentUser().data,
        editTitle: title,
        editValue: value,
      },
    });
  }
}
var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EFF5',
    flex: 1,
  },
  logout: {
    height: 44,
    borderRadius: 3,
    margin: 10,
    marginTop: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  }
});