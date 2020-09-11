import React, { useContext } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { PairData } from '../data/pairContext';

export const ContextMenuComponent = ({ 
  children, 
  contextElement, 
  inputOnFocus, 
  ordersListDispatcher 
}) => {

  const { removePair } = useContext(PairData);

  function handleClick(e, data) {
    switch (data.type) {
      case 'add':
        inputOnFocus(true);
        break;
      case 'rm':
        removePair(contextElement, ordersListDispatcher);
        break;
    
      default:
        break;
    }
  }

  return (
    <div>
      <ContextMenuTrigger id="same_unique_identifier">
        {children}
      </ContextMenuTrigger>

      <ContextMenu id="same_unique_identifier">
        <MenuItem data={{ type: 'add', contextElement }} onClick={handleClick}>
          Add new order
        </MenuItem>
        <MenuItem data={{ type: 'rm', contextElement }} onClick={handleClick}>
          Hide order
        </MenuItem>
      </ContextMenu>
    </div>
  );
}