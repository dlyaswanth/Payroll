import React, { useState } from 'react';
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
function Demo()
{
    const [options,setOptions]=useState([])
    var finalValues=[]
    const [name,setName]=useState('')
    const [type,setType]=useState('')
    const [rupee,setRupee]=useState('')
    var newopt1={};
    function checkhandler(options)
    {
        options["opted"]=!options["opted"]
        if (options["opted"] === true)
            finalValues.push({"type":options.type,"name":options.name,"amount":options.amount});
        // finalValues.push(options[0])
        else if (options["opted"] === false)
        {
            finalValues.splice(finalValues.indexOf(options["name"]),1)
            console.log()
        }
    }
    function onSave(){
        console.log(finalValues);

         //api integration
         const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              reimbursmentArray:finalValues,
              logArray: ["Your Company has joined in Payroll"]
            })
        };
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), requestOptions)
            .then(console.log(localStorage.getItem('company_id')))
            .then(response => response.json())
            .then(data=>{
                if (!data)
                toast.error("error",{autoClose:2500})
                else
                {
                    toast.success(data.message,{autoClose:2500})
                   // history.push('/salary');
                }
            })
            
    //         //api integration

    }

    function reset(){
        setName("");
        setType("");
        setRupee("");
    }

    function add()
    {   
        newopt1["name"]=name
        newopt1["type"]=type
        newopt1["amount"]=rupee
        newopt1["opted"]=false
        setOptions([...options,newopt1])
        console.log(finalValues);
        console.log(name,type,rupee);
        reset();
        // newopt1[0]=newopt
        // newopt1[1]=name
        // newopt1[2]=type
        // setOptions([...options,newopt1])
        // console.log(finalValues);
        // console.log(ctype,rupee,pay);
    }
    return(
        <div >
           <ToastContainer />
            <div style={{marginLeft:"10%"}}>
            <div className="row row1">
                <div className="col-6 col-sm-4"><b>Name</b></div>
                <div className="col-6 col-sm-4"><b>Type</b></div>
                <div className="col-6 col-sm-4"><b>Amount</b></div>
                <div className="w-100 d-none d-md-block"></div>
                <div className="w-100 d-none d-md-block"></div>
            
            
            {
                options.map(items=>{
                    return (
                        <>
                        <br />
                            <div className="col-6 col-sm-4">
                            <input type="checkbox" value={items["name"]} name={items["name"]} style={{cursor:"pointer"}} onChange={()=>checkhandler(items)}/>
                            <span style={{color:"dodgerblue",cursor:"pointer"}}>&nbsp;{items["name"]}</span>
                            </div>
                            <div className="col-6 col-sm-4">{items["type"]}</div>
                            <div className="col-6 col-sm-4">{items["amount"]}</div>
                            <div className="w-100 d-none d-md-block"></div>
                        </>
                    )
                })
            }
             <br />
            <button className="btn btn4 btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{maxWidth:"120px !important"}}><i className="fas fa-plus-circle"></i>&nbsp;New Reimbursements</button>
            </div>
            <br />
            <button className="btn btn-primary" onClick={()=>onSave()}>
                    Save
                </button>
            
            <br /><br />
            <br />
           
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New Reimbursement</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>reset()}></button>
                    </div>
                    <div className="modal-body">
                        <label>Reimbursement Name : </label>
                        <br/>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={name} onChange={(event)=>setName(event.target.value)}  autoFocus/>
                        </div>
                        <label>Reimbursement Type : </label>
                        <br/>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={type} onChange={(event)=>setType(event.target.value)}  />
                        </div>
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
                        <button type="button" className="btn btn-outline-success" onClick={()=>add()} >Add New</button>
                        <button type="button" className="btn btn-oultine-secondary" data-bs-dismiss="modal" onClick={()=>reset()}>Close</button>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    )
}
export default Demo;