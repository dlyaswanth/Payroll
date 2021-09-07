/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Flag } from '@material-ui/icons';
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    //delete function
       function deleteEmployee(id){
        console.log(id);
        const requestOptions = {
            method: 'DELETE'
        };   
            fetch('https://payroll-fastify.herokuapp.com/api/reimbursment/'+id, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAppliedReimbursment(data.reimbursment);  
                var today= new Date();
                today=today.toString()
                today = today.substring(4,today.length-30);
                addLog(data.deletedreimbursment.employeeName+"|"+data.deletedreimbursment.employeeEmail+"|Reimbursment Deleted|"+today);
                toast.success('Reimbursment Deleted',{autoClose:2500}) 
                // console.log(data.allEmployee);
            })

        console.log("deleted");

    }
    //end
    //log function
    function addLog(message){
    
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('emp_company_id'), {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then(data =>{
            var currentLog = data.logArray;
            currentLog.push(message);

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    logArray:currentLog
                })
            };
            
            fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('emp_company_id'), requestOptions)
            .then(response => response.json())
            .then(res=>{
                console.log(res);
            })
        })
    }
    //end
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
        //Date parsing
        var today = new Date();
        today = String(today.getDate()).padStart(2, '0') + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + today.getFullYear();
        
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
                date: today
            })
        };
            
            fetch('https://payroll-fastify.herokuapp.com/api/reimbursment', requestOptions)
            .then(response => response.json())
            .then(data => {
                setAppliedReimbursment(data);
                console.log(data);
                var today= new Date();
                today=today.toString()
                today = today.substring(4,today.length-30);
                console.log(today);
                addLog(JSON.parse(localStorage.getItem('employee')).employeeName+"|"+
                    JSON.parse(localStorage.getItem('employee')).employeeEmail+"|Reimbursement Claimed|"+today);
                console.log(data);
            })
    };

    function handleChange(e) {
            setSelectedReimbursment(JSON.parse(e.target.value));
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
                    <div className="col-6 col-sm-2"><b>Status</b></div>
                    <div className="col-6 col-sm-2"><b>Claimed Amount</b></div>
                    <div className="col-6 col-sm-1 text-center"><b>Actions</b></div>
                </div>
            </div>
            {
                appliedReimbursment.map(item=>{
                        // var Flag;
                        // if(item.status=="Approved"){
                        //  Flag="false"
                        // }
                    return(

                        <div key={item._id} className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>
                            
                            <div className="col-6 col-sm-3"><p>{item.type}</p></div>
                            <div className="col-6 col-sm-3"><p>{item.date}</p></div>
                            <div className="col-6 col-sm-2"><p style={{color:"orange"}}>{item.status}</p></div>
                            <div className="col-6 col-sm-2"><p>₹ {item.amount}</p></div>
                            <button className=" col-6 col-sm-1 text-danger text-center" onClick={()=>deleteEmployee(item["_id"])} style={{cursor:"pointer",padding:"0px",border:"none",background:"none",marginTop:"-15px"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                            </button>
                        </div>
                    )
                }
                   
                    )
            }
            
            
        </div>
    )
}
export default EmployeeReimbursements;