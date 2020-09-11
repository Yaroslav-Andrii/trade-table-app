import React, { useEffect, useState, useRef } from 'react';

/* Order hook */
export const useOrders = setConnection => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setConnection(setOrders);
  }, []);

  return { orders, setOrders };
}

/* Input hook */
export const useInputInFocus = blurCb => {
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

  const inputForm = (
    <input 
      ref={ref} 
      onBlur={blurCb} 
      type="text" 
      value={inputValue} 
      onChange={handleInputChange}
    />
  )

  return { inputValue, inputForm, setInputValue };
}

/* Context menu hook */
export const useOrderInContextMenu = rootTag => {
  const [inContext, setInContext] = useState('');
  const contextMenuHandler = event => {
    let target = event.target;
    
    while (target.tagName !== rootTag) {
      target = target.parentElement;
    }
    
    setInContext(target.dataset.symbol ? target.dataset.symbol : '');
  }

  return { inContext, contextMenuHandler };
}