import React, { useState } from 'react';
import AnnualEarnings from './AnnualEarnings';
import SalaryStructure from './SalaryStructure';
import Payslip from './Payslip';
import EmployeeNavbar from '../Navbar/EmployeeNavbar'

// import Earnings from '/Earnings';
export default function App() {
  const [pagination, setPagination] = useState(1);
  return (
    
    <div id="main">
      <EmployeeNavbar />
    <div  style={{marginTop:"80px"}}>
    <div className="pagination p-4 mt-5" >
        <button onClick={() => setPagination(1)} className="btn btn-dark">
          Salary Structure
        </button>
        
        <button
          onClick={() => setPagination(2)}
          className="btn btn-dark mx-3 border"
        >
         Payslip
        </button>
        
        <button
          onClick={() => setPagination(3)}
          className="btn btn-dark border"
        >
          Annual Earnings
        </button>
      
    
      </div>
      {pagination === 1 && <SalaryStructure hideStat={true} />}
      {pagination === 2 && <Payslip />}
      {pagination === 3 && <AnnualEarnings alighTable={true} />}
    </div>
    </div>
  );
}