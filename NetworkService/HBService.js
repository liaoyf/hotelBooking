/**
 * @author liaoyf
 * 数据管理中心
 */
'use strict';
import React, {Component} from 'react';

import {
	Navigator,
	AsyncStorage,
}
from 'react-native';
import {
	EventEmitter
} from 'events';
/**
 * 基础路径
 * @type {String}
 */
const API_PATH = 'http://liaoyufei.com';
/**
 * 用户注册register、找回密码findPassword、登录login
 * @type {[String]}
 */
const USER_PATH = API_PATH + '/web/user';
/**
 * 存放在AsyncStorage中用戶信息的KEY
 * @type {String}
 */
const HB_USER_KEY = 'HB_USER_KEY';
const EMPTY_USER = {
	username: '',
	password: '',
	code: 1,
	data: {},
};
let GLOBAL_USER = {
	username: '',
	password: '',
	code: 1,
	data: {},
};
/**
 * 两个状态：
 * 1、logined
 * 2、unlogined
 */
class HBService extends EventEmitter {
	constructor() {
		super();
	}

	apiPath() {
		return API_PATH;
	}

	queryLoginState() {
		return (
			AsyncStorage.getItem(HB_USER_KEY)
			.then(ret => {
				if (ret) {
					GLOBAL_USER = JSON.parse(ret);
					this.login(GLOBAL_USER.username,GLOBAL_USER.password);
				}
				console.log(GLOBAL_USER);
				return GLOBAL_USER;
			})
			.catch(err => {
				console.warn(err)
			})
		)
	}
	isLogined() {
		console.log(GLOBAL_USER.username)
		return GLOBAL_USER.code === 0;
	}
	login(username, password) {
		const LOGIN_PATH = USER_PATH + '/login';
		return (
			fetch(LOGIN_PATH, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify({
					"username": username,
					"password": password
				})
			})
			.then((res) => {
				return res.json()
			})
			.then((json) => {
				console.log(json);
				if (json.code == 1) {
					return json;
				}
				if (json.code == 0) {
					GLOBAL_USER.code = json.code;
					GLOBAL_USER.username = json.data.loginId;
					GLOBAL_USER.password = json.data.passwd;
					Object.assign(GLOBAL_USER, json);
					console.log(GLOBAL_USER);
					return SingleHBService._setGlobalUser()
						.then(() => console.log(AsyncStorage.getItem(HB_USER_KEY)));

				} else {
					throw new Error(json.message);
				}
			})
		)
	}
	logout() {
		console.log('退出登录');
		GLOBAL_USER = EMPTY_USER;
		return SingleHBService._removeGlobalUser()
			.then(() => console.log(GLOBAL_USER));
	}
	currentUser() {
		console.log(GLOBAL_USER);
		return GLOBAL_USER
	}
	_setGlobalUser() {
		return AsyncStorage.setItem(
			HB_USER_KEY,
			JSON.stringify(GLOBAL_USER)
		)
	}
	_removeGlobalUser() {
		return AsyncStorage.removeItem(HB_USER_KEY)
	}
}
const SingleHBService = new HBService();
module.exports = SingleHBService;