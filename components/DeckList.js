import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextButton from './TextButton';

class DeckList extends Component {
  render() {

    const { decks, hasDecks, goToAddDeck } = this.props;

    if (hasDecks) {
      return (
        <View>
          <Text>Decks</Text>
          <Text>{JSON.stringify(decks)}</Text>
        </View>
      )
    }

    return (
      <View style={styles.center} >
        <Text>No Decks Are Available</Text>
        <TextButton style={{marginTop: 10}} onPress={goToAddDeck}>
          CLICK HERE TO ADD A NEW DECK
        </TextButton>
      </View>
    )
  }
}

export default DeckList;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});