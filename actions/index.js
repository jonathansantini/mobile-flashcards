export const RECEIVE_DECK = 'RECEIVE_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';

export function receiveDeck (deck) {
  return {
    type: RECEIVE_DECK,
    deck,
  }
}

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function removeDeck (decks) {
  return {
    type: REMOVE_DECK,
    decks,
  }
}

export function addDeck (title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCard ({ deckId, question, answer }) {
  return {
    type: ADD_CARD,
    deckId,
    question,
    answer,
  }
}