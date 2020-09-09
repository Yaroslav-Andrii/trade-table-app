import React, { useEffect, useState, useContext, useRef } from 'react';
import { Order } from './Order';
import { ContextMenuComponent } from './ContextMenuComponent';
import { PairData } from '../data/pairContext';
import { maxCombination } from '../data/pairs';
import '../market-watch.png';

export const MarketTable = () => {
  const {setConnection, addNewPair} = useContext(PairData);
  const [isInput, setIsInput] = useState(false);

  const {orders, setOrders} = useOrders(setConnection);
  const {inputValue, inputForm, setInputValue} = useInputInFocus(e => setIsInput(false));
  
  const handleSubmit = e => {
    e.preventDefault();
    addNewPair(inputValue);
    setInputValue('');
    setIsInput(false);
  }

  const [inContext, setInContext] = useState('');
  function contextMenuHandler(e) {
    let target = e.target;
    
    while (target.tagName !== 'TR') {
      target = target.parentElement;
    }
    
    setInContext(target.dataset.symbol ? target.dataset.symbol : '');
  }
 
  return (
    <div className="tables-box">
      <ContextMenuComponent 
        contextElement={inContext} 
        inputOnFocus={setIsInput}
        ordersListDispatcher={setOrders}
      >
      <table>
        <thead>
          <tr>
            <th><span className="content">Symbol</span></th>
            <th><span className="content">Bid</span></th>
            <th><span className="content">Ask</span></th>
          </tr>
        </thead>
        <tbody onContextMenu={contextMenuHandler}>
          {
            orders.length
              ? orders.map(i => <Order key={i.name} data={i}/>)
              : null
          }
        </tbody>
        <tfoot>
          {
            isInput 
              ? 
                <tr>
                  <td colSpan="3">
                    <span className="i add"></span>
                      <form onSubmit={handleSubmit}>
                        {inputForm}
                      </form>
                  </td>
                </tr>
              :
                <tr onClick={e => setIsInput(true)}>
                  <td colSpan="2">
                    <span className="content">
                      <span className="i add"></span>
                      click to add...
                    </span>
                  </td>
                  <td>
                    <span className="content">
                      {`${orders.length}/${maxCombination}`} 
                    </span>
                  </td>
                </tr>
          }
        </tfoot>
      </table>
      </ContextMenuComponent>
    </div>
  )
}

/* Local custom hooks */
function useOrders(setConnection) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setConnection(setOrders);
  }, []);

  return {orders, setOrders};
}

function useInputInFocus(blurCb) {
  let ref = useRef();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    ref.current && ref.current.focus();
  });

  useEffect(() => {
    return () => {
      ref = null;
    }
  }, [])

  const handleInputChange = e => {
    setInputValue(e.target.value);
  }

  const inputStyles = {
    float: 'right',
    width: '96%'
  }

  const inputForm = (
    <input 
      ref={ref} 
      onBlur={blurCb} 
      style={inputStyles} 
      type="text" 
      value={inputValue} 
      onChange={handleInputChange}
    />
  )

  return {inputValue, inputForm, setInputValue};
}