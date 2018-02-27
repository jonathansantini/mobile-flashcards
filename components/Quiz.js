import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Card from './Card';
import Score from './Score';
import TextButton from './TextButton';
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

  static navigationOptions = () => {
    return {
      title: 'Quiz'
    }
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
    this.props.navigation.dispatch(NavigationActions.back())
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
        <View style={{flex: 1}}>
          <Score questionNum={questionNum}
            numCorrect={numCorrect}
          />
          <TextButton style={{marginTop: 10}} onPress={() => this.backToDeck()}>
            Return
          </TextButton>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <Text>{`${index+1}/${questionNum}`}</Text>
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
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;
  const deck = state[deckId];
  const questions = deck.questions;

  return {
    questionNum: questions.length,
    questions,
  }
}

export default connect(
  mapStateToProps,
)(Quiz)