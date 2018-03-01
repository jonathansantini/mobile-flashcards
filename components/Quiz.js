import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Card from './Card';
import Score from './Score';
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'
import { getDeck } from "../utils/api";
import { receiveDeck } from "../actions";
import { NavigationActions } from "react-navigation";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      numCorrect: 0,
    }
  }

  static navigationOptions = {
    title: 'Quiz'
  }

  handleCorrectAnswer() {
    this.setState(prevState => ({
      index: prevState.index + 1,
      numCorrect: prevState.numCorrect + 1,
    }))
  }

  handleIncorrectAnswer() {
    this.setState(prevState => ({
      index: prevState.index + 1,
    }))
  }

  backToDeck = () => {
    const { navigation, deckId } = this.props;
      navigation.dispatch(NavigationActions.back({routeName: "Deck"}));

    clearLocalNotification()
      .then(setLocalNotification)
  }

  restartQuiz = () => {
    this.setState({
      index: 0,
      numCorrect: 0,
    })

    clearLocalNotification()
      .then(setLocalNotification)
  }

  componentDidMount() {
    //const { deckId, dispatch } = this.props;
    //getDeck(deckId)
    //  .then((deck) => dispatch(receiveDeck(deck)))
  }

  render() {
    const { questionNum, questions } = this.props;
    const { index, numCorrect } = this.state;

    if ( index >= questionNum) {
      return (
        <Score questionNum={questionNum}
          numCorrect={numCorrect}
          backToDeck={this.backToDeck}
          restartQuiz={this.restartQuiz}
        />
      )
    }

    return (
      <View style={{flex: 1}}>
        <Text style={styles.counter}>{`${index+1}/${questionNum}`}</Text>
        <Card question={questions[index]}
          handleCorrectAnswer={() => this.handleCorrectAnswer()}
          handleIncorrectAnswer={() => this.handleIncorrectAnswer()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    padding: 5,
    fontSize: 16,
  }
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;
  const deck = state[deckId];
  const questions = deck.questions;

  return {
    deckId,
    questionNum: questions.length,
    questions,
  }
}

export default connect(
  mapStateToProps,
)(Quiz)