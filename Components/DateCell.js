/**
 * 酒店详情页 日期选择Cell
 * @author liao_yf
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Image,
  Navigator,
}
from 'react-native';

import Icona from 'react-native-vector-icons/FontAwesome';
import Iconb from 'react-native-vector-icons/Ionicons';
import Colors from '../CommonComponents/Colors'

const ICON_SIZE = 20;

export default class DateCell extends Component {
  static defaultProps = {
    // indate: today.toLocaleDateString(),
    // outdate:tomorrow.toLocaleDateString(),
  };
  constructor(props) {
    super(props);
    this.state = {
      /* indate: this.props.indate?this.props.indate.toLocaleDateString():today.toLocaleDateString(),
       outdate:this.props.outdate?this.props.outdate.toLocaleDateString():tomorrow.toLocaleDateString(),*/
    };
  }


  static propTypes = {
    onPress: React.PropTypes.func,
    cellName: React.PropTypes.string,
  };
  render() {
    console.log(this.props);
    return (
      <View style={styles.dataContainer}>
        <Icona
          name={'calendar'}
          size={ICON_SIZE}
          style={styles.incons}
          color={'black'}/>
        <TouchableHighlight
          underlayColor={Colors.lightGray}
          onPress={this.props.onIndatePress}>
          <View style={styles.user}>
            <View style={styles.dateInfo}>
              <Text style={styles.date}>
                {this.props.indate.toLocaleDateString()}<Text style={styles.inout}>住店</Text>
              </Text>
            </View>
            <Iconb
              name='ios-arrow-right'
              size={ICON_SIZE}
              iconStyle={styles.incons}
              color={Colors.textGray}/>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={Colors.lightGray}
          onPress={this.props.onOutDatePress}>
          <View style={[styles.user,{marginLeft:30}]}>
            <View style={styles.dateInfo}>
              <Text style={styles.date}>
                {this.props.outdate.toLocaleDateString()}<Text style={styles.inout}>离店</Text>
              </Text>
            </View>
            <Iconb
              name='ios-arrow-right'
              size={ICON_SIZE}
              iconStyle={styles.incons}
              color={Colors.textGray}/>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dataContainer: {
    marginTop: 5,
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 10,
    paddingRight: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderColor,
  },

  user: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderColor: Colors.borderColor,
  },
  dateInfo: {
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 20,
    justifyContent: 'center',
    flex: 1,
  },
  date: {
    color: 'black',
    fontSize: 16,
  },
  incons: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 20,
  },
  inout: {
    color: Colors.textGray,
    fontSize: 10,
  }
});