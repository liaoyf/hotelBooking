/**
 * 我的订单的订单Cell
 * @author liaoyf
 */
'use strict'

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
}
from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../CommonComponents/Colors'
import HBService from '../NetworkService/HBService'

const ICON_SIZE = 20;
const ROOM_DETIAL_PATH = HBService.apiPath() + '/web/roomType/roomDetial';
const HOTEL_INFO_PATH = HBService.apiPath() + '/web/hotel/hotelInfo';
export default class OrderCell extends Component {

  componentDidMount() {
    this._searchInfo()
  }

  constructor(props) {
    super(props);
    this.state = {
      hotelId:0,
      typeName:'',
      hotelName:'',
      pictureUrl:'a',
    }
  }
  _searchInfo(){
    let roomTypeId=this.props.data.roomTypeId;
    fetch(ROOM_DETIAL_PATH+'?roomTypeId='+roomTypeId)
    .then((response)=>{
      console.log(response);
      return response.json()
    })
    .then((json)=>{
      console.log(json);
      this.setState({
        typeName:json.data.typeName,
        hotelId:json.data.hotelId,
      })
    })
    .then(()=>{
      fetch(HOTEL_INFO_PATH+'?hotelId='+this.state.hotelId)
      .then((response)=>{
        console.log(response);
        return response.json()
      })
      .then((json)=>{
        console.log(json);
        this.setState({
          hotelName:json.data.name,
          pictureUrl:json.data.pictureUrl,
        })
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
					<Image
		        source={{uri:this.state.pictureUrl}}
		        style={styles.cellImage}
	        />
	        <View>
	        	<Text style={styles.hotelTitle}>{this.state.hotelName}</Text>
	        	<Text style={styles.room}>{this.state.typeName}{this.props.price}</Text>
	        	<Text style={styles.orderSate}>已确认</Text>
	        </View>
	        <View style={styles.nameInfo}>
            <Text style={styles.name}>
              订单详情
            </Text>
            <Icon
            name='ios-arrow-right'
            size={ICON_SIZE}
            iconStyle={styles.arrow}
            color={Colors.textGray}/>
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
  container: {
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
  hotelTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    marginTop: 5,
    color: 'black',
  },
  room: {
    fontSize: 16,
    marginTop: 15,
    color: Colors.pageBule,
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
  orderSate: {
    fontSize: 14,
    marginTop: 10,
  },
  arrow: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 20,
  },
})