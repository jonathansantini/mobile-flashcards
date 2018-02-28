import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { removeDeckTitle } from "../utils/api";
import { removeDeck } from "../actions/index";
import { blue, yellow, black, red } from '../utils/colors';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId
    }
  }

  toAddCard = () => {
    const { navigation, deckId } = this.props;
    navigation.navigate('AddCard', {deckId})
  }

  toQuiz = () => {
    const { navigation, deckId } = this.props;
    navigation.navigate('Quiz', {deckId})
  }

  handleRemoveDeck = () => {
    const { navigation, deckId, dispatch } = this.props;
    removeDeckTitle(deckId)
      .then((decks) => dispatch(removeDeck(decks)))
      .then(() => navigation.popToTop({ key: "Decks"}))
  }

  render() {
    const { deck, cardNum } = this.props;
    const cardText = cardNum === 1 ? 'card' : 'cards';

    return (
      <View style={styles.center}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.info}>{`${cardNum} ${cardText}`}</Text>

        <TextButton style={styles.addBtn} onPress={this.toAddCard}>
          Add Card
        </TextButton>

        <TextButton style={styles.startBtn}
          onPress={this.toQuiz}
          disabled={ cardNum ? false : true }
        >
          Start Quiz
        </TextButton>

        <TextButton style={styles.deleteBtn}
          onPress={() => this.handleRemoveDeck()}
        >
          Delete Deck
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
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  info: {
    marginBottom: 12,
  },
  addBtn: {
    backgroundColor: blue,
  },
  startBtn: {
    color: black,
    backgroundColor: yellow,
    marginTop: 10,
  },
  deleteBtn: {
    backgroundColor: red,
    marginTop: 10,
  }
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;
  const deck = state[deckId] || {};
  const cardNum = deck && deck.questions ? deck.questions.length : 0;

  return {
    deck,
    deckId,
    cardNum,
  }
}

export default connect(
  mapStateToProps,
)(Deck)