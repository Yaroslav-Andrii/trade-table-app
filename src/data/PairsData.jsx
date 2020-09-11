import React, { useReducer, useRef } from 'react';
import { PairData } from './pairContext';
import { ADD_PAIR, REMOVE_PAIR, SET_API_KEY } from './type';
import { pairsReducer, getInitialState } from './pairsReducer';
import LiveWebSocket from './LiveWebSocket';
import { wscb, classcb } from './wsActions';
import { pairsKeys } from './pairs';

export const PairsData = ({ children }) => {
  const [data, dispatch] = useReducer(pairsReducer, getInitialState());
  const connection = useRef();

  const setApiKey = apiKey => {
    localStorage.setItem('apiKey', apiKey);

    dispatch({
      type: SET_API_KEY,
      payload: apiKey
    });
  }

  const setConnection = dispatcher => {
    connection.current = new LiveWebSocket(
        `wss://api.xchangeapi.com/websocket/live?api-key=${data.apiKey}`, 
        wscb, 
        classcb, 
        { dispatcher }
      );

    connection.current.start(data.pairs);
  }

  const addNewPair = pairStr => {
    const cleanPairStr = pairStr.toUpperCase().trim();
    
    const firstKey = cleanPairStr.slice(0, 3);
    const secondKey =  cleanPairStr.slice(3);

    /* Pair string validation */
    if (pairStr.length !== 6) {
      console.log('String is not correct');
      return;
    }

    if (!pairsKeys.includes(firstKey) || !pairsKeys.includes(secondKey)) {
      console.log('String is not correct');
      return;
    }

    if ( firstKey === secondKey ) {
      console.log('String is not correct');
      return;
    }

    if ( data.pairs.includes(cleanPairStr) ) {
      console.log('The pair already exist');
      return;
    }
    /* End of pair string validation */

    const pairsArr = JSON.parse( localStorage.getItem('pairs') );

    /* Update localStorage */
    pairsArr.push(cleanPairStr);
    localStorage.setItem('pairs', JSON.stringify(pairsArr));

    /* Restart web socket connection with new paris list */
    connection.current.wsClose();
    connection.current.start(pairsArr);

    /* Dispatch action to pairsReducer */
    dispatch({
      type: ADD_PAIR,
      payload: cleanPairStr
    });
  }

  const removePair = (pairSymbol, ordersListDispatcher) => {
    const parisJson = localStorage.getItem('pairs');
    const newPairsArr = JSON.parse(parisJson).filter(i => i !== pairSymbol);

    /* Update localStorage */
    localStorage.setItem('pairs', JSON.stringify(newPairsArr));

    ordersListDispatcher(state => state.filter(i => i.name !== pairSymbol));

    /* Restart web socket connection with new paris list */
    connection.current.wsClose();
    connection.current.start(newPairsArr);

    /* Dispatch action to pairsReducer */
    dispatch({
      type: REMOVE_PAIR,
      payload: pairSymbol
    });
  }

  return (
    <PairData.Provider 
      value={{
        setApiKey,
        setConnection,
        addNewPair,
        removePair,
        data
      }}
    >
      {children}
    </PairData.Provider>
  )
}