/**
 * 本来作为同时选择两个日期的组件，现在弃用
 */
'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CalendarPicker from '../lib/calendarPicker';

export default class CalendarModel extends Component {
  constructor() {
    super();
    const month = (new Date()).getMonth();
    const afterDate = new Date();
    afterDate.setMonth(month + 2);
    const beforeDate = new Date();
    beforeDate.setMonth(month);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    this.state = {
      selected: {
        startDate: today,
        endDate: tomorrow,
      },
      unavailable: {
        beforeDate: beforeDate,
        afterDate: afterDate,
      }
    };
  }

  _handleOnSelected(startDate, endDate) {

  }

  _handleOnClose(startDate, endDate) {

  }

  render() {
    return (
      <View style={styles.container}>
        <CalendarPicker
          selected={this.state.selected}
          unavailable={this.state.unavailable}
          onSelected={this._handleOnSelected}
          onClose={this._handleOnClose}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 44,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});