import React, { useState, useEffect } from 'react';


export default function AnnualEarnings() {
  
  const INR = money => {
    return new Intl.NumberFormat('en-IN').format(money);
  };

  const [earnings,setEarnings]=useState([])
  
  var earningAmount = 0;

  var employee = JSON.parse(localStorage.getItem('employee'));

  useEffect(()=>{
    //fetching earnings doc array from company
    const requestOptions1 = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
      
    fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem("emp_company_id"), requestOptions1)
        .then(response => response.json())
        .then(data => {
          if(!data.error){
            setEarnings(data.earningsDocArray);
          }
        })
    },[])

    function calculteEarning(){
      earnings.forEach((earning) => { 
        earningAmount += Number(earning.amount) 
      })
    }

  return (
    <div style={{marginLeft:"50px"}}>
      {calculteEarning()}
      <div className="container px-4">
        <div>
          <table className="table ">
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
              <tr>
                <th className="text-secondary" scope="row">
                  Basic
                </th>
                <td className="text-end">₹ {INR(Number(employee.basicPay)*12)}.00</td>
                <td className="text-end">₹ {INR(Number(employee.basicPay))}.00</td>
                <td className="text-end">₹ {INR(Number(employee.basicPay))}.00</td>
              </tr>
              {earnings.map((data,index) => {
                return (
                  <tr key={index}>
                    <th className="text-secondary" scope="row">
                      {data.name}
                    </th>
                    <td className="text-end">₹ {INR(Number(data.amount)*12)}.00</td>
                    <td className="text-end">₹ {INR(Number(data.amount))}.00</td>
                    <td className="text-end">₹ {INR(Number(data.amount))}.00</td>
                    {/* <td>240</td> */}
                  </tr>
                );
              })}
              <tr>
                <th scope="row">Total Earnings</th>
                <td className="text-end"> ₹ {INR((earningAmount + Number(employee.basicPay))*12)}.00</td>
                <td className="text-end"> ₹ {INR(earningAmount + Number(employee.basicPay))}.00</td>
                <td className="text-end"> ₹ {INR(earningAmount + Number(employee.basicPay))}.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}