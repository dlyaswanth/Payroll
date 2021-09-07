/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
// import CryptoJS from 'crypto-js';
export let value =false;
function EmpLoginpage()
{
    // let history = useHistory();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    const[name,setName] = useState('')
    const[password,setPassword] = useState('')
    function login(){
        toast.info('Please Wait !',{autoClose:2500})
        fetch('https://payroll-fastify.herokuapp.com/api/employeeEmail/'+name, requestOptions)
        .then(response => response.json())
        .then(data => {
        

          if(password === data.password){
            toast.success(data.message,{autoClose:2500})
            value=true;
            window.open("/emphome","_self")
            data.password=undefined;
            localStorage.setItem('employee',JSON.stringify(data));
            localStorage.setItem('employee_id',data._id);
            localStorage.setItem('emp_company_id',data.companyId);
          }
          else{
            toast.error(data.error,{autoClose:2500})
          }
        });
        //console.log(name,password)
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height:"500px"}}>
            <ToastContainer />
            <div className="container text-center row border border-secondary p-5 mt-5" style={{width:"30%",height:"70%"}}>
              <h1 className="col-12 mb-4">Employee Login</h1>
              <div className="col-12">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className="far fa-envelope"></i></span>
                <input className="form-control" type="text" placeholder="Email" aria-label="Search" onChange={(event)=>setName(event.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className="fas fa-unlock-alt"></i></span>
                <input className="form-control" type="password" placeholder="Password" aria-label="Search" onChange={(event)=>setPassword(event.target.value)}/>
              </div>
                <div className="text-center"><button className="btn btn-primary mb-3" onClick={() => login()}>Login</button></div>
              </div>
              <p>Login as Admin <a href="/login">Click Here</a></p>
            </div>
        </div>
    )
}
export default EmpLoginpage;
