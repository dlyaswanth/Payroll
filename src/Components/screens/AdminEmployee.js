import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';
function AdminEmployee()
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
                                        <li className="settings"><hr /></li>
                                        <li><Link className="dropdown-item settings" to="/">Work Location</Link></li>
                                        <li><hr /></li>
                                        <li className="settings"><Link className="dropdown-item settings" to="/">Pay Schedule</Link></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}}>
                <div className="container-fluid">
                    <b className="navbar-brand" style={{marginLeft:"50px"}}>Active Employees</b>
                    <div className="d-flex">
                        <button className="btn btn-outline-secondary">View</button>
                        &nbsp;&nbsp;
                        <button className="btn btn-primary">Add Employee</button>
                    </div>
                </div>
            </nav>
            <br />
            <div className="card container employee">
                <div className="row" style={{marginTop:"5px",marginBottom:"5px"}}>
                    <div className="col-6 col-sm-3"><b>Employee Name</b></div>
                    <div className="col-6 col-sm-3"><b>Work Email</b></div>
                    <div className="col-6 col-sm-3"><b>Department</b></div>
                    <div className="col-6 col-sm-3"><b>Cost to Company</b></div>
                </div>
            </div>
            <div className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>
                <div className="col-6 col-sm-3"><p>User 01</p></div>
                <div className="col-6 col-sm-3"><p>user01@codingmart.com</p></div>
                <div className="col-6 col-sm-3"><p>Engineer</p></div>
                <div className="col-6 col-sm-3"><p>₹ 7,50,000</p></div>
                <div className="w-100 d-none d-md-block"></div>
            </div>
        </div>
    )
}
export default AdminEmployee;