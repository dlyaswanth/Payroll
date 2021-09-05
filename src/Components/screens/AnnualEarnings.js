import React from 'react';
import Earnings from './Earnings';
export default function AnnualEarnings() {
  const allMoney = Earnings.map(money => {
    return money.money;
  });
  const monthlyCtc = allMoney.reduce((a, b) => {
    return a + b;
  });
  const INR = money => {
    return new Intl.NumberFormat('en-IN').format(money);
  };
  return (
    <div style={{marginLeft:"80px"}}>
      <div className="container px-4">
        <div>
          <table class="table ">
            <thead>
              <tr>
                <th scope="col">Earnings</th>
                <th scope="col">Ytd Total</th>
                <th scope="col">Jan 2018</th>
                <th scope="col">Feb 2018</th>
                {/* <th scope="col">Mar 2018</th> */}
              </tr>
            </thead>
            <tbody>
              {Earnings.map(data => {
                return (
                  <tr>
                    <th className="text-secondary" scope="row">
                      {data.name}
                    </th>
                    <td>₹ {INR(data.money)}.00</td>
                    <td>₹ 220.00</td>
                    <td>₹ 0.00</td>
                    {/* <td>240</td> */}
                  </tr>
                );
              })}
              <tr>
                <th scope="row">Total Earnings</th>
                <td> ₹ {INR(monthlyCtc)}.00</td>
                <td> ₹ 1,760.00</td>
                <td> ₹ 0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}