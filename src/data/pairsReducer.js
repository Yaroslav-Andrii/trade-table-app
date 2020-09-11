import { SET_API_KEY, ADD_PAIR, REMOVE_PAIR } from "./type";
import { defaultPairs } from "./pairs";

const handlers = {
  DEFAULT: state => state,
  [SET_API_KEY]: (state, action) => ({ ...state, apiKey: action.payload }),
  [ADD_PAIR]: (state, action) => ({ 
    ...state, 
    pairs: [...state.pairs, action.payload] 
  }),
  [REMOVE_PAIR]: (state, action) => ({ 
    ...state, 
    pairs: state.pairs.filter(i => i !== action.payload)
  }),
}

export const pairsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
}

/* Helper functions */
export const getInitialState = () => {
  const initialState = {};

  if ( localStorage.getItem('pairs') ) {
    initialState.pairs = JSON.parse( localStorage.getItem('pairs') ); 
  } else {
    initialState.pairs = defaultPairs;
    localStorage.setItem('pairs', JSON.stringify(defaultPairs));
  }

  if ( localStorage.getItem('apiKey') ) {
    initialState.apiKey = localStorage.getItem('apiKey');
  } else {
    initialState.apiKey = '';
  }
  
  return initialState;
}