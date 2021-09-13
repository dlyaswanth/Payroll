/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react';
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import EmployeeNavbar from '../Navbar/EmployeeNavbar'

import Loader from './Loader'
function EmployeeReimbursements()
{
    const [reimbursment,setReimbursment]= useState([])
    const [amount,setAmount]= useState();
    const [selectedReimbursment,setSelectedReimbursment]= useState({})
    const [appliedReimbursment,setAppliedReimbursment]= useState([])
    const [records,setRecords]=useState('')
    const [hidden,setHidden]=useState(false)

    useEffect( ()=>{
        // getting company reimbursment list
        const requestOptions1 = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
            
            fetch('https://payroll-fastify.herokuapp.com/api/companyReimbursmentList/'+localStorage.getItem("emp_company_id"), requestOptions1)
            .then(response => response.json())
            .then(data => {
                if(!data.error){
                    setReimbursment(data);
                    console.log(reimbursment);
                }
            })
        //getting employee's applied reimbursment
        const requestOptions2 = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
                
                fetch('https://payroll-fastify.herokuapp.com/api/employeeReimbursment/'+localStorage.getItem("employee_id"), requestOptions2)
                .then(response => response.json())
                .then(data => {
                    if(!data.error){
                        setAppliedReimbursment(data);
                        console.log(appliedReimbursment);
                    }
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
                if(!data.error){
                    console.log(data);
                    setAppliedReimbursment(data.reimbursment);  
                    var today= new Date();
                    today=today.toString()
                    today = today.substring(4,today.length-30);
                    addLog(data.deletedreimbursment.employeeName+"|"+data.deletedreimbursment.employeeEmail+"|Reimbursment Deleted|"+today);
                    toast.success('Reimbursment Deleted',{autoClose:2500}) 
                    // console.log(data.allEmployee);
                }
                else{
                    toast.error(data.error,{autoClose:2000})
                }
            })

        console.log("deleted");

    }
    //end
    //log function
    function addLog(message){
    
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('emp_company_id'), {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then(data =>{
            if(!data.error){
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
            }
        })
    }
    //end
    function reset(){
        document.getElementById('reimbType').selectedIndex = 0;
        document.getElementById('amount').value = 0;
        setSelectedReimbursment({})
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
                if(!data.error){
                    setAppliedReimbursment(data);
                    console.log(data);
                    var today= new Date();
                    today=today.toString()
                    today = today.substring(4,today.length-30);
                    console.log(today);
                    addLog(JSON.parse(localStorage.getItem('employee')).employeeName+"|"+JSON.parse(localStorage.getItem('employee')).employeeEmail+"|Reimbursement Claimed|"+today);
                    console.log(data);
                }
            })
        reset()
    };
    function handleChange(e) {
            setSelectedReimbursment(JSON.parse(e.target.value));
    }
    return (
        <div id="main">
            <ToastContainer />
            <EmployeeNavbar />
           <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}}>
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
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>reset()}></button>
                         </div>
                     <div className="modal-body">
                        <span>Reimbursement Type :</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><i className="far fa-keyboard"></i></span>
                            <select className="form-control" id="reimbType" placeholder="Reimbursement Type" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange}>
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
                            <input type="number" className="form-control "  id="amount" placeholder="Claim Amount"  aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setAmount(event.target.value)}}/>
                        </div>
                        <span className="text-danger">*Max Claim Allowed : ₹ {selectedReimbursment.amount}</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={reset}>Close</button>
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
                <div>
                <div hidden={hidden}>
                    <Loader/>
                </div>
                <div hidden>{setTimeout(()=>{setRecords('No Records found');setHidden(true)},3000)}</div>
                <div className="text-center" style={{marginTop:"40px"}}><b>{records}</b></div>
                </div>
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