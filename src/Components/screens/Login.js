/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
import {Link} from 'react-router-dom'
export let value =false;
function Loginpage()
{
    let history = useHistory();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    const[name,setName] = useState('')
    const[password,setPassword] = useState('')
    function login(){
        toast.info('Please Wait !',{autoClose:2500})
        fetch('https://payroll-fastify.herokuapp.com/api/companyEmail/'+name, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.password !== undefined ){
            var bytes = CryptoJS.AES.decrypt(data.password, 'my-secret-key@123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // //log decrypted Data
            // console.log('decrypted Data -')
            //   console.log(decryptedData);

            if(password === decryptedData){
              toast.success(data.message,{autoClose:2500})
              value=true;
              window.open("/home","_self")
              data.password=undefined;
              localStorage.setItem('company',JSON.stringify(data))
              localStorage.setItem('company_id',data._id);
            }
            else{
              toast.error(data.error,{autoClose:2500})
            }
          }
          else
          {
            toast.error("Email Not Found",{autoClose:2500})
          }   
        });
        //console.log(name,password)
    }
    return (
        <div className="d-flex justify-content-center align-items-center " style={{height:"600px"}}>
            <ToastContainer />
            <div className="container text-center row border border-secondary p-5 mt-5 logininnercard" style={{width:"30%",height:"80%"}}>
              <h1 className="col-12 mb-4">Login</h1>
              <div className="col-12">
              <div className="input-group mb-3 logincard">
                <span className="input-group-text" id="basic-addon1"><i className="far fa-envelope"></i></span>
                <input className="form-control" type="text" placeholder="Email" aria-label="Search" onChange={(event)=>setName(event.target.value)}/>
              </div>
              <div className="input-group mb-3 logincard">
                <span className="input-group-text" id="basic-addon1"><i className="fas fa-unlock-alt"></i></span>
                <input className="form-control" type="password" placeholder="Password" aria-label="Search" onChange={(event)=>setPassword(event.target.value)}/>
              </div>
                <div className="text-center"><button className="btn btn-primary mb-3" onClick={() => login()}>Login</button></div>
              </div>
              <p>Login as User <Link to="/emplogin">Click Here</Link></p>
            </div>
        </div>
    )
}
export default Loginpage;
