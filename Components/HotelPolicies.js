/**
 * 酒店政策组件
 * （未完成版）
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

export default class HotelPolicies extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<View style={styles.container}>
        <Text>{this.props.data}</Text>
      </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 44,
	}
})