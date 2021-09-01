import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
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
        fetch('https://payroll-fastify.herokuapp.com/api/CompanyEmail/'+name, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.password)
          if(password === data.password){
            toast.success(data.message,{autoClose:2500})
            history.push("/home")
          }
          else{
            toast.error(data.error,{autoClose:2500})
          }
        });
    
        //console.log(name,password)
    }
    return (
        <div>
            <ToastContainer />
            <h1>Login</h1>
            <input className="form-control me-2" type="text" placeholder="Email" aria-label="Search" onChange={(event)=>setName(event.target.value)}/>
            <input className="form-control me-2" type="password" placeholder="Password" aria-label="Search" onChange={(event)=>setPassword(event.target.value)}/>
            <button onClick={() => login()}>Login</button>

            
        </div>
    )
}
export default Loginpage;