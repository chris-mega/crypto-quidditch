export const CHANGE_ALL = 'CHANGE_ALL_PLAYERS';
export const UPDATE_OWNED = 'UPDATE_OWNED_PLAYERS';
export const UPDATE_MARKET = 'UPDATE_MARKET_PLAYERS';

export function changeAllPlayers(list) {
  var all = [];
  var own = [];
  for(var player of list){
    if(player.owned)
      own.push(player);
    else
      all.push(player);
  }
  return {
    type: CHANGE_ALL,
    marketPlayers: all,
    myPlayers: own,
  };
}

export function updateOwned(list) {
  return {
    type: UPDATE_OWNED,
    myPlayers: list,
  };
}

export function updateMarket(list) {
  return {
    type: UPDATE_OWNED,
    marketPlayers: list,
  };
}
