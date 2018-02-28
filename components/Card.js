import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextButton from './TextButton';
import { yellow, black, red } from '../utils/colors';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
    }
  }

  toggleCard() {
    this.setState(prevState => ({
      showAnswer: prevState.showAnswer ? false : true,
    }))
  }

  render() {
    const { question, handleCorrectAnswer, handleIncorrectAnswer } = this.props;
    const { showAnswer } = this.state;

    return (
      <View style={styles.center}>
        { !showAnswer
          ? <Text style={styles.question}>{question.question}</Text>
          : <Text style={styles.answer}>{question.answer}</Text>
        }

        <TouchableOpacity style={styles.toggle} onPress={() => this.toggleCard()}>
          { !showAnswer
            ? <Text>Show Answer</Text>
            : <Text>Show Question</Text>
          }
        </TouchableOpacity>

        <TextButton style={styles.correctBtn} onPress={() => handleCorrectAnswer()}>
          Correct
        </TextButton>

        <TextButton style={styles.incorrectBtn} onPress={() => handleIncorrectAnswer()}>
          Incorrect
        </TextButton>
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
  question: {
    fontSize: 20,
    marginBottom: 15,
  },
  answer: {
    fontSize: 20,
    marginBottom: 15,
  },
  toggle: {
    marginBottom: 25,
  },
  correctBtn: {
    marginTop: 10,
    backgroundColor: yellow,
    color: black,
  },
  incorrectBtn: {
    marginTop: 10,
    backgroundColor: red,
  }
});

export default Card;