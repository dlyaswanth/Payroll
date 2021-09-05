import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Earnings from './Earnings';
export default function SalaryStructure() {
  const data = useState({
    name: 'React',
    data: {
      datasets: [
        {
          data: [55629.0, 904.0, 1800.0],
          backgroundColor: ['cyan', 'purple', 'orange']
        }
      ],
      labels: ['Earnings', 'Reimburstments', 'Dedection']
    }
  });
  const Reimburstments = [
    {
      name: 'Medical Reimburstments',
      money: 220
    },
    {
      name: 'Leave Travel Allowance',
      money: 22
    }
  ];
  const FlexibleComponent = [
    {
      name: 'Fuel Reimburstments',
      money: 220
    },
    {
      name: 'Driver Reimburstments',
      money: 220
    },
    {
      name: 'Telephone Reimburstments',
      money: 222
    }
  ];
  const Deduction = [
    {
      name: 'PF Empolyer Contribution',
      money: 1800
    }
  ];
  const arr = data[0].data.datasets[0].data;
  const sum = arr.reduce((a, b) => {
    return a + b;
  });
  const yearlyCtc = Math.round(sum * 12);
  const INR =money=>{return (new Intl.NumberFormat('en-IN').format(money))};
  return (
    <div>
      <div className="details">
        <h2>Monthly CTC : ₹{INR(sum)}.00</h2>
        <h3 style={{ color: 'grey' }}>Yearly CTC : ₹ {INR(yearlyCtc)}.00</h3>
      </div>

      <Doughnut
        className="docs"
        data={data[0].data}
        // weight={70}
        // height={76}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            display: true,
            position: 'left'
          }
        }}
      />
      <div className="container mb-3" style={{marginLeft:"80px"}}>
        <h4>Earnings</h4>
        {Earnings.map(earning => {
          return (
            <div className="d-flex justify-content-between">
              <div className="name mb-1">{earning.name}</div>
              <div className="amount mb-1">₹ {INR(earning.money)}.00</div>
            </div>
          );
        })}
      </div>
      <div className="container" style={{marginLeft:"80px"}}>
        <h4>Reimburstments</h4>
        {Reimburstments.map(earning => {
          return (
            <div className="d-flex justify-content-between">
              <div className="name mb-1">{earning.name}</div>
              <div className="amount mb-1">₹{INR(earning.money)}.00</div>
            </div>
          );
        })}
      </div>
      <div className="container mt-3" style={{marginLeft:"80px"}}>
        <h4>Flexible Benefit Plan Components</h4>
        {FlexibleComponent.map(earning => {
          return (
            <div className="d-flex justify-content-between">
              <div className="name mb-1">{earning.name}</div>
              <div className="amount mb-1">₹ {INR(earning.money)}.00</div>
            </div>
          );
        })}
      </div>
      <div className="container mt-3" style={{marginLeft:"80px"}}>
        <h4>Deduction</h4>
        {Deduction.map(earning => {
          return (
            <div className="d-flex justify-content-between">
              <div className="name">{earning.name}</div>
              <div className="amount">₹ {INR(earning.money)}.00</div>
            </div>
          );
        })}
        <hr />
        <div className="d-flex justify-content-end" >
          <h6>Monthly CTC : ₹ {INR(sum)}.00</h6>
        </div>
        <hr />
      </div>
    </div>
  );
}