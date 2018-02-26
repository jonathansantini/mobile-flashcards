import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId
    }
  }
  goToAddCard = () => {
    const { navigation, deckId } = this.props;
    navigation.navigate('AddCard', {deckId})
  }
  goToQuiz = () => {

  }
  render() {
    const { deck, cardNum } = this.props;
    const cardText = cardNum === 1 ? 'card' : 'cards';

    return (
      <View style={styles.center}>
        <Text>{deck.title}</Text>
        <Text>{`${cardNum} ${cardText}`}</Text>

        <TextButton style={{marginTop: 10}} onPress={this.goToAddCard}>
          Add Card
        </TextButton>

        <TextButton style={{marginTop: 10}} onPress={this.goToQuiz}>
          Start Quiz
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

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;
  const deck = state[deckId];
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