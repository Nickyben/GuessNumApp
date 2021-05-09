import React from 'react';
import {
    StyleSheet,
    TextInput
} from 'react-native';

const Input = props => {
    return (
        <TextInput {...props} style={{...myStyles.input,...props.style}}>

        </TextInput>
    );
};

const myStyles = StyleSheet.create({
    input:{
        height:30,
        borderRadius:7,
        borderColor :'grey',
        borderBottomWidth:2,
        borderLeftWidth: 0.1,
        borderRightWidth:0.1,
        marginVertical:10,
    },
});

export default Input;
