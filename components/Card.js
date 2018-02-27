import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextButton from './TextButton';

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
          ? <Text>{question.question}</Text>
          : <Text>{question.answer}</Text>
        }

        <TouchableOpacity onPress={() => this.toggleCard()}>
          { !showAnswer
            ? <Text>Show Answer</Text>
            : <Text>Show Question</Text>
          }
        </TouchableOpacity>

        <TextButton style={{marginTop: 10}} onPress={() => handleCorrectAnswer()}>
          Correct
        </TextButton>

        <TextButton style={{marginTop: 10}} onPress={() => handleIncorrectAnswer()}>
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
});

export default Card;