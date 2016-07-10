/**
 * 酒店详情页顶部酒店图片轮换组件
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
	ListView,
	Image,
	ViewPagerAndroid,
}
from 'react-native';
import Dimensions from 'Dimensions'
import Colors from '../CommonComponents/Colors'
import Swiper from 'react-native-page-swiper'
const ScreenWidth = Dimensions.get('window').width;

export default class HotelSwiperImg extends Component {
	render() {
		return (
			<View>
				<Swiper
				activeDotColor={Colors.activeDotColor}
				>
					<View>
						<Image
						  style={styles.img}
						  source={require('./hotel1.jpg')} />						
					</View>
					<View>
						<Image
						  style={styles.img}
						  source={require('./hotel2.jpg')} />						
					</View>
					<View>
						<Image
						  style={styles.img}
						  source={require('./hotel3.png')} />						
					</View>
				</Swiper>
				<Text style={styles.hotelTitle}>{this.props.hotelName}</Text>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	img: {
		flex: 1,
		width: ScreenWidth,
		height: 180,
	},
	hotelTitle: {
		marginTop: -40,
		fontSize: 26,
		fontWeight: '900',
		marginLeft: 10,
		color: 'black',
	}
})