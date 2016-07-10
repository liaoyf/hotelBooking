/**
 * 订单确认页
 * @author liaoyf
 */
'use strict';

import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	TextInput,
	Picker,
	Alert,
}
from 'react-native';

import Colors from '../CommonComponents/Colors';
import Dimensions from 'Dimensions';
import HBService from '../NetworkService/HBService'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ORDER_SUBMIT_PATH = HBService.apiPath() + '/web/order/submit';

export default class OrderConfirm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomNumber: 1,
			userName: HBService.currentUser().data.realName,
			userTel: HBService.currentUser().data.tel,
			totalPrice: this.props.selectRoom.price,
		}
	}

	render() {
		console.log(this.props.data);
		let selectRoom = this.props.selectRoom;
		let dayNum = parseInt((this.props.data.outdate.getTime() - this.props.data.indate.getTime()) / (24 * 60 * 60 * 1000));
		return (
			<View style={styles.container}>
				<View style={styles.topView}>
					<Text style={styles.inInfo}>酒店名称：{this.props.data.name}</Text>
					<Text style={styles.inInfo}>入住时间：{this.props.data.indate.toLocaleDateString()}</Text>
					<Text style={styles.inInfo}>离店时间：{this.props.data.outdate.toLocaleDateString()}</Text>
					<Text style={styles.inInfo}>入住天数：{dayNum}</Text>
					<Text style={styles.inInfo}>房间类型：{selectRoom.typeName}</Text>
					<Text style={styles.inInfo}>房间单价：￥{selectRoom.price}</Text>
				</View>
				<View style={styles.midView}>
					<View style={{flexDirection: 'row'}}>	
						<Text style={styles.inInfo}>选择房间数:</Text>				
						<Picker
						  selectedValue={this.state.roomNumber}
						  style={{width:90}}//这里要设置picker的宽度，不然不显示。
						  onValueChange={(lang) => this.setState({roomNumber: lang,totalPrice:lang*selectRoom.price*dayNum})}>
						  <Picker.Item label="1" value= {1} />
						  <Picker.Item label="2" value= {2} />
						  <Picker.Item label="3" value= {3} />
						</Picker>
					</View>

					<View style={styles.inputView}><Text style={styles.inInfo}>入住人</Text>
					<TextInput 
						onChangeText={this.onNameChange.bind(this)}
            defaultValue={this.state.userName}
					/>
					</View>
					<View style={styles.inputView}><Text style={styles.inInfo}>联系电话</Text>
					<TextInput 
						onChangeText={this.onTelChange.bind(this)}
            defaultValue={this.state.userTel}
					/>
					</View>
				</View>
				<View style={styles.bottomView}>
					<View style={styles.totalPrice}>
						<Text style={styles.totalPriceText}>总价：￥{this.state.totalPrice}</Text>
					</View>
	        <TouchableHighlight
	        	onPress={()=>this.orderConfirmPress()}
		  			underlayColor={'#f3f3f2'}
		  			style={styles.btnOrder}>
	        	<Text style={styles.orderText}>提交订单</Text>
	        </TouchableHighlight>
				</View>
      </View>
		)
	}

	onNameChange(text) {
		this.setState({
			userName: text,
		});
	}
	onTelChange(text) {
		this.setState({
			userTel: text,
		});
	}
	orderConfirmPress() {
		console.log(this.state);
		console.log(this.props);
		return (
			fetch(ORDER_SUBMIT_PATH, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify({
					"roomTypeId": this.props.selectRoom.roomTypeId+'',
					"num": this.state.roomNumber+'',
					"price": this.state.totalPrice+'',
					"userName": this.state.userName,
					"userTel": this.state.userTel,
					"checkIn": this.props.data.indate,
					"checkOut": this.props.data.indate,
				})
			})
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((json) => {
				console.log(json);
				if (json.code == 0) {
					this.props.navigator.push({
						id: 'orderSuccess',
						title: '订单详情',
						data: json,
					});
				}
				if (json.code == 1) {
					Alert.alert('提示', json.message, [{
			            text: '确定',onPress:()=>this.props.navigator.pop()
			        }]);
				}
			})
			.catch(err => {
				console.error('orderFail is：' + err);
			})
		)
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 44,
	},
	inInfo: {
		fontSize: 18,
		color: 'black',
		padding: 5,
	},
	midView: {
		marginTop: 5,
		flexDirection: 'column',
		//alignItems: 'center',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#EDECF1',
	},
	inputView: {
		// flexDirection: 'row',
		// borderBottomWidth: 1,
		// borderColor: '#EDECF1',
	},
	bottomView: {
		position: 'absolute',
		bottom: 0, //View贴底
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		borderTopWidth: 1,
		borderColor: '#EDECF1',
	},
	totalPrice: {
		height: 50,
		width: SCREEN_WIDTH / 2,
		borderRightWidth: 1,
		borderColor: '#EDECF1',
		justifyContent: 'center',
		paddingLeft: 10,
	},
	totalPriceText: {
		fontSize: 18,
		color: 'black',
	},
	btnOrder: {
		width: SCREEN_WIDTH / 2,
		height: 40,
		alignItems: 'center',
		borderRadius: 8,
		justifyContent: 'center',
		backgroundColor: Colors.orange,
		shadowColor: 'black',
	},
	orderText: {
		fontSize: 16,
		color: 'white',
	}
})