import React, { useContext, useState } from 'react';
import { MarketTable } from './components/MarketTable';
import { PairData } from './data/pairContext';

function App() {
  const {data, setApiKey} = useContext(PairData);
  const [apiFormState, setApiFormState] = useState('');

  function submitHandler(e) {
    e.preventDefault();
    setApiKey(apiFormState);
  }

  const apiForm = (
    <form onSubmit={submitHandler}>
      <input type="text" value={apiFormState} onChange={e => setApiFormState(e.target.value)}/>
      <button type="submit">Save</button>
    </form>
  )

  return (
    <>
      <h1>App</h1>
      {
        data.apiKey 
          ? <MarketTable/>
          : apiForm
      }
    </>
  );
}

export default App;