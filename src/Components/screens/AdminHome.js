import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';
import Logout from './Logout';
function AdminHome()
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
                                        <li><hr /></li>
                                        <li className="settings"><Link className="dropdown-item settings" to="/">Work Location</Link></li>
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
            <div style={{marginTop:"110px",marginLeft:"50px"}}>
                <h3>Welcome Codesters !</h3>
                <div className="card-body">
                <b>Process Pay run</b> <span>01/01/21 to 31/12/21</span>
                <br /> <br />
                    <div className="card container" style={{height:"140px",width:"65%"}}>
                        <div className="row" style={{marginTop:"20px"}}>
                            <div className="col-6 col-sm-3"><b>Employee net pay</b></div>
                            <div className="col-6 col-sm-3"><b>Payment Date</b></div>
                            <div className="col-6 col-sm-3"><b>No of Employees</b></div>
                            <div className="w-100 d-none d-md-block"></div>
                            <div className="col-6 col-sm-3 top">₹ 4,50,450.00</div>
                            <div className="col-6 col-sm-3 top">02/02/2021</div>
                            <div className="col-6 col-sm-3 top">10</div>
                            <button className="btn btn-primary view">View Details</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                <b>Deduction Summary</b>
                <br /> <br />
                    <div className="card container" style={{height:"140px",width:"65%"}}>
                        <div className="row" style={{marginTop:"20px"}}>
                            <div className="col-6 col-sm-3"><b>EPF</b></div>
                            <div className="col-6 col-sm-3"><b>ESI</b></div>
                            <div className="col-6 col-sm-3"><b>TDS Deduction</b></div>
                            <div className="col-6 col-sm-3"><b>Active Employees</b></div>
                            <div className="w-100 d-none d-md-block"></div>
                            <div className="col-6 col-sm-3 top">-</div>
                            <div className="col-6 col-sm-3 top">-</div>
                            <div className="col-6 col-sm-3 top">-</div>
                            <div className="col-6 col-sm-3 top">20</div>
                            <div className="w-100 d-none d-md-block"></div>
                            <div className="col-6 col-sm-3 pointer top">View Details</div>
                            <div className="col-6 col-sm-3 pointer top">View Details</div>
                            <div className="col-6 col-sm-3 pointer top">View Details</div>
                            <div className="col-6 col-sm-3 pointer top">View Employees</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminHome;