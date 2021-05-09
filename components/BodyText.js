import React from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';

const BodyText = props => {
    return (
        <Text style={{ ...myStyles.appText, ...props.style }} {...props} >
            {props.children}
        </Text>
    );
};

const myStyles = StyleSheet.create({
    appText: {
        fontFamily: 'OpenSansRegular'
        
    },
});

export default BodyText;
