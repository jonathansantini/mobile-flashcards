import { RECEIVE_DECK, RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions'

function decks (state = {}, action) {
  const { type, deck, decks, title, deckId, question, answer } = action;
  switch (type) {
    case RECEIVE_DECK :
      return {
        ...state,
        ...deck,
      }
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
    case REMOVE_DECK :
      return {
        ...decks
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