import React, { useState } from 'react';
import AnnualEarnings from './AnnualEarnings';
import SalaryStructure from './SalaryStructure';
import {Link} from 'react-router-dom'
import UserNavbar from '../Navbar/UserNavbar'
import Logout from './Logout'
export default function UserSalary() {
  const [pagination, setPagination] = useState(0);
  return (
    <div id="main">
       <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <UserNavbar className="navbar-brand"/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse right navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                           
                            <li className="company_name me-2">
                                <button type="button" className="btn btn-outline-info" disabled aria-label="Close">
                                    Codingmart
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <div className="btn-group">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Settings
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li className="settings"><Link className="dropdown-item settings" to="/">Organization Profile</Link></li>
                                        <li className="settings"><hr /></li>
                                        <li><Link className="dropdown-item settings" to="/">Work Location</Link></li>
                                        <li><hr /></li>
                                        <li className="settings"><Link className="dropdown-item settings" to="/">Pay Schedule</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <Logout />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
      <div className="pagination p-4" style={{marginTop:"90px"}}>
        <button onClick={() => setPagination(1)} className="btn btn-dark">
          Salary Structure
        </button>
        <button
          onClick={() => setPagination(2)}
          className="btn btn-dark border mx-3"
        >
          Payslips
        </button>
        <button
          onClick={() => setPagination(3)}
          className="btn btn-dark border"
        >
          Annual Earnings
        </button>
      </div>
      {pagination === 1 && <SalaryStructure />}
      {pagination === 3 && <AnnualEarnings />}
    </div>
  );
}