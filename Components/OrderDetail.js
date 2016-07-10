/**
 * 订单详情页
 * @author liaoyf
 */
'use strict';

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
}
from 'react-native';

import CommonText from '../CommonComponents/CommonText';
import HotelCell from './HotelCell';

export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
				{/*<HotelCell />*/}
				<View style={styles.orderInfo}>
					<View style={styles.titleView}>
						<Text style={styles.titleText}>订单详情</Text>
        	</View>
        	<CommonText 
        		titlename={'入住时间'}
        		contentsInfo={'2016-04-01'}
        	/>
        	<CommonText 
        		titlename={'离开时间'}
        		contentsInfo={'2016-04-02'}
        	/>
        	<CommonText 
        		titlename={'房间类型'}
        		contentsInfo={'单人间'}
        	/>
        	<CommonText 
        		titlename={'房间数量'}
        		contentsInfo={'1'}
        	/>
        	<CommonText 
        		titlename={'合计价格'}
        		contentsInfo={'￥118'}
        	/>
				</View>
        <View style={styles.orderInfo}>
        	<View style={styles.titleView}>
						<Text style={styles.titleText}>订单信息</Text>
        	</View>
        	<CommonText 
        		titlename={'订单号码'}
        		contentsInfo={'3898979799'}
        	/>
        	<CommonText 
        		titlename={'订单时间'}
        		contentsInfo={'2016-03-15'}
        	/>
        	<CommonText 
        		titlename={'订单状态'}
        		contentsInfo={'已确认'}
        	/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 44,
  },
  orderInfo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EDECF1',
  },
  titleView: {
    padding: 10,
  },
  titleText: {
    color: 'black',
    fontSize: 16,
  }
})