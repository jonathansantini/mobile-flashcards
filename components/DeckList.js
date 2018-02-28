import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextButton from './TextButton';
import Deck from './DeckListItem';

class DeckList extends Component {
  render() {
    const { decks, hasDecks, toDeck, toAddDeck } = this.props;

    if (hasDecks) {
      return (
        <ScrollView>
          { Object.keys(decks).map((deck) => (
            <Deck key={deck}
              deck={decks[deck]}
              goToDeck={toDeck}
            />
          ))}
        </ScrollView>
      )
    }

    return (
      <View style={styles.center} >
        <Text>No Decks Are Available</Text>
        <TextButton style={{marginTop: 10}} onPress={toAddDeck}>
          CLICK HERE TO ADD A NEW DECK
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

export default DeckList;