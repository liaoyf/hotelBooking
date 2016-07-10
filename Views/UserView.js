/**
 * 我的页面,也就是用户界面
 * @author liao_yf
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Image,
  Navigator,
  Alert,
}
from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../CommonComponents/Colors';
import Platform from 'Platform';
import CommonCell from '../CommonComponents/CommonCell';
import HBService from '../NetworkService/HBService'

const ICON_SIZE = 20;


export default class UserView extends Component {

  /**
   * 用户界面的登录模块
   * 点击后跳转至登录组件
   */
  pressLogin() {
    const isLogined = HBService.isLogined();
    //isLogined=GHService.isLogined();
    //考虑要不要把登录状态作为一个state 写在外面。
    if (!isLogined) {
      this.props.navigator.push({
        id: 'login',
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        title: '登录',
      });
    } else {
      this.props.navigator.push({
        id: 'user',
        title: '个人资料',
      });
    }
  }
  pressMyOrder() {
    const isLogined = HBService.isLogined();
    if (isLogined) {
      this.props.navigator.push({
        id: 'myOrder',
        title: '我的订单',
      });
    } else {
      this.props.navigator.push({
        id: 'login',
        title: '登录',
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      });
    }
  }
  render() {
    const isLogined = HBService.isLogined();
    console.log(isLogined);
    const stateText = isLogined ? '已登录' : '点击登录';
    const stateColor = isLogined ? Colors.pageBule : 'orange';
    const logoutColor = isLogined ? Colors.red : 'orange';
    const pictureRequire = isLogined ? require('./manlogin.jpg') : require('./manunlogin.jpg');

    return (
      <ScrollView
        style={styles.container}
        automaticallyAdjustContentInsets={false}
        contentInset={{top: 64, left: 0, bottom: 49, right: 0}}
        contentOffset={{x:0, y:-64}}
        >
        <TouchableHighlight
          underlayColor={Colors.lightGray}
          style={styles.userTouch}
          onPress={this.pressLogin.bind(this)}>
          <View style={styles.user}>
           	<Image
              source={pictureRequire}
              style={styles.avatar}/>
            <View style={styles.nameInfo}>
              <Text style={styles.name}>
                {HBService.currentUser().username}
              </Text>
            </View>
            <Text
              style={[styles.loginState, {color: stateColor}]}
              >
              {stateText}
            </Text>
            <Icon
              name='ios-arrow-right'
              size={ICON_SIZE}
              iconStyle={styles.arrow}
              color={Colors.textGray}/>
            </View>
        </TouchableHighlight>
        <CommonCell
          iconName={'ios-paper'}
          iconColor={Colors.Bule}
          cellName={'我的订单'}
          onPress={this.pressMyOrder.bind(this)}
          />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EFF5',
    flex: 1,
    marginTop: 5,
  },
  userTouch: {
    marginTop: 44,
  },
  user: {
    padding: 8,
    paddingLeft: 10,
    paddingRight: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EDECF1',
  },
  avatar: {
    backgroundColor: '#D3D3D3',
    borderRadius: 2,
    width: 70,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  nameInfo: {
    flexDirection: 'column',
    marginLeft: 8,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    color: 'black',
    fontSize: 17,
  },
  arrow: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 20
  },

  loginState: {
    marginRight: 5,
  }
});