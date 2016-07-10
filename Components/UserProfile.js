/**
 * 用户资料通用CELL
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
}
from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../CommonComponents/Colors';
import HBService from '../NetworkService/HBService';

const ICON_SIZE = 30;

export default class UserProfile extends Component {
  static defaultProps = {
    onPress: React.PropTypes.func,
    iconName: React.PropTypes.string,
    iconColor: React.PropTypes.string,
    settingName: React.PropTypes.string,
    defaultInfo: React.PropTypes.string,
  };

  static propTypes = {
    titlename: React.PropTypes.string,
  };

  render() {
    return (
      <TouchableHighlight
        underlayColor={Colors.lightGray}
        style={styles.userTouch}
        onPress={this.props.onPress}>
        <View style={styles.user}>
          <Icon
            name={this.props.iconName}
            size={ICON_SIZE}
            style={styles.arrow}
            color={this.props.iconColor}/>
          <View style={styles.nameInfo}>
            <Text style={styles.name}>
              {this.props.settingName}
            </Text>
          </View>
          <Text style={styles.defaultInfo}>
            {this.props.defaultInfo}
          </Text>
          <Icon
            name='ios-arrow-right'
            size={20}
            iconStyle={styles.arrow}
            color={Colors.textGray}/>
        </View>
      </TouchableHighlight>
    );
  }
}
var styles = StyleSheet.create({
  userTouch: {
    marginTop: 20,
  },
  user: {
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EDECF1',
  },
  nameInfo: {
    flexDirection: 'column',
    marginLeft: 0,
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
    marginRight: 10,
  },
  defaultInfo: {
    marginRight: 5,
    color: Colors.pageBule,
  },
});