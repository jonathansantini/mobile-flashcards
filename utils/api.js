import { AsyncStorage } from 'react-native';
import { formatDecks, DECK_STORAGE_KEY } from './_decks'

export function getDecks () {
  //AsyncStorage.clear();
  //console.log(AsyncStorage.getItem(DECK_STORAGE_KEY))
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatDecks)
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {title}
  }))
}