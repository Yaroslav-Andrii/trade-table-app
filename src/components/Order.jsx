import React from 'react';

export const Order = ({data}) => {

  return (
    <tr>
      <td><span className="content"><span className="i ask-up"></span>{data.symbol}</span></td>
      <td><span className="content">{data.bid}</span></td>
      <td><span className="content">{data.ask}</span></td>
    </tr>
  )
}