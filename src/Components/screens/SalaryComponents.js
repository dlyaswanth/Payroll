import React, { useState } from 'react';
import SideBar from "./SideBar";
import Demo from './Reimbursements';
import {useHistory} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
function SalaryComponents()
{
    let history=useHistory();
    const [options,setOptions]=useState([])
    var finalValues=[]
    const [newopt,setNewopt]=useState('')
    const [name,setName]=useState('')
    const [pay,setPay]=useState('')
    const [type,setType]=useState('')
   // const [ctype,setCtype]=useState('')
    const [rupee,setRupee]=useState('')
    var newopt1={};
    function checkhandler(options)
    {
        options["opted"]=!options["opted"]
        if (options["opted"] === true)
            finalValues.push({"type":options.type,"name":options.name,"payType":options.payType,
                             "amount":options.amount});
        // finalValues.push(options[0])
        else if (options["opted"] === false)
        {
            finalValues.splice(finalValues.indexOf(options["name"]),1)
            console.log()
        }
    }
    function handelType(value)
    {
        setType(value);
    }
    // function handelCType(value)
    // {
    //     setCtype(value)
    // }
    function onSave(){
        console.log(finalValues);

         //api integration
         const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                   earningsDocArray:finalValues
            })
        };
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('companyId'), requestOptions)
            .then(console.log(localStorage.getItem('companyId')))
            .then(response => response.json())
            .then(data=>{
                if (!data)
                toast.error("ERROR",{autoClose:2500})
                else
                {
                    toast.success(data.message,{autoClose:2500})
                    //history.push('/login');
                }
            })
            //api integration

    }
    function reset(){
        setNewopt("");
        setName("");
        setType("");
        setPay("");
        setRupee("");
        //setCtype("");
    }

    function add()
    {   
        newopt1["type"]=newopt
        newopt1["name"]=name
        newopt1["payType"]=type
        newopt1["opted"]=false
        newopt1["amount"]=rupee
        setOptions([...options,newopt1])
        console.log(finalValues);
        console.log(type,rupee,pay);
        reset();
        
    }
    function proceed()
    {
        history.push('/login')
    }
    return(
        <div >
            <SideBar />
            <ToastContainer />
            <button className="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{marginTop:"50px",marginLeft:"20px"}}>
                Earnings
            </button>
            <button className="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1" style={{marginTop:"50px",marginLeft:"20px"}}>
                Reimbursements
            </button>
            <br /><br /><br />
            <div id="collapseExample1" className="collapse" style={{marginLeft:"25%",width:"50%"}}>
            <Demo />
            </div>
           <div style={{marginLeft:"25%",width:"50%"}}>
            <div id="collapseExample" className="collapse">
            <div className="row row1">
                <div className="col-6 col-sm-4"><b>Name</b></div>
                <div className="col-6 col-sm-4"><b>Earings Type</b></div>
                <div className="col-6 col-sm-4"><b>Calculations Type</b></div>
                <div className="w-100 d-none d-md-block"></div>
                <div className="w-100 d-none d-md-block"></div>
            
            
            {
                options.map(items=>{
                    return (
                        <>
                        <br />
                            <div className="col-6 col-sm-4">
                            <input type="checkbox" value={items["type"]} name={items["type"]}  style={{cursor:"pointer"}} onChange={()=>checkhandler(items)}/>
                            <span style={{color:"dodgerblue",cursor:"pointer"}}>&nbsp;{items["type"]}</span>
                            </div>
                            <div className="col-6 col-sm-4">{items["name"]}</div>
                            <div className="col-6 col-sm-4">{items["payType"]}</div>
                            <div className="w-100 d-none d-md-block"></div>
                        </>
                    )
                })
            }
             <br />
            <button className="btn btn4 btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{maxWidth:"120px !important"}}><i className="fas fa-plus-circle"></i>&nbsp;New Earnings</button>
            </div>
            <br />
            <button className="btn btn-primary" onClick={()=>onSave()}>
                    Save
                </button>
            
            <br />
            <br />
            
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New Earnings</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>reset()}></button>
                    </div>
                    <div className="modal-body">
                        <label>Earning Type : </label>
                        <br/>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={newopt} onChange={(event)=>setNewopt(event.target.value)}  autoFocus/>
                        </div>
                        <label>Earning Name : </label>
                        <br/>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={name} onChange={(event)=>setName(event.target.value)}  />
                        </div>
                        <label>Name in Pay Slip : </label>
                        <br/>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={pay} onChange={(event)=>setPay(event.target.value)}  />
                        </div>
                        <label>Pay type : </label>
                        <br/><br/>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={()=>handelType("Fixed")} value="Fixed"/>
                            <label className="form-check-label" >
                                <b>Fixed Pay</b> (Fixed amount paid at the end of the month)
                            </label>
                        </div>
                        <div className="form-check"><br/>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={()=>handelType("Variable")} value="Variable"/>
                            <label className="form-check-label" >
                                <b>Variable Pay</b> (Variable amount paid at any payroll)
                            </label>
                        </div><br/>
                        {/* <label>Calculation type : </label><br/>
                        <br/>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" value={ctype} onClick={()=>handelCType("Flat Amount")}/>
                            <label className="form-check-label" >
                                <b>Flat Amount</b> 
                            </label>
                        </div><br/>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault2"  value={newopt} onClick={()=>handelCType("Percentage Amount")}/>
                            <label className="form-check-label" >
                                <b>Percentage of basic</b>
                            </label>
                        </div> */}
                        <label>Enter Amount : </label><br/>
                        <br/>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">₹</span>
                           <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={rupee} onChange={(event)=>setRupee(event.target.value)}  />
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span style={{color:"red"}}>Note : You will not be able to edit the salary component once you associate with an employee
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-outline-success"onClick={()=>add()} >Add New</button>
                        <button type="button" className="btn btn-oultine-secondary" data-bs-dismiss="modal" onClick={()=>reset()}>Close</button>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
                <button className="btn btn-outline-success" onClick={()=>proceed()} style={{marginLeft:"30px"}}>Proceed</button>
            </div>
    )
}
export default SalaryComponents;