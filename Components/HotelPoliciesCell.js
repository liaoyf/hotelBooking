/**
 * 酒店详情页 酒店政策CELL
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
import Platform from 'Platform';

const ICON_SIZE = 20;

export default class HotelPoliciesCell extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={Colors.lightGray}
        style={styles.userTouch}
        onPress={this.props.onPress}>
        <View style={styles.user}>
          <View style={styles.nameInfo}>
            <Text style={styles.title}>
              酒店政策
            </Text>
            <Text style={styles.contents}>
              入住时间：12点以后...
            </Text>
          </View>
          <Icon
            name='ios-arrow-right'
            size={ICON_SIZE}
            iconStyle={styles.arrow}
            color={Colors.textGray}/>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  userTouch: {
    marginTop: 10,
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
  title: {
    color: 'black',
    fontSize: 17,
    marginBottom: 10,
  },
  contents: {
    fontSize: 15,
  },
  arrow: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 20,
  },
});