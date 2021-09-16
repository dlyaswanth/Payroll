/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'
import CryptoJS from 'crypto-js';
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
          if (data.password !== undefined)
          {
            var bytes = CryptoJS.AES.decrypt(data.password, 'my-secret-key@123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            if(password === decryptedData){
              toast.success(data.message,{autoClose:2500})
              value=true;
              //history.push('/emphome')
              window.open("/emphome","_self")
              data.password=undefined;
              sessionStorage.setItem('employee',JSON.stringify(data));
              sessionStorage.setItem('employee_id',data._id);
              sessionStorage.setItem('emp_company_id',data.companyId);
            }
            else{
              toast.error(data.error,{autoClose:2500})
            }
          }
          else
          {
            toast.error("Try again",{autoClose:2500})
          }   
        });
        //console.log(name,password)
    }
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="row m-0">
          <div className="col-6 p-0">
              <div className="container">
                <div className="emplogin row ">
                                <img alt="" src={process.env.PUBLIC_URL + "/images/company.png"} />
                    </div>
                </div>
          </div>
          <div className="col-6" >
              <div className="container p-0 ">
                  <div className=" text-center logininnercard row">
                      <h1 className="col-12 mt-4">Employee Login</h1>
                      <div className="col-12">
                          <div className="input-group logincard">
                            <span className="input-group-text" id="basic-addon1"><i className="far fa-envelope"></i></span>
                            <input className="form-control" type="text" placeholder="Email" aria-label="Search" onChange={(event)=>setName(event.target.value)}/>
                          </div>
                          <div className="input-group my-3 logincard">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-unlock-alt"></i></span>
                            <input className="form-control" type="password" placeholder="Password" aria-label="Search" onChange={(event)=>setPassword(event.target.value)}/>
                          </div>
                            <div className="text-center mt-5"><button className="btn btn-info w-25" onClick={() => login()}>Login</button></div>
                      </div>
                      <p>Login as Admin <Link to="/login">Click Here</Link></p>
                    </div>
              </div>
          </div>
          
        </div>
      </React.Fragment> 
    )
}
export default EmpLoginpage;
