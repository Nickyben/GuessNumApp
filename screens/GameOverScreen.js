import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    Dimensions,

} from 'react-native';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Btn from '../components/Btn';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/defaultStyles';



//!!VERY IMPORTANT NB: ANYTHING THAT HAS TO DO WITH WIDTH OR HEIGHT AND
// WHICH DEPENDS ON DEVICE PRESENT WIDTH OR HEIGHT ACCORDING TO PRESENT ORIENTATION,
// SHOULD BE DEALT WITH USING DIMENSIONS EVENT LISTENER AND STYLING INSIDE THE COMPONENT
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const GameOverScreen = props => {
    return (
       <ScrollView showsVerticalScrollIndicator={false}>
            <View style={myStyles.screen}>
                <Card style={myStyles.msgContainer}>
                    <TitleText style={myStyles.title}>GAME OVER!</TitleText>
                    <View style={myStyles.imgContainer}>
                        <Image
                            // for web image source={{uri: 'http://...'}} 
                            source={require('../assets/images/cool.png')}
                            resizeMode='cover'
                            style={myStyles.gameOverImage}
                            fadeDuration={200}//optional
                        />
                    </View>
                    <View style={myStyles.resultContainer}>
                        <BodyText style={myStyles.resultText}>Your Phone needed <Text style={myStyles.highlight}>{props.roundsNum} </Text>
                        rounds to guess your number <Text style={myStyles.highlight}>{props.userSelect}</Text>
                        </BodyText>

                    </View>



                    <View style={myStyles.buttonContainer}>
                        <Btn onPress={props.onRestart} >NEW</Btn>
                        <Btn onPress={props.onReplay} >REPLAY</Btn>
                    </View>
                </Card>

            </View>

        </ScrollView>
    );
};

const myStyles = StyleSheet.create({
    screen: {
        padding: 10,
       // paddingVertical:15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
         //edit the windowHeight returned---using eventHandler for the Dimension change
        marginVertical: windowHeight < 600 ? 5 : 10,
    },

    msgContainer: {
        width: 400,
        maxWidth: '90%',
        alignItems: 'center',
        paddingHorizontal: 35,
        paddingVertical: 15,
         //edit the windowHeight returned---using eventHandler for the Dimension change
        marginTop: windowHeight < 600 ? 10 : 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        //paddingVertical: 15
    },

    imgContainer: {
         //edit the windowHeight returned---using eventHandler for the Dimension change
        width: windowWidth * 0.7,
        height: windowWidth * 0.7,
        borderRadius: windowWidth * 0.7 / 2,
        borderColor: Colors.primary,
        borderWidth: 2,
        overflow: 'hidden',
        marginHorizontal: 10,
         //edit the windowHeight returned---using eventHandler for the Dimension change
        marginVertical: windowHeight / 40,

    },

    gameOverImage: {
        width: '100%',
        height: '100%'
    },

    resultContainer: {
        marginHorizontal: 30,
         //edit the windowHeight returned---using eventHandler for the Dimension change
        marginVertical: windowHeight / 60,
    },
    resultText: {
        textAlign: 'center',
         //edit the windowHeight returned---using eventHandler for the Dimension change
        fontSize: windowHeight < 600 ? 16 : 18,
    },

    highlight: {
        color: Colors.noteColor,
        fontFamily: 'OpenSansBold',

    }
});

export default GameOverScreen;
