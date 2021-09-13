/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from 'react';

import AdminHeader from '../Navbar/AdminHeader';
import Loader from './Loader';
    
function AdminReimbursements()
{
    const [appliedReimbursment,setAppliedReimbursment]= useState([])
    const [records,setRecords]=useState('')
    const [hidden,setHidden]=useState(false)

    
    useEffect(  ()=>{
        //getting company's applied reimbursment
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        
        fetch('https://payroll-fastify.herokuapp.com/api/companyReimbursment/'+localStorage.getItem("company_id"), requestOptions)
            .then(response => response.json())
            .then(data => {
                if(!data.error){
                    setAppliedReimbursment(data);
                    console.log(appliedReimbursment);
                }
            })
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

 

    //Log details Function
    function addLog(message){
        
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), {method: 'GET', headers: { 'Content-Type': 'application/json' }})
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
                
                fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), requestOptions)
                .then(response => response.json())
                .then(res=>{
                    console.log(res);
                })
            }
        })
    }
    //end
    function approve(reimbursmentId){
        console.log(reimbursmentId)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status : "Approved",
            })
        };
            
            fetch('https://payroll-fastify.herokuapp.com/api/reimbursment/'+reimbursmentId, requestOptions)
            .then(response => response.json())
            .then(data => { 
                if(!data.error){
                    console.log(data);
                    setAppliedReimbursment(data.reimbursment);
                    var today= new Date();
                    today=today.toString()
                    today = today.substring(4,today.length-30);
                    console.log(today);
                    addLog(data.updatedreimbursment.employeeName+"|"+data.updatedreimbursment.employeeEmail+"|Reimbursment Approved by Company|"+today);
                }
                
            })
    }

    function decline(reimbursmentId){
        console.log(reimbursmentId)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status : "Declined",
            })
        };
            
            fetch('https://payroll-fastify.herokuapp.com/api/reimbursment/'+reimbursmentId, requestOptions)
            .then(response => response.json())
            .then(data => { 
                if(!data.error){
                    setAppliedReimbursment(data.reimbursment);
                    var today= new Date();
                    today=today.toString()
                    today = today.substring(4,today.length-30);
                    console.log(today);
                    addLog(data.updatedreimbursment.employeeName+"|"+data.updatedreimbursment.employeeEmail+"|Reimbursment Declined by Company|"+today);
                    console.log(data);
                }
            })
    }

   function check(item){
       if(item.status === "Pending"){
           return(

                <div id="button" className="text-center col-6 col-sm-2">
                    <button style={{background:"none",border:"none",padding:"none"}} onClick={()=>approve(item._id)} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Approve">
                        <i className="fas fa-check-circle fa-2x text-success"></i>
                    </button>
                    <button style={{background:"none",border:"none",padding:"none"}} onClick={()=>decline(item._id)} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Decline">
                        <i className="fas fa-times-circle fa-2x text-danger"></i>
                    </button>
                </div>
           )
       }
       else if(item.status === "Approved"){
        return(
                <div id="button" className="text-center col-6 col-sm-2">
                    <button className="btn btn-success text-white w-50" disabled onClick={()=>approve(item._id)}>Approved</button>
                </div>
       )
       }
       else if(item.status === "Declined"){
        return(
            <div id="button" className="text-center col-6 col-sm-2">
                <button className=" btn btn-danger text-white w-50" disabled onClick={()=>decline(item._id)}>Declined</button>
            </div>
            )
       }
                
   }

    // function Search(emp_name)
    // {
    //     console.log(emp_name);
    // }
    return (
        <div id="main">
           <AdminHeader/>
            <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}}>
                <div className="container-fluid">
                    <b className="navbar-brand" style={{marginLeft:"50px"}}>All Claims</b>
                        {/* <div className="d-flex">
                            
                            <button className="btn btn-outline-secondary"><i className="fas fa-filter"></i>&nbsp;Filter</button>
                        </div> */}
                </div>
            </nav>
            <br />
            <div className="card container employee">
                <div className="row" style={{marginTop:"5px",marginBottom:"5px"}}>
                    <div className="text-center col-6 col-sm-2"><b>Employee Name</b></div>
                    <div className="text-center col-6 col-sm-2"><b>Employee Email</b></div>
                    <div className="text-center col-6 col-sm-2"><b>Type</b></div>
                    <div className="text-center col-6 col-sm-2"><b>Submitted Date</b></div>
                    {/* <div className="text-center col-6 col-sm-1"><b>Status</b></div> */}
                    <div className="text-center col-6 col-sm-2"><b>Claim Amount</b></div>
                    <div className="text-center col-6 col-sm-2"><b>Approve/Decline</b></div>
                   
                </div>
            </div>
            {
                appliedReimbursment.length === 0 
                ?
                <div>
                <div hidden={hidden}>
                    <Loader/>
                </div>
                <div hidden>{setTimeout(()=>{setRecords('No Records found');setHidden(true)},5000)}</div>
                <div className="text-center" style={{marginTop:"40px"}}><b>{records}</b></div>
                </div>
                :
                appliedReimbursment.map(item=>{
                    return(
                        <div key={item._id} className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>
                            <div className="text-center col-6 col-sm-2"><p>{item.employeeName}</p></div>
                            <div className="text-center col-6 col-sm-2"><p>{item.employeeEmail}</p></div>
                            <div className="text-center col-6 col-sm-2"><p>{item.type}</p></div>
                            <div className="text-center col-6 col-sm-2"><p>{item.date}</p></div>
                            {/* <div className="text-center col-6 col-sm-1"><p style={{color:"orange"}}>{item.status}</p></div> */}
                            <div className="text-center col-6 col-sm-2"><p>₹ {item.amount}</p></div>
                            {check(item)}
                    
                                    
                            <div className="w-100 d-none d-md-block"></div>
                            
                        </div>
                    )
                })
            }
            
            
        </div>
    )
}
export default AdminReimbursements;