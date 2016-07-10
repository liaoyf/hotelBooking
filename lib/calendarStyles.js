'use strict'
import {
  StyleSheet, 
  PixelRatio,
}
from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  week: {
    backgroundColor: '#eee',
  },
  weekRow:{
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems:'center',
  },
  weekText: {
    color: '#2bb8aa',
  },
  item: {
    flex: 1,
  },
  itemText: {
    flex: 1,
    fontWeight: 'bold',
    width: 48,
    height: 48,
    lineHeight: 34,
    textAlign: 'center',
  },
  curr: {
    color: '#fff',
    backgroundColor: '#2bb8aa'
  },
  range: {
    backgroundColor: '#daf5f2',
    color: '#2bb8aa',
 
  },
  wrapper: {
    flex: 1,
  },
  yearMonth: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 5,
    alignSelf: 'center',
  },
  yearMonthText: {
    color: '#666',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  }
});

export default styles;