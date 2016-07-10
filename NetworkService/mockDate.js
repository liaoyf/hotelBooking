/**
 * 模拟前端所需要的数据
 * @author liaoyf
 */
'use strict'

const hotelInfo = [{
	hotelName: '如家酒店一号',
	hotelPrice: '118',
	hotelDistance: '4.3',
	hotelLocation: '西北大学南门外',
	hotelFacilities: ['WIFI1', '停车场1', '等等1号'],
	hotelPolicies: '入住时间：12点以后',
	room: [{
		roomName: '单人间',
		roomPrice: '118',
	}, {
		roomName: '标准间',
		roomPrice: '138',
	}, {
		roomName: '家庭套间',
		roomPrice: '228',
	}],
}, {
	hotelName: '如家酒店二号',
	hotelPrice: '128',
	hotelDistance: '5.3',
	hotelLocation: '西安外国语大学',
	hotelFacilities: ['WIFI2', '停车场2', '等等2号'],
	hotelPolicies: '入住时间：12点以后2号',
	room: [{
		roomName: '单人间',
		roomPrice: '128',
	}, {
		roomName: '标准间',
		roomPrice: '158',
	}, {
		roomName: '家庭套间',
		roomPrice: '258',
	}],
}];

module.exports = hotelInfo;