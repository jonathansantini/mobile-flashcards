import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { black } from "../utils/colors";

/**
 * Functional component used to display the deck list item UI.
 * @extends React
 */
function DeckListItem (props) {
  const { deck, goToDeck } = props;
  const cardNum = deck.questions ? deck.questions.length : 0;
  const cardText = cardNum === 1 ? 'card' : 'cards';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deck}
        onPress={() => goToDeck(deck.title)}
      >
        <Text style={styles.title}>{deck.title}</Text>
        <Text>{`${cardNum} ${cardText}`}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: black,
  },
  deck: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    alignItems: 'center',
  }
});

DeckListItem.propTypes = {
  deck: PropTypes.object.isRequired,
  goToDeck: PropTypes.func.isRequired,
}

export default DeckListItem;
