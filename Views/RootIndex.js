/**
 * 项目根页面
 * （不带顶部导航，带底部bar和主页、我的页面）
 * @author liaoyf
 */
'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
}
from 'react-native';

import RootTab from '../Components/RootTab';
import Icon from 'react-native-vector-icons/Ionicons';
import HotelView from './HotelView';
import UserView from './UserView'

export default class RootIndex extends Component{
	render(){
    return(
      <RootTab structure={[{
   	 		tabName: 'Home',
   		 	iconName: 'ios-home',
   		 	renderContent:()=>{
   		 		return <HotelView navigator={this.props.navigator} data={this.props.data}/>
   		 	}
      },
      {
  			tabName: 'Me',
    		iconName: 'ios-person',
    		renderContent:()=>{
    			return <UserView navigator={this.props.navigator} data={this.props.data}/>
    		}
      },
      ]}
      selectedTab={0}
      location='bottom'
	     />
    )
	}
}