import { AsyncStorage } from 'react-native';
import { formatDeck, formatDecks, DECK_STORAGE_KEY } from './_decks'

export function getDecks () {
  //AsyncStorage.clear();
  //console.log(AsyncStorage.getItem(DECK_STORAGE_KEY))
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatDecks)
}

export function getDeck (deckId) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => formatDeck({results, deckId}))
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {title}
  }))
}

export function addCardToDeck ({ deckId, question, answer }) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      let data = JSON.parse(results);
      const newQuestion = { question, answer };
      data[deckId]['questions'] = data[deckId].questions || [];
      data[deckId]['questions'].push(newQuestion);
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(data));
    })
}