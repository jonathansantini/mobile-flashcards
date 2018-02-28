export const DECK_STORAGE_KEY = 'MobileFlashCards:decks';

export function formatDeck ({ results, deckId }) {
  let data = JSON.parse(results);
  return { [deckId] : data[deckId] } || null;
}

export function formatDecks (decks) {
  return JSON.parse(decks)
}