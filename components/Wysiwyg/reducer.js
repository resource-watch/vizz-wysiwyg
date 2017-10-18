import { DEFAULT_TOOLBAR, DEFAULT_BLOCKS } from 'components/Wysiwyg/constants';

/**
 * CONSTANTS
*/
const SET_TOOLBAR = 'SET_TOOLBAR';
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

/**
 * REDUCER
*/
const initialState = {
  toolbar: DEFAULT_TOOLBAR,
  blocks: DEFAULT_BLOCKS,
  items: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOOLBAR: {
      const toolbar = { ...state.toolbar, ...action.payload };
      return Object.assign({}, state, { toolbar });
    }

    case SET_ITEMS: {
      return Object.assign({}, state, { items: action.payload });
    }

    case ADD_ITEM: {
      const item = action.payload;
      const items = [...state.items];

      items.push(item);

      return Object.assign({}, state, { items });
    }

    case UPDATE_ITEM: {
      const item = action.payload;
      const items = [...state.items];
      const index = items.findIndex(i => i.id === item.id);

      items[index] = item;

      return Object.assign({}, state, { items });
    }

    case REMOVE_ITEM: {
      const item = action.payload;
      const items = [...state.items];
      const index = items.findIndex(i => i.id === item.id);

      items.splice(index, 1);

      return Object.assign({}, state, { items });
    }
    default:
      return state;
  }
}

/**
 * ACTIONS
 * - setToolbar
 * - setItems
 * - addItem
 * - removeItem
*/
export function setToolbar(toolbar) {
  return dispatch => dispatch({
    type: SET_TOOLBAR,
    payload: toolbar
  });
}

export function setItems(items) {
  return dispatch => dispatch({
    type: SET_ITEMS,
    payload: items
  });
}

export function addItem(item) {
  return dispatch => dispatch({
    type: ADD_ITEM,
    payload: item
  });
}

export function updateItem(item) {
  return dispatch => dispatch({
    type: UPDATE_ITEM,
    payload: item
  });
}

export function removeItem(item) {
  return dispatch => dispatch({
    type: REMOVE_ITEM,
    payload: item
  });
}
