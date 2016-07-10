/**
 * 我的订单组件
 * @author liao_yf
 */

'use strict';
import React, {Component} from 'react';
import {
	StyleSheet,
	ScrollView,
  TouchableHighlight,
  View,
  Text,
}
from 'react-native';

import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../CommonComponents/Colors';
import OrderList from './OrderList';
import RootTab from './RootTab';

const ICON_SIZE = 20;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class MyOrder extends Component{
/*	render(){
    return(
      <RootTab structure={[{
   	 		tabName: '全部',
   		 	iconName: 'ios-paper',
   		 	renderContent:()=>{
   		 		return <OrderList navigator={this.props.navigator}/>
   		 	}
      },
      {
  			tabName: '已确认',
    		iconName: 'ios-list',
    		renderContent:()=>{
    			return <OrderList navigator={this.props.navigator}/>
    		}
      },
      {
  			tabName: '未确认',
    		iconName: 'ios-list-outline',
    		renderContent:()=>{
    			return <OrderList navigator={this.props.navigator}/>
    		}
      },
      ]}
      selectedTab={0}
      location='top'
	   />
    )
	}*/
  constructor(props) {
    super(props);
    this.state = {
      orderState:0,//0:全部，1：已确认，2：未确认
    }
  }
  render(){
    return(
      <ScrollView>
        <View style={styles.container}>
          <TouchableHighlight
            style={styles.all}
            onPress={()=>this.orderChoose('0')}
            underlayColor={Colors.backGray}
            >
            <Text>全部</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.all}
            onPress={()=>this.orderChoose('1')}
            underlayColor={Colors.backGray}
            >
            <Text>已确认</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.all}
            onPress={()=>this.orderChoose('2')}
            underlayColor={Colors.backGray}
            >
            <Text>未确认</Text>
          </TouchableHighlight>      
        </View>
        <OrderList orderState={this.state.orderState} navigator={this.props.navigator}/>
      </ScrollView>
    )
  }
  orderChoose(chooseState){
    if(chooseState==0){
      this.setState({
        orderState:chooseState
      })
    }
    if(chooseState==1){
      this.setState({
        chooseState:chooseState
      })
    }
    if(chooseState==2){
      this.setState({
        chooseState:chooseState
      })
    }
  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    marginTop:44,
    flexDirection:'row',
    justifyContent:'space-around',
    height:44,
  },
  all:{
    height:44,
    justifyContent:'center',
    alignItems:'center',
    borderLeftWidth:1,
    width:SCREEN_WIDTH / 3,
    borderColor:Colors.borderColor,
  }
})