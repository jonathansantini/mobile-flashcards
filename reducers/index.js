import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks (state = {}, action) {
  const { type, decks, title, deckId, question, answer } = action;
  switch (type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [title]: {
          title
        }
      }
    case ADD_CARD:
      let questions = state[deckId].questions || [];
      questions.push({ question, answer });
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions,
        }
      }
    default :
      return state
  }
}

export default decks;