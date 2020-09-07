import React from 'react';
import { Order } from './Order';
import '../market-watch.png';

export const MarketTable = () => {
  return (
    <div className="tables-box">
      <table>
        <thead>
          <tr>
            <th><span className="content">Symbol</span></th>
            <th><span className="content">Bid</span></th>
            <th><span className="content">Ask</span></th>
          </tr>
        </thead>
        <tbody>
          {mockData.map(i => <Order key={i.id} data={i}/>)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <span className="content">
                <span className="i add"></span>
                add...
              </span>
            </td>
            <td>
              <span className="content">
                21/133
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

const mockData = [
  {id: 1, symbol: 'USDEUR', bid: 16.00005, ask: 17.00001},
  {id: 2, symbol: 'USDEUR', bid: 16.00005, ask: 17.00001},
  {id: 3, symbol: 'USDEUR', bid: 16.00005, ask: 17.00001},
  {id: 4, symbol: 'USDEUR', bid: 16.00005, ask: 17.00001},
  {id: 5, symbol: 'USDEUR', bid: 16.00005, ask: 17.00001},
]