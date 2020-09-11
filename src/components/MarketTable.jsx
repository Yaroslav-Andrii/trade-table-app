import React, { useState, useContext } from 'react';

/* Custom hooks */
import { 
  useInputInFocus, 
  useOrderInContextMenu, 
  useOrders
} from '../hooks/marketTable.hooks';

/* Components */
import { Order } from './Order';
import { ContextMenuComponent } from './ContextMenuComponent';

/* Data */
import { PairData } from '../data/pairContext';
import { maxCombination } from '../data/pairs';
import '../market-watch.png';

export const MarketTable = () => {
  /* Manage which order is in context menu */
  const { inContext, contextMenuHandler } = useOrderInContextMenu('TR');

  /* Orders pairs data controller */
  const { setConnection, addNewPair } = useContext(PairData);
  const { orders, setOrders } = useOrders(setConnection);

  /* Input controller */
  const [isInput, setIsInput] = useState(false);
  const {
    inputValue, 
    inputForm, 
    setInputValue
  } = useInputInFocus(event => setIsInput(false));
  
  const handleSubmit = event => {
    event.preventDefault();

    /* Add new order pair */
    addNewPair(inputValue);

    /* Reset input view */
    setInputValue('');
    setIsInput(false);
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