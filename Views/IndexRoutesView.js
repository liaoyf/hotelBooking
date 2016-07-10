/**
 * 主页及整个项目的路由配置
 * (就是给每个组件或者页面加载顶部导航作用的)
 * @author liao_yf
 */
'use strict';

import React, {Component} from 'react';
import {
	Navigator,
	TouchableOpacity,
	StyleSheet,
	PixelRatio,
	Text,
	TextInput,
	View,
	BackAndroid,
}
from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
//import cssVar from 'cssVar';
import Colors from '../CommonComponents/Colors';
import Dimensions from 'Dimensions';
import Platform from 'Platform';
import TopNavigatorBarStyle from '../CommonComponents/TopNavigatorBarStyle';

import UserView from './UserView'
import RootIndex from './RootIndex'

import HBService from '../NetworkService/HBService'

import Login from '../Components/Login'
import User from '../Components/User'
import CommonUserProfile from '../Components/CommonUserProfile'
import MyOrder from '../Components/MyOrder'
import Register from '../Components/Register'
import FindPassWord from '../Components/FindPassWord'
import FindPwdSuccess from '../Components/FindPwdSuccess'
import FindPwdFail from '../Components/FindPwdFail'
import HotelDetail from '../Components/HotelDetail'
import CalendarModel from '../Components/CalendarModel'
import HotelFacilities from '../Components/HotelFacilities'
import HotelPolicies from '../Components/HotelPolicies'
import OrderConfirm from '../Components/OrderConfirm'
import OrderDetail from '../Components/OrderDetail'
import OrderSuccess from '../Components/OrderSuccess'
import OrderFail from '../Components/OrderFail'

const ScreenWidth = Dimensions.get('window').width;

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
	if (_navigator.getCurrentRoutes().length === 1) {
		return false;
	}
	_navigator.pop();
	return true;
});

const NavigationBarRouteMapper = {
	LeftButton(route, navigator, index, navState) {
		_navigator = navigator;
		if (index === 0) {
			return null;
		} else if (route.id == 'editprofile') {
			return (
				<TouchableOpacity onPress={route.pressCancel}>
          	<Text style={styles.rightButtonText}>
            	Cancel
          	</Text>
        	</TouchableOpacity>
			);
		}

		return (
			<TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        	<Icon
	          name='ios-arrow-back'
	          size={30}
	          style={{marginTop: 8}}
	          color={Colors.pageBule}
        	/>
      	</TouchableOpacity>
		);
	},

	RightButton(route, navigator, index, navState) {
		_navigator = navigator;
		let rightButton;
		switch (route.id) {
			case 'login':
				rightButton = (
					<TouchableOpacity onPress={route.pressRegister}>
	          <Text style={styles.rightButtonText}>
	            注册
	          </Text>
        	</TouchableOpacity>
				)
				break;
			case 'myOrder':
				rightButton = (
					<TouchableOpacity onPress={route.pressSave}>
            <Text style={styles.rightButtonText}>
              编辑
            </Text>
          </TouchableOpacity>
				)
				break;
			case 'commonUserProfile':
				rightButton = (
					<TouchableOpacity onPress={route.pressSave}>
            <Text style={styles.rightButtonText}>
              保存
            </Text>
          </TouchableOpacity>
				)
				break;

				/**
				 * 这里本来不需要取消按钮，但是如果不加，右上角虽然没有按钮，
				 * 点击后会不停地进入新的注册页面
				 * （这里的取消后期可作为清空输入内容的按钮使用）
				 */
			case 'register':
				rightButton = (
					<TouchableOpacity>
            <Text style={styles.rightButtonText}>
            	取消
            </Text>
          </TouchableOpacity>
				)
				break;
			default:
		}
		return rightButton;
	},

	Title(route, navigator, index, navState) {
		_navigator = navigator;
		let title;
		switch (route.id) {
			case 'RootIndex':
				title = '酒店预订系统';
				break;
			case 'login':
				title = '登录';
				break;
			case 'myOrder':
				title = '我的订单';
				break;
			case 'register':
				title = '注册';
				break;
			case 'findPassWord':
				title = '找回密码';
				break;
			case 'hotelDetail':
				title = '酒店详情';
				break;
			case 'calendarModel':
				title = '选择日期';
				break;
			case 'hotelFacilities':
				title = '酒店设施';
				break;
			case 'hotelPolicies':
				title = '酒店政策';
				break;
			case 'orderConfirm':
				title = '提交订单';
				break;
			case 'orderDetail':
				title = '订单详情';
				break;
			case 'orderSuccess':
				title = '订单详情';
				break;
			case 'orderFail':
				title = '订单详情';
				break;
			case 'user':
				title = '个人信息';
				break;
			case 'findPwdSuccess':
				title = '找回密码';
				break;
			case 'findPwdFail':
				title = '找回密码';
				break;
			case 'commonUserProfile':
				title = '修改信息';
				break;
		}
		return (
			<Text 
				style = {[styles.navBarText,styles.navBarTitleText, {width: 250,height: 40,textAlign: 'center'}]}
				numberOfLines = {1}> 
				{title} 
			</Text>
		);
	}
}

