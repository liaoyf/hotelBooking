/**
 * 用户界面——我的订单模块CELL
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

import Colors from '../CommonComponents/Colors';
import Platform from 'Platform';

const ICON_SIZE = 25;

export default class HotelRoomCell extends Component {
  static defaultProps = {
    roomName: 'HotelRoomCell',
    roomPrice: '118',
  };

  static propTypes = {
    onPress: React.PropTypes.func,
    // roomName: React.PropTypes.string,
    // price:React.propTypes.string,
  };
  render() {
    console.log(this.props.room);
    return (
      <View style={styles.container}>
          <View style={styles.nameInfo}>
            <Text style={styles.name}>
              {this.props.room.typeName}
            </Text>
          </View>
          <View style={styles.nameInfo}>
            <Text style={styles.price}>
              ￥{this.props.room.price}
            </Text>
          </View>
          <TouchableHighlight
            underlayColor={Colors.lightGray}
            style={styles.orderTouch}
            onPress={this.props.onPress}>
            <Text style={styles.orderText}>预订</Text>
          </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#EDECF1',
    height: 50,
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
  price: {
    color: Colors.pageBule,
    fontSize: 17,
  },
  orderTouch: {
    height: 30,
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.orange,
    shadowColor: 'black',
  },
  orderText: {
    fontSize: 16,
    color: 'white',
  }
});