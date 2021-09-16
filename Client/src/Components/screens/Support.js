import React, { useState } from "react";

import {ToastContainer,toast} from 'react-toastify'; 

import AdminHeader from "../Navbar/AdminHeader";

function Support()
{
    //let history=useHistory()
    // const [name,setName]=useState('')
    const [msg,setMsg]=useState('')
    const [file,setFile]=useState('')
    const [phone,setPhone]=useState('')
    const [date,setDate]=useState('')

    // const handleSubmitted = ({res, fields, form }) => {
    //     form.reset() // resets "username" field to "admin"
    //   }
    
    function Submit()
    {
       
        if (msg.length === 0 || file.length === 0 || phone.length === 0 || date.length === 0)
        {
            toast.error('Enter all fields',{autoClose:2500})
        }
        else
        {
            console.log(msg,file,phone,date)
            toast.success('Request Submitted',{autoClose:2500})
            setMsg('')
            setFile('')
            setPhone('')
            setDate('')
            //history.push('/home')
            // document.contact.reset();
            
        }
        
    }

    return (
        <div id="main">
            <ToastContainer />
            <AdminHeader/>
            <div className="d-block ms-5" style={{marginTop:"100px"}}>
              
                <h4>Get in Touch with us</h4> 
                <hr />
                <label className="mb-2"><b>How can we help you today ?</b></label><br />
                <div className="form-floating" style={{width:"50%",maxWidth:"600px"}}>
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height:"100px"}} onChange={(event)=>{setMsg(event.target.value)}}></textarea>
                <label>Type your message here</label>
                <div className="mt-3 mb-3">
                    <label className="form-label"><b>Attachments</b></label>
                    <input className="form-control" type="file" id="formFile" onChange={(event)=>{setFile(event.target.value)}}/>
                </div>
               
                <div className="mb-2"> <label><b>Contact Number</b></label><br/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><i className="fas fa-phone-volume"></i></span>
                    {/* <input type="number" className="form-control" placeholder="Phone Number"  aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setPhone(event.target.value)}} /> */}
                    <input
              // type="number"
              className="form-control"
              placeholder="Phone Number"
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="tel"   
              name="phone"
              maxLength="10"
              onChange={(event)=>{setPhone(event.target.value)}}
            />
                </div>
                <div className="mb-2"> <label><b>Convenient Date & time</b></label><br/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><i className="far fa-calendar-alt"></i></span>
                    <input type="datetime-local" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setDate(event.target.value)}}/>
                </div>
        
                <p>Example: 08-04-2021 09:00 A.M IST</p>
                </div>
                
                <button className="btn btn-primary mt-2 mb-4" onClick={()=>Submit()}>Submit Request</button>
            </div>
            
        </div>
    )
}
export default Support;