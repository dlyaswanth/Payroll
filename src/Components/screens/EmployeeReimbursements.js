/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Flag } from '@material-ui/icons';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from '../Navbar/UserNavbar'
import Logout from './Logout';
import Loader from './Loader'
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
    function checkStatus(data){
        if(data.status==="Pending"){
            return (
                <div className="col" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete">
                    <button className="btn text-danger ps-1 pe-1 pt-0 pb-1" onClick={()=>deleteEmployee(data["_id"])}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>

                
            )
        }
        else{
            return (
                <div className="col" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Disabled">
                    <button className="btn text-danger ps-1 pe-1 pt-0 pb-1" disabled>
                    <i className="fas fa-ban"></i>
                    </button>
                </div>
            )
        }
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
                addLog(JSON.parse(localStorage.getItem('employee')).employeeName+"|"+JSON.parse(localStorage.getItem('employee')).employeeEmail+"|Reimbursement Claimed|"+today);
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
                    <div className="collapse right navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                        <li className="company_name me-2">
                        <img alt=""
                                src={process.env.PUBLIC_URL + "/images/codingmart.png"}
                                width="160"
                                height="40"
                            />&nbsp;{" "}
                            
                                {/* <img className="me-2"alt="" src="data:image/png;base64,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" width="200px"/> */}

                                
                                <div className="btn-group">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Settings
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li className="settings"><Link className="dropdown-item settings" to="/">Organization Profile</Link></li>
                                        <li className="settings"><hr /></li>
                                        <li>
                      <Link className="dropdown-item settings" to="/updatepassword">
                        Update Password
                      </Link>
                    </li>
                    <hr />
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
            </nav><nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}}>
                <div className="container-fluid">
                    <b className="navbar-brand" style={{marginLeft:"50px"}}>All Claims</b>
                    <div className="d-flex">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addclaim">Add Claim</button>&nbsp;&nbsp;&nbsp;
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
                    <div className="col"><b>Claimed Type</b></div>
                    <div className="col"><b>Submitted Date</b></div>
                    <div className="col"><b>Status</b></div>
                    <div className="col"><b>Claimed Amount</b></div>
                    <div className="col"><b>Actions</b></div>
                </div>
            </div>
            {
                appliedReimbursment.length === 0
                ?
                <Loader />
                :
                appliedReimbursment.map(item=>{
                        // var Flag;
                        // if(item.status=="Approved"){
                        //  Flag="false"
                        // }
                    return(

                        <div key={item._id} className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>
                            
                            <div className="col"><p>{item.type}</p></div>
                            <div className="col"><p>{item.date}</p></div>
                            <div className="col"><p style={{color: item.status==="Approved"?"green":(item.status==="Declined"?"red":"orange")}}>
                                {item.status}</p>
                            </div>
                            <div className="col"><p>₹ {item.amount}</p></div>
                            {checkStatus(item)}
                        </div>
                    )
                }
                   
                    )
            }
            
            
        </div>
    )
}
export default EmployeeReimbursements;