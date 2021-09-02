import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';
import Logout from './Logout';
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
function AdminEmployee()
{
    const [name,setName]=useState('')
    const [empname,setEmpName]=useState('')
    const [address,setAddress]=useState('')
    const [basicPay,setBasicPay]=useState('')
    const [role,setRole]=useState('')
    const [password,setPassword]=useState('')
    const [mail,setMail]=useState('')
    function Search(emp_name)
    {
        console.log(emp_name);
    }
    function AddEmp()
    {
        toast.success('Employee Added Successfully',{autoClose:2500})
        console.log(empname,address,basicPay,role,password,mail);
    }
    return (
        <div id="main">
            <ToastContainer />
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
            <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}}>
                <div className="container-fluid">
                    <b className="navbar-brand" style={{marginLeft:"50px"}}>Active Employees</b>
                    <div className="d-flex">
                        <button className="btn btn-outline-secondary">View</button>
                        &nbsp;&nbsp;
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addemp">Add Employee</button>
                    </div>
                </div>
            </nav>
            <br />
            <div className="modal fade" id="addemp" tabIndex="-1" aria-labelledby="addemp" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">New Employee</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <span>Name : </span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-user-circle"></i></span>
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setEmpName(event.target.value)}}/>
                        </div>
                        <span>Work Email :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="far fa-envelope"></i></span>
                            <input type="email" className="form-control" placeholder="Work Email" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setMail(event.target.value)}}/>
                        </div>
                        <span>Password :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-unlock-alt"></i></span>
                            <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setPassword(event.target.value)}}/>
                        </div>
                        <span>Address :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-address-card"></i></span>
                            <input type="text" className="form-control" placeholder="Address" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setAddress(event.target.value)}} />
                        </div>
                        <span>Basic Pay :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-rupee-sign"></i></span>
                            <input type="text" className="form-control" placeholder="Basic Pay" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setBasicPay(event.target.value)}}/>
                        </div>
                        <span>Work Role :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-user-tag"></i></span>
                            <input type="text" className="form-control" placeholder="Role" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setRole(event.target.value)}}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>AddEmp()} data-bs-dismiss="modal">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
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