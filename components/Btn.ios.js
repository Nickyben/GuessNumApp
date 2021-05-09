import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    Text,
    TouchableOpacity,
    Dimensions,
    
} from 'react-native';

import Colors from '../constants/colors'

const windowWidth = Dimensions.get('window').width;

const Btn = props => {

    let BtnComponent = TouchableOpacity;


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
            <BtnComponent activeOpacity={0.6} onPress={props.onPress}
                activeOpacity={0.7}>
                <View style={{ ...myStyles.button, ...props.style, backgroundColor: btnColor }} >
                    <Text
                        style={myStyles.btnText}>
                        {props.children}
                    </Text>

                </View>
            </BtnComponent>


    );
};

const myStyles = StyleSheet.create({
   
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
