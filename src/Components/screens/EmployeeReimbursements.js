/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from '../Navbar/UserNavbar'
import Logout from './Logout';
function EmployeeReimbursements()
{
    const [reimbursment,setReimbursment]= useState([])
    const [amount,setAmount]= useState();
    const [selectedReimbursment,setSelectedReimbursment]= useState({})
    const [appliedReimbursment,setAppliedReimbursment]= useState([])

    useEffect( ()=>{
        // getting company reimbursment list
        const requestOptions1 = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
            
            fetch('https://payroll-fastify.herokuapp.com/api/companyReimbursmentList/'+localStorage.getItem("emp_company_id"), requestOptions1)
            .then(response => response.json())
            .then(data => {
                setReimbursment(data);
                console.log(reimbursment);
            })
        //getting employee's applied reimbursment
        const requestOptions2 = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
                
                fetch('https://payroll-fastify.herokuapp.com/api/employeeReimbursment/'+localStorage.getItem("employee_id"), requestOptions2)
                .then(response => response.json())
                .then(data => {
                    setAppliedReimbursment(data);
                    console.log(appliedReimbursment);
                })
        

    },[])

    function fetchOption(item){
        console.log(item);
    }
    function Search(emp_name)
    {
        console.log(emp_name);
    }
    const AddClaim = () =>{
        
        if(amount>Number(selectedReimbursment.amount)){
            console.log('hello madhan');
            toast.error("enter the valid amount",{autoClose:2000})
            return
        }

        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                employeeId : localStorage.getItem('employee_id'),
                companyId : localStorage.getItem('emp_company_id'),
                employeeName : JSON.parse(localStorage.getItem('employee')).employeeName,
                employeeEmail : JSON.parse(localStorage.getItem('employee')).employeeEmail,
                type : selectedReimbursment.type,
                status : "Pending",
                amount : amount,
                date: new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()
            })
        };
            
            fetch('https://payroll-fastify.herokuapp.com/api/reimbursment', requestOptions)
            .then(response => response.json())
            .then(data => {
                setAppliedReimbursment(data);
                console.log(data);
            })
    };

    function handleChange(e) {
            // console.log(JSON.parse(e.target.value));
            setSelectedReimbursment(JSON.parse(e.target.value));
            // console.log(selectedReimbursment)
    }
    return (
        <div id="main">
            <ToastContainer />
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
            <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}}>
                <div className="container-fluid">
                    <b className="navbar-brand" style={{marginLeft:"50px"}}>All Claims</b>
                    <div className="d-flex">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addclaim">Add Claim</button>&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-outline-secondary me-2"><i className="fas fa-filter"></i>&nbsp;Filter</button>
                    </div>
                </div>
            </nav>
            <br />
            {/* Claim Modal */}
            <div className="modal fade" id="addclaim" tabIndex="-1" aria-labelledby="addclaim" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title">New Claim</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                     <div className="modal-body">
                        <span>Reimbursement Type :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="far fa-keyboard"></i></span>
                            <select className="form-control" placeholder="Reimbursement Type" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange}>
                                <option value="select" >select</option>
                                {
                                    
                                    reimbursment.map(item=>{
                                        
                                        return (
                                           
                                                <option key={item.name} value={JSON.stringify(item)}>{item.name}</option>
                                              
                                        )
                                    })
                                }
                            
                            </select>
                        
                        </div>
                        {/* <span>Claimable Amount :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-rupee-sign"></i></span>
                            <input type="number" className="form-control " disabled placeholder="Claim Amount" value={selectedReimbursment.amount} aria-label="Username" aria-describedby="basic-addon1"/>
                        </div> */}
                        <span>Claim Amount :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-rupee-sign"></i></span>
                            <input type="number" className="form-control "  placeholder="Claim Amount"  aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setAmount(event.target.value)}}/>
                        </div>
                        <span className="text-danger">*Max Claim Allowed : ₹ {selectedReimbursment.amount}</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={AddClaim} data-bs-dismiss="modal">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="card container employee">
                <div className="row" style={{marginTop:"5px",marginBottom:"5px"}}>
                    <div className="col-6 col-sm-3"><b>Claimed Type</b></div>
                    <div className="col-6 col-sm-3"><b>Submitted Date</b></div>
                    <div className="col-6 col-sm-3"><b>Status</b></div>
                    <div className="col-6 col-sm-3"><b>Claimed Amount</b></div>
                   
                </div>
            </div>
            {
                appliedReimbursment.map(item=>{
                    return(

                        <div key={item._id} className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>
                            
                            <div className="col-6 col-sm-3"><p>{item.type}</p></div>
                            <div className="col-6 col-sm-3"><p>{item.date}</p></div>
                            <div className="col-6 col-sm-3"><p style={{color:"orange"}}>{item.status}</p></div>
                            <div className="col-6 col-sm-3"><p>₹ {item.amount}</p></div>
                            
                        </div>
                    )
                }
                   
                    )
            }
            
            
        </div>
    )
}
export default EmployeeReimbursements;