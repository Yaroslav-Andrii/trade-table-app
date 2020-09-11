import React, { useEffect, useRef, useState } from 'react';

export const Order = ({ data }) => {
  let ref = useRef({ ...data });
  const [
    state, 
    setState
  ] = useState({ bid: '', ask: '', symbol: 'i ask-static' });
  
  useEffect(() => {
    setState(state => {
      const newState = { ...state };

      newState.ask = comparison(ref.current.ask, data.ask);
      newState.bid = comparison(ref.current.bid, data.bid);

      newState.symbol = newState.ask === 'up' 
                          ? 'i ask-up' 
                          : newState.ask === 'down' 
                            ? 'i ask-down' 
                            : 'i ask-static';

      ref.current = data;
      return newState;
    })
  }, [data])

  useEffect(() => {
    return () => {
      ref = null;
    }
  }, []);

  return (
    <tr data-symbol={data.name}>
      <td>
        <span className="content">
          <span className={state.symbol}></span>
          {data.name}
        </span>
      </td>
      <td>
        <span className="content">
          <span className={state.bid}>{data.bid}</span>
        </span>
      </td>
      <td>
        <span className="content">
          <span className={state.ask}>{data.ask}</span>
        </span>
      </td>
    </tr>
  )
}

/* Helper function */
function comparison(prev, next) {
  if (next > prev) {
    return 'up';
  } else if (next < prev) {
    return 'down';
  } else {
    return '';
  }
}