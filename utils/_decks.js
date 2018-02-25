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

export function formatDecks (decks) {
  return JSON.parse(decks)
}