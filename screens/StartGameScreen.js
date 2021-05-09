import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Alert,
    Dimensions,
    ScrollView
} from 'react-native';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Btn from '../components/Btn';
import NumContainer from '../components/NumContainer';
import Input from '../components/Input';
import Colors from '../constants/colors';

//!!VERY IMPORTANT NB: ANYTHING THAT HAS TO DO WITH WIDTH OR HEIGHT AND
// WHICH DEPENDS ON DEVICE PRESENT WIDTH OR HEIGHT ACCORDING TO PRESENT ORIENTATION,
// SHOULD BE DEALT WITH USING DIMENSIONS EVENT LISTENER AND STYLING INSIDE THE COMPONENT

//const windowWidth = Dimensions.get('window').width;

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [selectedNum, setSelectedNum] = useState('');
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateLayout = () => {
            setWindowWidth(Dimensions.get('window').width);

        };
        Dimensions.addEventListener('change', updateLayout);
        return (() => {
            Dimensions.removeEventListener('change', updateLayout);
        });
    });


    const numInputHandler = (text) => {
        setEnteredValue(text.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setIsConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNum = parseInt(enteredValue);
        if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
            Alert.alert('Invalid Number!', 'Number Should be between 1 and 99',
                [
                    {
                        text: 'Okay',
                        style: 'cancel',
                        onPress: resetInputHandler
                    }
                ]
            );
            return;
        }
        setIsConfirmed(true);
        setSelectedNum(chosenNum);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (isConfirmed) {
        confirmedOutput = (
            <Card style={myStyles.summaryContainer}>
                <BodyText>You Selected</BodyText>
                <NumContainer>
                    {selectedNum}
                </NumContainer>
                <Btn
                    type='primary'
                    onPress={() => props.onStartGame(selectedNum)}
                >
                    START GAME
                </Btn>

            </Card>)
    } else {
        // confirmedOutput = <BodyText>Chosen Number is: Nothing Yet</BodyText>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behaviour='padding'//position is recommended for ios
                keyboardVerticalOffset={30}
            >
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }} >
                    <View style={myStyles.screen1}>
                        <TitleText style={myStyles.title}>Start a New Game</TitleText>
                        <Card style={myStyles.inputContainer} >
                            <BodyText> Select a Number</BodyText>
                            <Input
                                style={myStyles.input}
                                blurOnSubmit autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numInputHandler}
                                value={enteredValue}
                            />
                            <View style={myStyles.buttonContainer}>

                                <Btn
                                    //style={myStyles.button }
                                    style={{ ...myStyles.button, width: windowWidth / 3 }}
                                    onPress={resetInputHandler}
                                    type='accent' >
                                    Reset
                                </Btn>

                                <Btn
                                    //style={myStyles.button}
                                    style={{ ...myStyles.button, width: windowWidth / 3 }}
                                    type='primary'
                                    onPress={confirmInputHandler}>
                                    Confirm
                                </Btn>



                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const myStyles = StyleSheet.create({
    screen1: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        marginVertical: 10,
        //you cant use fontWeight with custom loaded fonts
    },
    inputContainer: {

        width: '80%',
        minWidth: 300,
        //maxWidth: '95%',
        alignItems: 'center',
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
    },
    button: {
        //maxWidth: 100,
        // width: windowWidth / 3,
    },

    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },


});

export default StartGameScreen;