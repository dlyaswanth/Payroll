/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';
import Logout from './Logout';
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

function AdminEmployee()
{
    //values for adding employees
    const [name,setName]=useState('')
    const [empname,setEmpName]=useState('')
    const [address,setAddress]=useState('')
    const [basicPay,setBasicPay]=useState('')
    const [role,setRole]=useState('')
    const [password,setPassword]=useState('')
    const [mail,setMail]=useState('')
    //values for updating employees
    const [updatename,setupdateName]=useState('')

    const [updateaddress,setupdateAddress]=useState('')
    const [updatebasicPay,setupdateBasicPay]=useState('')
    const [updaterole,setupdateRole]=useState('')
    const [updatepassword,setupdatePassword]=useState('')
    const [updatemail,setupdateMail]=useState('')
    
    const [currentDetails,setCurrentDetails] = useState({})
    
    const [empDetails,setEmpDetails] = useState([])
    const[id,setId] = useState('')

    useEffect( ()=>{
            // Update the document title using the browser API
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
                
                fetch('https://payroll-fastify.herokuapp.com/api/companyEmployee/'+localStorage.getItem("company_id"), requestOptions)
                .then(response => response.json())
                .then(data => {
                    setEmpDetails(data.employee);
                    console.log(empDetails);
                })

    },[])
    

    function Search(emp_name)
    {
        console.log(emp_name);
    }

    function deleteEmployee(id){
        console.log(id);
        const requestOptions = {
            method: 'DELETE'
            // headers: { 'Content-Type': 'application/json' },
        };
            
            fetch('https://payroll-fastify.herokuapp.com/api/employee/'+id, requestOptions)
            .then(response => response.json())
            .then(data => {
                setEmpDetails(data.allEmployee);  
                toast.success('Employee Deleted',{autoClose:2500}) 
                // console.log(data.allEmployee);
            })

        console.log("deleted");

    }
    function getDetails(id){
        setId(id)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
            
            fetch('https://payroll-fastify.herokuapp.com/api/employee/'+id, requestOptions)
            .then(response => response.json())
            .then(data => {
                setupdateName(data.employeeName)
                setupdateAddress(data.employeeAddress)
                setupdateBasicPay(data.basicPay)
                setupdateRole(data.role)
                setupdatePassword(data.password)
                setupdateMail(data.employeeEmail)
                setCurrentDetails(data)
                // setEmpDetails(data.employee);
                // console.log(empDetails);
            })

    }
    const updateEmp = () =>{
        
        
        var diff = updatebasicPay - currentDetails.basicPay;
        var updatedSalary = currentDetails.salary + diff;

        console.log(diff);
        console.log(updatedSalary)

        //update route
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                companyId: localStorage.getItem("company_id"),
                employeeName:updatename,
                employeeEmail:updatemail, 
                password:updatepassword,
                employeeAddress:updateaddress,
                basicPay:updatebasicPay,
                role:updaterole,
                salary:updatedSalary
            })
        };
        
        fetch('https://payroll-fastify.herokuapp.com/api/employee/'+id, requestOptions)
        .then(response => response.json())
        .then(data => {
        if(!data.error){
            //console.log(data);
            setEmpDetails(data.allEmployee)
            toast.success('Employee Updated Successfully',{autoClose:2500})
        }
        else{
            toast.error("ERROR",{autoClose:2500})
        }
        })
        


    }
    
    const AddEmp = () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                companyId: localStorage.getItem("company_id"),
                employeeName:empname,
                employeeEmail:mail, 
                password:password,
                employeeAddress:address,
                basicPay:basicPay,
                role:role,
                salary: 0 
            })
        };
        console.log(empname,address,basicPay,role,password,mail);
        
        fetch('https://payroll-fastify.herokuapp.com/api/employee', requestOptions)
        .then(response => response.json())
        .then(data => {
        if(!data.error){
            console.log(data);
            setEmpDetails(data.allEmployee)
            toast.success('Employee Added Successfully',{autoClose:2500})
        }
        else{
            toast.error("ERROR",{autoClose:2500})
        }
        })
        
    }
    
    return (
        <div id="main">
            <ToastContainer />
            <Loader />
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
                        <button type="button" className="btn btn-primary" onClick={AddEmp} data-bs-dismiss="modal">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="card container employee">
                <div className="row" style={{marginTop:"5px",marginBottom:"5px"}}>
                    <div className="col-6 col-sm-3"><b>Employee Name</b></div>
                    <div className="col-6 col-sm-3"><b>Work Email</b></div>
                    <div className="col-6 col-sm-2"><b>Role</b></div>
                    <div className="col-6 col-sm-2"><b>Cost to Company</b></div>
                    <div className="col-6 col-sm-2  ps-3"><b>Actions</b></div>
                </div>
            </div>

            {
                empDetails.map(items=>{
                    return (
                        <div key={items["_id"]}>
                            <div className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>
                                <div className="col-6 col-sm-3 mt-2"><p>{items["employeeName"]}</p></div>
                                <div className="col-6 col-sm-3 mt-2"><p>{items["employeeEmail"]}</p></div>
                                <div className="col-6 col-sm-2 mt-2"><p>{items["role"]}</p></div>
                                <div className="col-6 col-sm-2 mt-2"><p>₹ {items["salary"]}</p></div>
                                <div className="col-6 col-sm-2 mt-2">
                                    <a className="text-dark me-4" style={{cursor:"pointer"}}  onClick={()=>getDetails(items["_id"])} data-bs-toggle="modal" data-bs-target="#updateemp">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </a>
                                    <a className="text-danger mt-2" onClick={()=>deleteEmployee(items["_id"])} style={{cursor:"pointer"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </a>
                                </div>
                                <div className="w-100 d-none d-md-block"></div>
                            </div>
                        </div>
                    )
                })
            }

            {/* model for updating employee details */}
            <div className="modal fade" id="updateemp" tabIndex="-1" aria-labelledby="updateemp" aria-hidden="true">
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
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={updatename} onChange={(event)=>{setupdateName(event.target.value)}}/>
                        </div>
                        <span>Work Email :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="far fa-envelope"></i></span>
                            <input type="email" className="form-control" placeholder="Work Email" aria-label="Username" aria-describedby="basic-addon1" value={updatemail} onChange={(event)=>{setupdateMail(event.target.value)}}/>
                        </div>
                        <span>Password :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-unlock-alt"></i></span>
                            <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" value={updatepassword} onChange={(event)=>{setupdatePassword(event.target.value)}}/>
                        </div>
                        <span>Address :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-address-card"></i></span>
                            <input type="text" className="form-control" placeholder="Address" aria-label="Username" aria-describedby="basic-addon1" value={updateaddress} onChange={(event)=>{setupdateAddress(event.target.value)}} />
                        </div>
                        <span>Basic Pay :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-rupee-sign"></i></span>
                            <input type="text" className="form-control" placeholder="Basic Pay" aria-label="Username" aria-describedby="basic-addon1" value={updatebasicPay} onChange={(event)=>{setupdateBasicPay(event.target.value)}}/>
                        </div>
                        <span>Work Role :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-user-tag"></i></span>
                            <input type="text" className="form-control" placeholder="Role" aria-label="Username" aria-describedby="basic-addon1" value={updaterole} onChange={(event)=>{setupdateRole(event.target.value)}}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={updateEmp} data-bs-dismiss="modal">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    )
}
export default AdminEmployee;