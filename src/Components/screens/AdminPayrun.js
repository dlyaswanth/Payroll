import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";
function AdminPayrun()
{
    const [name,setName]=useState('')
    function Search(emp_name)
    {
        console.log(emp_name);
    }
    return (
        <div id="main">
           <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <AdminNavbar className="navbar-brand"/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse right navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li>
                                <input className="form-control me-2" type="search" placeholder="Search Employee" aria-label="Search" onChange={(event)=>setName(event.target.value)}/>
                            </li>
                            <li>
                                &nbsp;
                                <button className="btn btn-outline-success"  onClick={()=>Search(name)}>Search</button>
                            </li>
                            <li className="company_name">
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
                                        <li><hr /></li>
                                        <li className="settings"><Link className="dropdown-item settings" to="/">Work Location</Link></li>
                                        <li><hr /></li>
                                        <li className="settings"><Link className="dropdown-item settings" to="/">Pay Schedule</Link></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div style={{marginTop:"120px",marginLeft:"120px"}}>
                <button className="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#summary" aria-expanded="false" aria-controls="summary">Employee Summary</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#taxes" aria-expanded="false" aria-controls="taxes">Taxes & Deductions</button>
                </div>
            <div id="summary" className="collapse multi-collapse">
                <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}} >
                <div className="container-fluid">
                    <b className="navbar-brand" style={{marginLeft:"50px"}}>Active Employees</b>
                    <div className="d-flex">
                        <button className="btn btn-primary">Import/Export</button>
                    </div>
                </div>
                </nav>
                <br />
                <div className="card container employee" >
                    <div className="row align-items-start" style={{marginTop:"5px",marginBottom:"5px"}}>
                        <div className="col"><b>Employee Name</b></div>
                        <div className="col"><b>Paid Days</b></div>
                        <div className="col"><b>Gross Pay</b></div>
                        <div className="col"><b>Deductions</b></div>
                        <div className="col"><b>Taxes</b></div>
                        <div className="col"><b>Benefits</b></div>
                        <div className="col"><b>Reimbursements</b></div>
                        <div className="col"><b>Net Pay</b></div>
                    </div>
                </div>
                <div className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>
                    <div className="col"><p>User 01</p></div>
                    <div className="col"><p>31</p></div>
                    <div className="col"><p>₹ 1,20,250.00</p></div>
                    <div className="col"><p>₹ 0.00</p></div>
                    <div className="col"><p>₹ 200.00</p></div>
                    <div className="col"><p>₹ 0.00</p></div>
                    <div className="col"><p>₹ 0.00</p></div>
                    <div className="col"><p>₹ 1,20,050.00</p></div>
                    <div className="w-100 d-none d-md-block"></div>
                </div>
            </div>
        </div>
    )
}
export default AdminPayrun;