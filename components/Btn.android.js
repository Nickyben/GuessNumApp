import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    Dimensions,
    Platform
} from 'react-native';

import Colors from '../constants/colors'

const windowWidth = Dimensions.get('window').width;

const Btn = props => {

    let BtnComponent = TouchableOpacity;

    if (Platform.Version >= 21) {
        BtnComponent = TouchableNativeFeedback;
    }

    let btnColor = Colors.primary
    switch (props.type) {
        case 'accent':
            btnColor = Colors.accent;
            break;
        case 'noteColor':
            btnColor = Colors.noteColor;
            break;
    }


    return (
        <View style={myStyles.touchable}>
            <BtnComponent activeOpacity={0.6} onPress={props.onPress}
                activeOpacity={0.7}>
                <View style={{ ...myStyles.button, ...props.style, backgroundColor: btnColor }} >
                    <Text
                        style={myStyles.btnText}>
                        {props.children}
                    </Text>

                </View>
            </BtnComponent>
        </View>


    );
};

const myStyles = StyleSheet.create({
    touchable: {
        borderRadius: 25,
        overflow: 'hidden'
    },

    button: {
        // maxWidth: 150,
        minWidth: 80,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 25,

    },

    btnText: {
        color: 'white',
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
        textAlign: 'center'
    }

});

export default Btn;
