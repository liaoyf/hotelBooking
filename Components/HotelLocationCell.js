/**
 * 酒店详情页酒店定位组件
 * （未完成版，不能定位）
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
}
from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../CommonComponents/Colors'

export default class HotelLocationCell extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.locationView}>
					<Icon
						name={'ios-location-outline'}
						size={30}
						style={styles.icon}
						color={Colors.pageBule}/>
					<Text style={styles.locationText}>{this.props.data}</Text>
				</View>
				<TouchableOpacity onPress={this.props.onPhonePress}>
				<View style={styles.phoneView}>
					<Icon
					name={'ios-telephone-outline'}
					size={30}
					style={styles.icon}
					color={Colors.pageBule}/>
				</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		marginTop: 10,
		flex: 1,
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: Colors.borderColor,
		alignItems: 'center',
		height: 50,
	},
	locationView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	locationText: {
		fontSize: 14
	},
	icon: {
		marginLeft: 10,
		marginRight: 10,
	},
	phoneView: {
		flex: 1,
		borderLeftWidth: 1,
		borderLeftColor: Colors.borderColor,
		alignItems: 'center',

	}
})