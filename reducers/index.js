import { RECEIVE_DECKS, ADD_DECK } from '../actions'

function decks (state = {}, action) {
  const { type, decks, title } = action;
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
    default :
      return state
  }
}

export default decks;