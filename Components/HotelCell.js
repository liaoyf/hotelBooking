/**
 * 酒店列表页的单个酒店Cell
 * @author liao_yf
 */
'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
}
from 'react-native';

import Colors from '../CommonComponents/Colors'

export default class HotelCell extends Component {

  render() {
    let pictureUrl = this.props.data.pictureUrl;
    console.log(this.props.data);
    return (
      <View style={styles.row}>
			  <Image
          source={{uri:pictureUrl}}
	        style={styles.cellImage}
        />
        <View>
        	<Text style={styles.hotelTitle}>{this.props.data.name}</Text>
        	<Text style={styles.price}>￥{this.props.data.minPrice}起</Text>
        	<Text style={styles.distance}>距市中心{this.props.data.distance}公里</Text>
        </View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  cellImage: {
    backgroundColor: '#dddddd',
    height: 95,
    marginRight: 20,
    width: 100,
  },
  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  hotelTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    marginTop: 5,
    color: 'black',
  },
  price: {
    fontSize: 16,
    marginTop: 15,
    color: Colors.pageBule,
  },
  distance: {
    fontSize: 14,
    marginTop: 10,
  },
})