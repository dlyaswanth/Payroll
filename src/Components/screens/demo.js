import React, { useState } from 'react';

function Demo()
{
    const [options,setOptions]=useState([])
    var finalValues=[]
    const [newopt,setNewopt]=useState('')
    const [name,setName]=useState('')
    const [type,setType]=useState('')
    const [rupee,setRupee]=useState('')
    var newopt1={};
    function checkhandler(options)
    {
        options[3]=!options[3]
        if (options[3] === true)
        finalValues.push(options)
        // finalValues.push(options[0])
        else if (options[3] === false)
        {
            finalValues.splice(finalValues.indexOf(options[0]),1)
            console.log()
        }
    }
    function onSave(){
        console.log(finalValues);

        var today= new Date();
        today=today.toString()
        today = today.substring(4,today.length-30);
        var log = "-|-|Your Company has joined in Payroll|"+today;

         //api integration
         const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              reimbursmentArray:finalValues,
              logArray: [log]
            })
        };
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), requestOptions)
            .then(console.log(localStorage.getItem('company_id')))
            .then(response => response.json())
        
    //         //api integration

    }
    function handelType(value)
    {
        setType(value);
    }
    function add()
    {   
        newopt1[0]=name
        newopt1[1]=type
        newopt1[2]=rupee
        setOptions([...options,newopt1])
        console.log(finalValues);
        console.log(name,type,rupee);
        
        // newopt1[0]=newopt
        // newopt1[1]=name
        // newopt1[2]=type
        // setOptions([...options,newopt1])
        // console.log(finalValues);
        // console.log(ctype,rupee,pay);
    }
    return(
        <div >
           
            <div style={{marginLeft:"10%"}} id="collapseExample1" className="collapse">
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
                            <input type="checkbox" value={items[0]} name={items[0]} style={{cursor:"pointer"}} onChange={()=>checkhandler(items)}/>
                            <span style={{color:"dodgerblue",cursor:"pointer"}}>&nbsp;{items[0]}</span>
                            </div>
                            <div className="col-6 col-sm-4">{items[1]}</div>
                            <div className="col-6 col-sm-4">{items[2]}</div>
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
                    save
                </button>
            
            <br />
            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New Reimbursement</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label>Reimbursement Name : </label>
                        <br/>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>setName(event.target.value)}  autoFocus/>
                        </div>
                        <label>Reimbursement Type : </label>
                        <br/>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>setType(event.target.value)}  />
                        </div>
                        <label>Enter Amount : </label><br/>
                        <br/>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">₹</span>
                           <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>setRupee(event.target.value)}  />
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span style={{color:"red"}}>Note : You will not be able to edit the salary component once you associate with an employee
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-success"onClick={()=>add()} >Add New</button>
                        <button type="button" className="btn btn-oultine-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
                
            </div>
    )
}
export default Demo;