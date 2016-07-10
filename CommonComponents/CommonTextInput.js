 /**
  * 订单详情页面的文字+输入ROW
  * @author liao_yf
  */

 'use strict';

import React, {Component} from 'react';

import {
   View,
   StyleSheet,
   Text,
   TextInput,
}
from 'react-native';

 import Dimensions from 'Dimensions';
 import Colors from './Colors';

 const SCREEN_WIDTH = Dimensions.get('window').width;

 export default class CommonTextInput extends Component {
   static defaultProps = {
     titlename: 'titlename',
   };

   static propTypes = {
     titlename: React.PropTypes.string,
   };
   render() {
     return (
       <View style={styles.container}>
            <Text style={styles.titlename}>
              {this.props.titlename}
            </Text> 
            <TextInput style={styles.contentsInfo}/>
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
   titlename: {
     color: Colors.textGray,
     fontSize: 14,
   },
   contentsInfo: {
     fontSize: 15,
     borderWidth: 1,
     alignSelf: 'center',
     marginTop: 5,
     marginBottom: 10,
     borderRadius: 4,
     padding: 3,
     borderColor: Colors.borderColor,
   },
 });