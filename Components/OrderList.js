/**
 * 我的订单(全部、已确认、未确定列表)
 * @author liaoyf
 */
'use strict'

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ListView,
  TouchableOpacity,
}
from 'react-native';

import OrderCell from './OrderCell'
import {SwipeListView} from 'react-native-swipe-list-view';
import HBService from '../NetworkService/HBService'

const ORDER_LIST_PATH = HBService.apiPath() + '/web/order/unfinishOrder';

export default class OrderList extends Component {
  componentDidMount() {
    this._searchOrder();
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }
  _searchOrder() {
    fetch(ORDER_LIST_PATH)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      this.setState({
        dataSource: this._getDataSource(json.data.rows)
      });
    })
  }
  _getDataSource(order) {
    return this.state.dataSource.cloneWithRows(order);
  }
  render() {
    return (
      <SwipeListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderListViewRow.bind(this)}
        disableRightSwipe={true}
        renderHiddenRow={ (data, secId, rowId, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity 
                style={[styles.backRightBtn, styles.backRightBtnRight]} 
                onPress={ _ => this.deleteRow(secId, rowId, rowMap,data) }>
                <Text style={styles.backTextWhite}>删除</Text>
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-75}
        />
    )
  }
  deleteRow(secId,rowId,rowMap,data){
    console.log(secId);
    console.log(rowId);
    console.log(rowMap);
    console.log(data);
    //删除一行后，执行_searchHotel()重新刷新数据，不知是否可行。
  }

  renderListViewRow(data) {
    console.log(data);
    return (
      <TouchableHighlight 
		 		underlayColor={'#f3f3f2'}
      	onPress={()=>this.selectRow(data)}>
      	<View><OrderCell data={data} /></View>
      </TouchableHighlight>
    )
  }

  selectRow(data) {
    console.log(data);
    this.props.navigator.push({
      id: 'orderDetail',
      title: '订单详情',
      data: data,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // flex: 1
  },
  standalone: {
    marginTop: 50,
    marginBottom: 50,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  }
})