export default class HomeView extends Component {
	componentWillMount() {
		HBService.queryLoginState();
	}
	render() {
		return ( 
			<Navigator 
				initialRoute = {
					{
						id: 'RootIndex',
					}
				}
				renderScene = {
					this.renderScene
				}
				configureScene = {
					(route) => {
						if (route.sceneConfig) {
							return route.sceneConfig;
						}
						return Navigator.SceneConfigs.FloatFromRight;
					}
				}
				navigationBar = {
					<Navigator.NavigationBar
							routeMapper={NavigationBarRouteMapper}
							style={styles.navBar}
	            navigationStyles={TopNavigatorBarStyle}
					/>
				}
			/>
		)
	}
	renderScene(route, navigator) {
		_navigator = navigator;
		switch (route.id) {
			case 'RootIndex':
				return <RootIndex data={route.data} navigator={navigator} />;
			case 'login':
				return <Login navigator={navigator} route={route}/>;
			case 'user':
				return <User navigator={navigator} route={route}/>;
			case 'myOrder':
				return <MyOrder navigator={navigator} route={route}/>;
			case 'register':
				return <Register navigator={navigator} route={route} />;
			case 'findPassWord':
				return <FindPassWord navigator={navigator} route={route}/>;
			case 'findPwdSuccess':
				return <FindPwdSuccess navigator={navigator} route={route}/>;
			case 'findPwdFail':
				return <FindPwdFail navigator={navigator} route={route}/>;
			case 'hotelDetail':
				return <HotelDetail navigator={navigator} data={route.data} selectRoom={route.selectRoom}/>;
			case 'calendarModel':
				return <CalendarModel navigator={navigator} route={route} />;
			case 'hotelFacilities':
				return <HotelFacilities navigator={navigator} data={route.data}/>;
			case 'hotelPolicies':
				return <HotelPolicies navigator={navigator} data={route.data}/>;
			case 'orderConfirm':
				return <OrderConfirm navigator={navigator} data={route.data} selectRoom={route.selectRoom}/>;
			case 'orderDetail':
				return <OrderDetail navigator={navigator} route={route} />;
			case 'orderSuccess':
				return <OrderSuccess navigator={navigator} route={route}/>;
			case 'orderFail':
				return <OrderFail navigator={navigator} route={route}/>;
			case 'commonUserProfile':
				return <CommonUserProfile navigator={navigator} route={route}/>;
		}
		return null;
	}
}

const styles = StyleSheet.create({
	messageText: {
		fontSize: 17,
		fontWeight: '500',
		padding: 15,
		marginTop: 50,
		marginLeft: 15,
	},
	button: {
		backgroundColor: 'white',
		padding: 15,
		borderBottomWidth: 1 / PixelRatio.get(),
		borderBottomColor: '#CDCDCD',
	},
	buttonText: {
		fontSize: 17,
		fontWeight: '500',
	},
	navBar: {
		backgroundColor: 'white',
		borderBottomColor: Colors.borderColor,
		borderBottomWidth: 0.5,
	},
	rightButtonText: {
		fontSize: 15,
		marginVertical: 10,
		color: Colors.pageBule,
		marginRight: 10,
	},
	navBarText: {
		fontSize: 16,
		marginVertical: 10,
	},
	navBarTitleText: {
		color: 'black',
		fontWeight: '300',
		marginVertical: 11,
	},
	navBarLeftButton: {
		paddingLeft: 10,
		width: 40,
		height: 40,
	},
	navBarRightButton: {
		paddingRight: 10,
	},
	navBarButtonText: {
		color: '#8EE5EE',
	},
	scene: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: '#EAEAEA',
	},
	searchBar: {
		padding: 1,
		flexDirection: 'row',
		alignItems: 'center',
		width: ScreenWidth - 10,
		height: 35,
		// borderWidth: 1,
		// borderColor: Colors.borderColor,
		borderRadius: 4,
		margin: 5,
		backgroundColor: Colors.backGray,
	},
	searchIcon: {
		marginLeft: 3,
		marginRight: 3,
		width: 20,
		height: 20
	},
	textInput: {
		fontSize: 14,
		alignSelf: 'stretch',
		flex: 1,
		color: Colors.black,
	},
});