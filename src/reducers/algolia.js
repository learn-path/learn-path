import { AIS_KEY_RECEIVED, AIS_KEY_REQUEST } from "../actions/algolia";

export function algoliaReducer(state = {}, action) {
  switch (action.type) {
    case AIS_KEY_REQUEST:
      return Object.assign({}, state, {
        keyState: "REQUESTING",
        userId: action.userId
      });
    case AIS_KEY_RECEIVED:
      return Object.assign({}, state, {
        keyState: "REQUESTED",
        key: action.key
      });
    default:
      return state;
  }
}
