/**
 * 用户界面——我的订单模块CELL
 * @author liao_yf
 */

'use strict';

import React, {Component} from 'react';
import{
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
import Colors from './Colors';
import Platform from 'Platform';

const ICON_SIZE = 25;

export default class CommonCell extends Component{
	 static defaultProps = {
    iconName: 'gear-a',
    iconColor: Colors.blue,
    cellName: 'CommonCell',
  };

  static propTypes = {
    onPress: React.PropTypes.func,
    iconName: React.PropTypes.string,
    iconColor: React.PropTypes.string,
    cellName: React.PropTypes.string,
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
              {this.props.cellName}
            </Text>
          </View>
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

const styles = StyleSheet.create({
  userTouch: {
    marginTop: 20,
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
  nameInfo: {
    flexDirection: 'column',
    marginLeft: 0,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    color: 'black',
    fontSize: 16,
  },
  arrow: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 20,
  },
});