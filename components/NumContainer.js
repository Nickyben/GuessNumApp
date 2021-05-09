import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Colors from '../constants/colors';

const NumContainer = props => {
    return (
        <View style={myStyles.container}>
            <Text style={myStyles.number}>
              {props.children}  
            </Text>
        </View>
    );
};

const myStyles = StyleSheet.create({
    container:{
      borderWidth:2,
      borderColor: Colors.accent,
      padding:10,
      borderRadius:10,
      marginVertical:10,
      alignItems:'center',
      justifyContent:'center',  
    },

    number: {
        color:Colors.accent,
        fontSize:22,
    }
});

export default NumContainer;
