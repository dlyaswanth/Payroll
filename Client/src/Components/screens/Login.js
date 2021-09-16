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
              sessionStorage.setItem('company',JSON.stringify(data))
              sessionStorage.setItem('company_id',data._id);
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
      <React.Fragment>
        <ToastContainer />
        <div className="row m-0">
          <div className="col-6 p-0">
              <div className="ms-5 container">
                <div className="ms-4 col-10  login row">
                                <img alt="" src={process.env.PUBLIC_URL + "/images/login.png"} height="400"/>
                    </div>
                </div>
          </div>
          <div className="col-6" >
              <div className="container p-0 ">
                  <div className=" text-center logininnercard row">
                      <h1 className="col-12 mt-4">Login</h1>
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
                      <p className="mb-3">Login as User <Link to="/emplogin">Click Here</Link></p>
                    </div>
              </div>
          </div>
          
        </div>
      </React.Fragment> 
    )
}
export default Loginpage;
