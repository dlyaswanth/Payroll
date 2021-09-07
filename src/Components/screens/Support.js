import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";
import {ToastContainer,toast} from 'react-toastify'; 
import Logout from './Logout';
function Support()
{
    //let history=useHistory()
    const [name,setName]=useState('')
    const [msg,setMsg]=useState('')
    const [file,setFile]=useState('')
    const [phone,setPhone]=useState('')
    const [date,setDate]=useState('')
    function Search(emp_name)
    {
        console.log(emp_name);
    }
    function Submit()
    {
        if (msg.length === 0 || file.length === 0 || phone.length === 0 || date.length === 0)
        {
            toast.error('Enter all fields',{autoClose:2500})
            alert('Enter All details')
        }
        else
        {
            toast.success('Request Submitted',{autoClose:2500})
            alert('Request Submitted')
            //history.push('/home')
        }
    }
    return (
        <div id="main">
            <ToastContainer />
            <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <AdminNavbar className="navbar-brand"/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse right navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li>
                                <input className="form-control me-2" type="search" placeholder="Search Employee" aria-label="Search" onChange={(event)=>setName(event.target.value)}/>
                            </li>
                            <li>
                                &nbsp;
                                <button className="btn btn-outline-success"  onClick={()=>Search(name)}>Search</button>
                            </li>
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
            <div style={{marginTop:"90px",marginLeft:"120px"}}>
                <h4>Get in Touch with us</h4> 
                <hr />
                <button type="button" className="btn btn-outline-secondary" disabled aria-label="Close">
                    Contact Support
                </button>
                <br /> <br />
                <label><b>How can we help you today ?</b></label><br />
                <div className="form-floating" style={{width:"50%",maxWidth:"600px"}}>
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height:"100px"}} onChange={(event)=>{setMsg(event.target.value)}}></textarea>
                <label>Type your message here</label>
                <br/>
                <div className="mb-3">
                    <label className="form-label"><b>Attachments</b></label>
                    <input className="form-control" type="file" id="formFile" onChange={(event)=>{setFile(event.target.value)}}/>
                </div>
               
                <div> <label><b>Contact Number</b></label><br/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><i className="fas fa-phone-volume"></i></span>
                    <input type="tel" className="form-control" placeholder="Phone Number" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setPhone(event.target.value)}} />
                </div>
                <div> <label><b>Convenient Date & time</b></label><br/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><i className="far fa-calendar-alt"></i></span>
                    <input type="datetime-local" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setDate(event.target.value)}}/>
                </div>
                <p>Example: 08-04-2021 09:00 A.M IST</p>
                </div>
                <button className="btn btn-primary" onClick={()=>Submit()}>Submit Request</button>
            </div>
        </div>
    )
}
export default Support;