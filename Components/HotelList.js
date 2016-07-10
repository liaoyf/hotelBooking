/**
 * 酒店列表组件
 * (包括酒店Cell)
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
  TouchableHighlight,
  ListView,
}
from 'react-native';

import HotelCell from './HotelCell'
import mockDate from '../NetworkService/mockDate'
import HBService from '../NetworkService/HBService'

const HOTEL_LIST_PATH = HBService.apiPath() + '/web/hotel/hotelList';
export default class HotelList extends Component {

  // static defaultProps = {
  //   hotelInfo:mockDate,
  //  };
  componentDidMount() {
    this._searchHotel();
  }
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }
  _searchHotel() {
    fetch(HOTEL_LIST_PATH)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      this.setState({
        dataSource: this._getDataSource(json.data.rows)
      });
    })
  }
  _getDataSource(hotel) {
    return this.state.dataSource.cloneWithRows(hotel);
  }
  render() {
    return (
      <ListView
       enableEmptySections = {true}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderListViewRow.bind(this)}/>
    )
  }

  renderListViewRow(data) {
    return (
      <TouchableHighlight 
		 		underlayColor={'#f3f3f2'}
      	onPress={()=>this.selectRow(data)}>
      	<View><HotelCell data={data}/></View>
      </TouchableHighlight>
    )
  }

  selectRow(data) {
    console.log(data);
    this.props.navigator.push({
      id: 'hotelDetail',
      title: '酒店详情',
      data: data,
    })
  }
}

const styles = StyleSheet.create({
  container: {},
});