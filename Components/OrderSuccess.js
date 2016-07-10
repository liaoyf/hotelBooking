/**
 * 预订成功界面
 * @author liaoyf
 */
'use strict';

import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
}
from 'react-native';

import Colors from '../CommonComponents/Colors';

export default class OrderSuccess extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
			return (
				<View style={styles.container}>
        <View style={styles.topTextView}>
        	<Text style={styles.topText}>恭喜你预订成功！</Text>
        </View>
        <TouchableHighlight
        	style={styles.confirm}
          onPress={()=>this.toMyOrder()}
          underlayColor='#f3f3f2'>
         	<Text style={styles.confirmText}>完成</Text>
        </TouchableHighlight>
      </View>
			)
		}
		/**
		 * 重置路由栈，跳转到我的订单页面，点击返回返回到首页
		 * 不知道返回我的订单时数据是否能更新上，如果数据不能及时刷新
		 * 去掉这个功能，直接返回到首页
		 */
	toMyOrder() {
		let routeStack = [{
			id: 'RootIndex'
		}, {
			id: 'myOrder'
		}];
		this.props.navigator.immediatelyResetRouteStack(routeStack);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 44,
	},
	topTextView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 200,
	},
	topText: {
		fontSize: 22,
	},
	confirm: {
		flex: 1,
		backgroundColor: Colors.pageBule,
		borderWidth: 1,
		width: 100,
		height: 50,
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 10,
		borderRadius: 4,
		borderColor: Colors.borderColor,
	},
	confirmText: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
	},
})