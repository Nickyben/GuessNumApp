import React, { useState } from 'react';
import { 
  StyleSheet,
   Text, 
   View,
  SafeAreaView,
} from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo';

import Header from './components/Header';
import BodyText from './components/BodyText';
import TitleText from './components/TitleText';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


//used to load the fonts
const fetchFonts = () => {
  return Font.loadAsync(
    {
      'OpenSansRegular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSansBold': require('./assets/fonts/OpenSans-Bold.ttf'),
    }
  );
};



export default function App() {
  const [userNum, setUserNum] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  if (!dataIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish = {()=>setDataIsLoaded(true)}
        onError={(err)=> console.log(err)}
      />);
  }

  const restartGameHandler = () => {
    setGuessRounds(0);
    setUserNum(null);
  };

  const replayGameHandler = () => {
    setGuessRounds(0);
  };


  const startGameHandler = (selectedNum) => {
    setUserNum(selectedNum);

  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (userNum && guessRounds <= 0) {
    content = (
      <GameScreen
        userChoice={userNum}
        onGameOver={gameOverHandler} />);

  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNum={guessRounds}
        userSelect={userNum}
        onRestart={restartGameHandler}
        onReplay={replayGameHandler}
      />);
  }
  return (
    <SafeAreaView style={myStyles.screen}>
      <Header title="Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

const myStyles = StyleSheet.create({
  screen: {
    flex: 1,

  }
});
