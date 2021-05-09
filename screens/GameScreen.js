import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    ScrollView,
    FlatList,
    Dimensions

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//run: expo install expo-screen-orientation
// use: import *  as ScreenOrientation from expo-screen-orientation 
// if this doesn't work vvv
import {ScreenOrientation} from 'expo'; 


import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import NumContainer from '../components/NumContainer';
import Card from '../components/Card';
import Btn from '../components/Btn';
import DefaultStyles from '../constants/defaultStyles';
import Colors from '../constants/colors'


//!!VERY IMPORTANT NB: ANYTHING THAT HAS TO DO WITH WIDTH OR HEIGHT AND
// WHICH DEPENDS ON DEVICE PRESENT WIDTH OR HEIGHT ACCORDING TO PRESENT ORIENTATION,
// SHOULD BE DEALT WITH USING DIMENSIONS EVENT LISTENER AND STYLING INSIDE THE COMPONENT
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const genRandBtw = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min) + min);
    if (randNum === exclude) {
        return genRandBtw(max, min, exclude)
    } else {
        return randNum;
    }
};

const renderListItem = (listLength, itemData ) => {
    return (
        <View
            style={myStyles.listItem}
        >
            <BodyText>#{listLength - itemData.index}.</BodyText>
            <BodyText>  {itemData.item}</BodyText>
        </View>
    )
};




const GameScreen = props => {
    //USED TO LOCK ORIENTATION AT ANY PARTICULAR TIME OF YOUR APP
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    //ScreenOrientation also offers method that return/gets the current orientation of the screen

    const initialGuess = genRandBtw(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);

    

    //these initial values change(on reassignment)just like state;
    // but do not re-render the component when the do change
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;
    //const [rounds, setRounds] = useState(0);


    useEffect(
        () => {
            if (currentGuess === userChoice) {
                props.onGameOver(pastGuesses.length);
            }
        }, [currentGuess, userChoice, onGameOver]
    );

    useEffect(() => {
        const updateLayout = () => {
            setWindowWidth(Dimensions.get('window').width);
            setWindowHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);
        return (() => {
            Dimensions.removeEventListener('change', updateLayout);
        });
    });

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            direction === 'greater' && currentGuess > props.userChoice) {
            Alert.alert(
                'That\'s probably untrue!',
                'Please, select the right option',
                [
                    {
                        text: 'Okay, sorry',
                        style: 'cancel',

                    }
                ]
            );
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNum = genRandBtw(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );

        setCurrentGuess(nextNum);
        setPastGuesses((thePastGuesses) => [nextNum.toString(), ...thePastGuesses]);
        //Rem: the two adjacent states are batched together therefore currentGuess 
        //isn't the actual one (ie  is != nextNum) because the re-built or re-render then, hasn't happened yet
        //{the arg name doesn't matter, it's always the current state
        // passed auto by react
        //setRounds((rounds) => rounds + 1);}
    };

    let listContainerStyle = myStyles.listContainer;

    if(windowWidth < 350){
        listContainerStyle = myStyles.listContainerBig;
    }

    if(windowHeight < 500){
        return (
            <View style={myStyles.screen}>
                <BodyText style={DefaultStyles.captionText}>Opponent's Guess</BodyText>
                
                <Card style={{...myStyles.btnContainer, ...myStyles.control}}>
                    <Btn onPress={() => nextGuessHandler('lower')} >
                        <Ionicons name='md-remove' size={26} color='white' />
                    </Btn>

                    <NumContainer>{currentGuess}</NumContainer>

                    <Btn onPress={() => nextGuessHandler('greater')} >
                        <Ionicons name='md-add' size={26} color='white' />
                    </Btn>
                </Card>
                <View style={myStyles.listContainer}>
                    {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={myStyles.list}>
                    {pastGuesses.map((guess, index) =>
                        renderListItem(guess, pastGuesses.length - index)
                    )}
                </ScrollView> */}
                    <FlatList
                        keyExtractor={(itm) => itm}
                        //item is auto passed by react i.e the key gotten by using the item itself
                        data={pastGuesses}
                        renderItem={(itemD) => renderListItem(pastGuesses.length, itemD)}
                        //itemD is itemData passed auto by react
                        contentContainerStyle={myStyles.list}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
 
        );
    }

    return (
        <View style={myStyles.screen}>
            <BodyText style={DefaultStyles.captionText}>Opponent's Guess</BodyText>
            <NumContainer>{currentGuess}</NumContainer>
            <Card style={myStyles.btnContainer}>
                <Btn onPress={() => nextGuessHandler('lower')} >
                    <Ionicons name='md-remove' size={26} color='white' />
                </Btn>
                <Btn onPress={() => nextGuessHandler('greater')} >
                    <Ionicons name='md-add' size={26} color='white' />
                </Btn>
            </Card>
            <View style={myStyles.listContainer}>
                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={myStyles.list}>
                    {pastGuesses.map((guess, index) =>
                        renderListItem(guess, pastGuesses.length - index)
                    )}
                </ScrollView> */}
                <FlatList
                    keyExtractor={(itm)=> itm}
                    //item is auto passed by react i.e the key gotten by using the item itself
                    data={pastGuesses}
                    renderItem={(itemD)=>renderListItem(pastGuesses.length, itemD)}
                    //itemD is itemData passed auto by react
                    contentContainerStyle={myStyles.list}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const myStyles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //edit the windowHeight returned---using eventHandler for the Dimension change
        marginTop: windowHeight> 600 ? 20: 5,
        width: '85%',
        maxWidth: '90%'
    },

    control:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },

    listContainer: {
         //edit the windowHeight returned---using eventHandler for the Dimension change
        width: windowWidth>350 ?'60%' : '80%',
        flex: 1,
    },

    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        
    },

    listItem: {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;
