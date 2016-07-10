/**
 * 酒店详情页
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
	Linking,
	ListView,
	DatePickerAndroid,
	Navigator,
}
from 'react-native';

import HBService from '../NetworkService/HBService'
import HotelSwiperImg from './HotelSwiperImg'
import HotelLocationCell from './HotelLocationCell'
import HotelFacilitiesCell from './HotelFacilitiesCell'
import HotelRoomCell from './HotelRoomCell'
import HotelPoliciesCell from './HotelPoliciesCell'
import DateCell from './DateCell'
import HotelFacilities from '../Components/HotelFacilities'
import ActionSheet from 'react-native-actionsheet'



const ROOM_LIST_PATH = HBService.apiPath() + '/web/roomType/roomTypeList';
const buttons = ['取消', '10086'];
const CANCEL_INDEX = 0;
const PHONE_INDEX = 1;
const today = new Date();
/**
 * 这样获取当前时间的零点时间好傻.......
 */
today.setHours(0);
today.setMinutes(0)
today.setSeconds(0)
today.setMilliseconds(0);


const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
//默认只能预订两个月以内的
const afterDate = new Date();
afterDate.setMonth(today.getMonth() + 2);
export default class HotelDetail extends Component {
	componentDidMount() {
		this._getRoom();
	}
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			indate: today,
			outdate: tomorrow,
		};
	}
	_getRoom() {
		fetch(ROOM_LIST_PATH + '?hotelId=' + this.props.data.hotelId)
			.then((response) => {
				console.log(response);
				return response.json()
			})
			.then((json) => {
				this.setState({
					dataSource: this._getDataSource(json.data.rows)
				});
			})
			.catch(err=>console.log(err));
	}
	_getDataSource(room) {
		return this.state.dataSource.cloneWithRows(room);
	}
	render() {
		console.log(this.props.data);
		return (
			<ScrollView 
			style={styles.container}
			keyboardDismissMode ={'on-drag'}
			showsVerticalScrollIndicator ={false}>
			<HotelSwiperImg hotelName={this.props.data.name}/>
			<HotelLocationCell 
				onPhonePress={this.onPhonePress.bind(this)} 
				data={this.props.data.address}/>

			<HotelFacilitiesCell onPress={()=>{this.facilitiesPress()}}/>
			<View>
				<DateCell 
					onIndatePress={this.inDatePickerPress.bind(this)} 
					onOutDatePress={this.outDatePickerPress.bind(this)}
					indate={this.state.indate} 
					outdate={this.state.outdate}/>
				<ListView
				  dataSource={this.state.dataSource}
				  renderRow={this.renderRoomListRow.bind(this)} />
			</View>
			<HotelPoliciesCell onPress={()=>this.policiesPress()}/>
			<ActionSheet 
        ref={(o) => this.ActionSheet = o}
        title="酒店电话"
        options={buttons}
        cancelButtonIndex={CANCEL_INDEX}
        onPress={(PHONE_INDEX)=>this._handlePress(PHONE_INDEX)}
    	/>
		</ScrollView>
		)
	}
		/*
			datePickerPress(){
				this.props.navigator.push({
		  		id:'calendarModel',
		  		title:'选择日期',
		  	})
			}*/
	inDatePickerPress() {
		DatePickerAndroid.open({
				date: today,
				minDate: today,
				maxDate: afterDate,
			})
		.then((result) => {
			console.log(result);
			if (result.action === 'dateSetAction') {
				const indate = new Date(result.year, result.month, result.day);
				//这里一定要把indate的后一天放在if里面，再根据设置的indate自动变化outdate
				const out = new Date(result.year, result.month, result.day + 1);
				this.setState({
					indate: indate,
					outdate: out
				});
				console.log(this.state.indate);
			} else if (result.action === 'dismissedAction') {
				this.props.onCancel ? this.props.onCancel() : null;
			}
		})
	}
	outDatePickerPress() {
		//默认打开的日期是当前日期的后一天
		let out = this.state.indate;
		out = new Date(out.getFullYear(), out.getMonth(), out.getDate() + 1);
		DatePickerAndroid.open({
			date: out,
			minDate: out,
			maxDate: afterDate,
		})
		.then((result) => {
			if (result.action === DatePickerAndroid.dateSetAction) {
				console.log(result);
				const outdate = new Date(result.year, result.month, result.day);
				this.setState({
					outdate: outdate
				});
				console.log(this.state.outdate);
			} else if (result.action === DatePickerAndroid.dismissedAction) {
				this.props.onCancel ? this.props.onCancel() : null;
			}
		})
	}
	facilitiesPress() {
		this.props.navigator.push({
			id: 'hotelFacilities',
			title: '酒店设施',
			data: this.props.data,
		})
	}
	policiesPress() {
		this.props.navigator.push({
			id: 'hotelPolicies',
			title: '酒店政策',
			data: this.props.data,
		})
	}
	orderPress(roomData) {
		const isLogined = HBService.isLogined();
		console.log(isLogined);
		if (!isLogined) {
			this.props.navigator.push({
				id: 'login',
				sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
				title: '登录',
			});
		} else {
			this.props.navigator.push({
				id: 'orderConfirm',
				title: '提交订单',
				data: Object.assign(this.props.data, this.state),
				selectRoom: roomData,
			})
		}
	}
	onPhonePress() {
		this.ActionSheet.show();
	}
	_handlePress(index) {
		if (index > 0) {
			let url = 'tel:' + buttons[index];
			Linking.openURL(url);
		}
	}
	renderRoomListRow(roomData) {
		return (
			<HotelRoomCell 
				room={roomData} 
				onPress={()=>this.orderPress(roomData)}/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 44,
	}
})