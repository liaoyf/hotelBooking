/**
 * 修改密码成功页面(弃用，现已用弹窗)
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

export default class FindPwdSuccess extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		console.log(this.props.route.data);
		return (
			<View style={styles.container}>
        <View style={styles.topTextView}>
        	<Text style={styles.topText}>恭喜你修改成功！</Text>
        </View>
        <TouchableHighlight
        	style={styles.confirm}
          onPress={()=>this.toLogin()}
          underlayColor='#f3f3f2'>
         	<Text style={styles.confirmText}>返回登录</Text>
        </TouchableHighlight>
      </View>
		)
	}

	toLogin() {
		let routeStack = [{
			id: 'RootIndex'
		}, {
			id: 'login'
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