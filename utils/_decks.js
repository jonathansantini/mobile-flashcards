export const DECK_STORAGE_KEY = 'MobileFlashCards:decks';

export function createNewDeck (title) {
  console.log(title)
  const data = {};
  data[title] = {
    title,
    questions: []
  }
  return JSON.stringify(data);
}

export function formatDeck ({ results, deckId }) {
  let data = JSON.parse(results);
  return { [deckId] : data[deckId] } || null;
}

export function formatDecks (decks) {
  return JSON.parse(decks)
}