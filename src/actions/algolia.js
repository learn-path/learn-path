import { config } from "../config/config";

export const AIS_KEY_REQUEST = "AIS_KEY_REQUEST";
function requestKey(uid) {
  return {
    type: AIS_KEY_REQUEST,
    userId: uid
  };
}

export const AIS_KEY_RECEIVED = "AIS_KEY_RECEIVED";
function receiveKey(key) {
  return {
    type: AIS_KEY_RECEIVED,
    key: key
  };
}

function getSearchKey(user) {
  return function(dispatch) {
    //Inform the app state that we are requesting the user key
    dispatch(requestKey(user.uid));
    return user
      .getIdToken()
      .then(function(token) {
        // The token is then passed to our getSearchKey Cloud Function
        return fetch(
          `https://us-central1-${
            config.firebase.projectId
          }.cloudfunctions.net/getSearchKey/`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
      })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        dispatch(receiveKey(json.key));
      });
  };
}

export function getSearchKeyIfUserChanged(user) {
  return (dispatch, getState) => {
    if (getState().algolia.userId !== user.uid) {
      return dispatch(getSearchKey(user));
    } else {
      return Promise.resolve();
    }
  };
}
