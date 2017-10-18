/**
 * CONSTANTS
*/
const SET_URL = 'SET_URL';

/**
 * REDUCER
*/
const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_URL:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

/**
 * ACTIONS
 * - setUrl
*/
export function setUrl(url) {
  return dispatch => dispatch({
    type: SET_URL,
    payload: url
  });
}
