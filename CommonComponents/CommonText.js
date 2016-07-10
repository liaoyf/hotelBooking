/**
 * 订单详情页面的文字信息ROW
 * @author liao_yf
 */

'use strict';
import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
}
from 'react-native';

import Dimensions from 'Dimensions';
import Colors from './Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ICON_SIZE = 25;

export default class CommonText extends Component{
	 static defaultProps = {
    titlename: 'titlename',
    contentsInfo: 'contentsInfo'
  };

  static propTypes = {
    titlename: React.PropTypes.string,
    contentsInfo: React.PropTypes.string,
  };
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titlename}>
              {this.props.titlename}
            </Text>
          </View>
          <View style={styles.contents}>
            <Text style={styles.contentsInfo}>
              {this.props.contentsInfo}
            </Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderColor: '#EDECF1',
  },
  title: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  titlename: {
    color: Colors.textGray,
    fontSize: 14,
  },
  contents: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  contentsInfo: {
    color: 'black',
    fontSize: 16,
  },
});
