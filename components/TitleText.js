import React from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';

const TitleText = props => {
    return (
        <Text style={{ ...myStyles.titleText, ...props.style }} >
            {props.children}
        </Text>
    );
};

const myStyles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontFamily: 'OpenSansBold'
    },
});

export default TitleText;
