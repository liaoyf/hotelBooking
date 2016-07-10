/**
 * 项目根页面的tab组件
 * @author liaoyf
 */
'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  BackAndroid,
  Dimensions,
  DrawerLayoutAndroid,
  StyleSheet,
  ToolbarAndroid,
  View,
  Text,
}
from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import BottomTabBar from './BottomTabBar';

export default class RootTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      structure: this.props.structure,
      selectedTab: this.props.selectedTab,
    };
  }
  render() {
    let top = 0;
    if (this.props.location === 'top') {
      top = 44;
    }
    return (
      <View style={{backgroundColor: 'white', flex: 1,marginTop:top}}>
       <ScrollableTabView
          renderTabBar={() => <BottomTabBar />}
          tabBarPosition={this.props.location}
          initialPage={this.state.selectedTab}
          >
		    {this.state.structure.map((tabProps, tabIndex) => 
      		<View style={{flex:1}}
          		  tabLabel={tabProps}
          		  key={tabIndex}>
          		  {tabProps.renderContent()}
	        </View>
	            	)}
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#E9EAED',
    height: 56,
  },
});