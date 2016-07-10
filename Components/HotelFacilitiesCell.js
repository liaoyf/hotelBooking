/**
 * 酒店设施cell
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
import Colors from '../CommonComponents/Colors'
import Platform from 'Platform';

const ICON_SIZE = 20;
const ARROW_SIZE = 25;

export default class HotelFacilitiesCell extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={Colors.lightGray}
        style={styles.userTouch}
        onPress={this.props.onPress}>
        <View style={styles.user}>
          <Icon
            name={'wifi'}
            size={ICON_SIZE}
            style={styles.arrow}
            color={Colors.textGray}/>
          <Icon
            name={'monitor'}
            size={ICON_SIZE}
            style={styles.arrow}
            color={Colors.textGray}/>
          <Icon
            name={'coffee'}
            size={ICON_SIZE}
            style={styles.arrow}
            color={Colors.textGray}/>
          <View style={styles.nameInfo}>
            <Text style={styles.name}>
              详情
            </Text>
            <Icon
            name='ios-arrow-right'
            size={ICON_SIZE}
            iconStyle={styles.arrow}
            color={Colors.textGray}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  userTouch: {
    marginTop: 2,
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
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'flex-end',
    flex: 1,
  },
  name: {
    color: Colors.pageBule,
    fontSize: 14,
    marginRight: 10,
  },
  arrow: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 20,
  },
});