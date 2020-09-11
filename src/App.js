import React, { useContext, useState } from 'react';
import { MarketTable } from './components/MarketTable';
import { PairData } from './data/pairContext';

function App() {
  const { data, setApiKey } = useContext(PairData);
  const [apiFormState, setApiFormState] = useState('');

  function submitHandler(e) {
    e.preventDefault();
    setApiKey(apiFormState);
  }

  const apiForm = (
    <>
      <p>
        For starting this application you must have own API Key
        at <a href="https://xchangeapi.com/">xchangeapi.com</a>
      </p>
      <form onSubmit={submitHandler}>
        <label htmlFor="api-key">API KEY: </label>
        <input 
          id="api-key"
          type="text" 
          value={apiFormState} 
          onChange={e => setApiFormState(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </>
  )

  return (
    <>
      <h1 
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        Trade Table App
      </h1>
      {
        data.apiKey 
          ? <MarketTable/>
          : apiForm
      }
    </>
  );
}

export default App;