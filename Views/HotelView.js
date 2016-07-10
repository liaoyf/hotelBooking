/**
 * 酒店主页
 * (包括搜索框和搜索结果（符合条件的酒店列表）)
 * 默认筛选位置条件"西安"的酒店、按离市中心的远近排序
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
  ScrollView,
}
from 'react-native';
import SearchBar from '../Components/SearchBar'
import HotelList from '../Components/HotelList'

export default class HotelView extends Component {

  render() {
    return (
      <ScrollView style={{marginTop:44}}>
        <SearchBar/>
				<HotelList navigator={this.props.navigator} data={this.props.data}/>
      </ScrollView>
    )
  }
}