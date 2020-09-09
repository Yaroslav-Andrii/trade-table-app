import React, { useReducer, useRef } from 'react';
import { PairData } from './pairContext';
import { ADD_PAIR, REMOVE_PAIR, SET_API_KEY } from './type';
import { pairsReducer, getInitialState } from './pairsReducer';
import LiveWebSocket from './LiveWebSocket';
import { wscb, classcb } from './wsActions';
import { pairsKyes } from './pairs';

export const PairsData = ({children}) => {
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
        {dispatcher}
      );

    connection.current.start(data.pairs);
  }

  const addNewPair = pairStr => {
    pairStr = pairStr.toUpperCase().trim();

    if (pairStr.length !== 6) {
      console.log('String is not correct');
      return;
    }

    if ( !pairsKyes.includes(pairStr.slice(0, 3)) || !pairsKyes.includes(pairStr.slice(3)) ) {
      console.log('String is not correct');
      return;
    }

    if ( pairStr.slice(0, 3) === pairStr.slice(3) ) {
      console.log('String is not correct');
      return;
    }

    if ( data.pairs.includes(pairStr) ) {
      console.log('The pair already exist');
      return;
    }

    const pairsArr = JSON.parse(localStorage.getItem('pairs'));

    pairsArr.push(pairStr);
    localStorage.setItem('pairs', JSON.stringify(pairsArr));

    connection.current.wsClose();
    connection.current.start(pairsArr);

    dispatch({
      type: ADD_PAIR,
      payload: pairStr
    });
  }

  const removePair = (pairSymbol, ordersListDispatcher) => {
    const pairsArr = JSON.parse(localStorage.getItem('pairs')).filter(item => item !== pairSymbol);
    localStorage.setItem('pairs', JSON.stringify(pairsArr));

    connection.current.wsClose();

    ordersListDispatcher(state => state.filter(i => i.name !== pairSymbol));

    connection.current.start(pairsArr);

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