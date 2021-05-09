import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import TitleText from './TitleText';
import BodyText from './BodyText';
import Colors from '../constants/colors';

const Header = props => {
    return (
        <View
            style={{
                ...myStyles.headerBase,
                ...Platform.select({
                    ios: myStyles.headerIos,
                    android: myStyles.headerAndroid
                })
            }}>
            <TitleText style={myStyles.headerTitle}>{props.title}</TitleText>
        </View>
    );
};

const myStyles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        padding: 20,
        // backgroundColor: Platform.OS==='android'?Colors.primary: 'white',
        // borderBottomWidth: Platform.OS=='ios' ? 2:0,
        // borderBottomColor: Platform.OS==='ios' ? '#ccc': 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerIos: {
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },

    headerAndroid: {
        backgroundColor: Colors.primary,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
    },

    headerTitle: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white',
       // marginVertical: 10,
       
    }
});

export default Header;
