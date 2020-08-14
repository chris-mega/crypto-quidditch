import { createStore } from 'redux'
import { CHANGE_ALL, UPDATE_OWNED, UPDATE_MARKET, } from './playerActions';
const initialState = {
  marketPlayers: [],
  myPlayers: [],
}
function players(state = initialState, action) {
  switch(action.type) {
    case CHANGE_ALL:
      return {
        marketPlayers: action.marketPlayers,
        myPlayers: action.myPlayers,
      };
    case UPDATE_OWNED:
      return {
        ...state,
        myPlayers: action.myPlayers,
      };
    case UPDATE_MARKET:
      return {
        ...state,
        marketPlayers: action.marketPlayers,
      };
    default:
      return state;
  }
}

const store = createStore(players);
export default store;
