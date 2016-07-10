/**
 * 主页搜索控件
 * @author liao_yf
 */
'use strict';

import React, {Component} from 'react';
import {
	Image,
	Platform,
	ProgressBarAndroid,
	TextInput,
	StyleSheet,
	TouchableNativeFeedback,
	View,
}
from 'react-native';

import Colors from '../CommonComponents/Colors'
import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/Ionicons';

const ScreenWidth = Dimensions.get('window').width;

export default class SearchBar extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.searchBar}>
	        <Icon
	          name={'ios-search'}
	          size={20}
	          style={styles.searchIcon}
	          color={Colors.black}
	        />
	        <TextInput
	          style={styles.textInput}
	          placeholder='酒店名称'
	          autoFocus={true}
	          //onChangeText={route.sp.onChangeText}
	          //onSubmitEditing={route.sp.onSubmitEditing}
	          clearButtonMode={'while-editing'}
	          />
	      </View>
      </View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		borderBottomWidth:1,
		borderBottomColor:Colors.borderColor,
	},
  searchBar: {
  	flex:1,
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //width: ScreenWidth - 40,
    height: 35,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    margin: 5,
    //backgroundColor: Colors.backGray,
  },
  searchIcon: {
    marginLeft: 5,
    marginRight: 3,
    width: 20,
    height: 20
  },
  textInput: {
    fontSize: 12,
    alignItems:'center',
  //  alignSelf: 'stretch',
    flex: 1,
    color: Colors.black,
  },
});