'use strict'

import React, {
  Text, 
  View, 
  ScrollView, 
  StyleSheet, 
  PropTypes,
  Component,
} 
from 'react-native';
import styles from './calendarStyles';
import utils from './utils';

export default class calendarPicker extends Component {

  static propTypes = {
    onSelected: PropTypes.func.isRequired,
    selected: PropTypes.object,
    unavailable: PropTypes.object.isRequired,
    showHoliday: PropTypes.bool,
    onClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    selected: null,
    showHoliday: false,
  };

  constructor(props) {
    super();
    let startDate = null;
    let endDate = null;
    if (props.selected) {
      startDate = props.selected.startDate;
      endDate = props.selected.endDate;
    } else {
      startDate = props.unavailable.beforeDate;
      endDate = new Date(props.unavailable.beforeDate);
      endDate.setDate(startDate.getDate() + 1);
    }
    this.state = {startDate: startDate, endDate: endDate};
  }

  _jsxWeek = () => {
    const weeks = ['日', '一', '二', '三', '四', '五', '六'];
    return (
      <View style={styles.weekRow}>
        {weeks.map(week => <Text style={[styles.itemText, styles.weekText]} key={week}>{week}</Text>)}
      </View>
    );
  };

  _jsxYearMonth = date => {
    return (
      <View style={styles.yearMonth}>
        <Text style={styles.yearMonthText}>
          {`${date.getFullYear()}年${utils.format(date.getMonth() +1)}月`}
        </Text>
      </View>
    )
  };

  _handleOnSelect = date => {
    const state = this.state;
    if ((null == state.startDate && null == state.endDate)
      || (null != state.startDate && null != state.endDate)) {
      this.setState({startDate: date, endDate: null});
      return;
    }
    if (null != state.startDate && null == state.endDate) {
      if (date > state.startDate) {
        this.setState({endDate: date});
      } else if (date < state.startDate) {
        this.setState({startDate: date, endDate: state.startDate});
      }
      this.props.onSelected(date, state.startDate);
    }
  };

  _jsxDate = (startDate, endDate) => {
    const {afterDate, beforeDate} = this.props.unavailable;

    const sDate = new Date(startDate);
    sDate.setDate(sDate.getDate() - sDate.getDay());

    const eDate = endDate > afterDate ? new Date(afterDate) : new Date(endDate);
    eDate.setDate(eDate.getDate() - eDate.getDay() + 7);

    let curr = new Date(sDate);

    const getStyle = () => {
      const style = [styles.itemText];
      if (curr > this.state.startDate && curr < this.state.endDate) {
        style.push(styles.range);
      }
      if (utils.equalWithYearMonthDate(curr, this.state.startDate)
        || utils.equalWithYearMonthDate(curr, this.state.endDate)) {
        style.push(styles.curr);
      }
      return style;
    };

    const resultJSX = [];
    let rowJSX = [];
    while(curr <= eDate) {
      if (curr >= beforeDate && curr <= afterDate && curr.getMonth() == startDate.getMonth()) {
        rowJSX.push(<Text style={getStyle()} onPress={this._handleOnSelect.bind(this, new Date(curr))} key={curr}>{curr.getDate()}</Text>);
      } else {
        rowJSX.push(<Text style={styles.itemText} key={curr}></Text>);
      }
      if (curr.getDay() === 6) {
        resultJSX.push(<View key={curr} style={styles.row}>{rowJSX.slice()}</View>);
        rowJSX = [];
      }
      curr.setDate(curr.getDate() + 1);
    }
    return resultJSX;
  };

  _jsxWrapperItem = date => {
    const sDate = new Date(date);
    const eDate = utils.getNextMonth(date);
    eDate.setDate(0);

    return (
      <View key={date}>
        {this._jsxYearMonth(date)}
        {this._jsxDate(sDate, eDate)}
      </View>
    );
  };
  _jsxWrapper = () => {
    const beforeDate = this.props.unavailable.beforeDate;
    const afterDate = this.props.unavailable.afterDate;

    let curr = new Date(beforeDate);

    const wrapperJSX = [];
    wrapperJSX.push(this._jsxWrapperItem(curr));
    curr.setDate(1);
    curr = utils.getNextMonth(curr);

    while(curr <= afterDate) {
      wrapperJSX.push(this._jsxWrapperItem(curr));
      curr = utils.getNextMonth(curr);
    }

    return (
      <ScrollView>
        {wrapperJSX}
      </ScrollView>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this._jsxWeek()}
        {this._jsxWrapper()}
      </View>
    );
  }
};
