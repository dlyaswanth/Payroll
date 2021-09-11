import { useState,useEffect } from 'react';
import AdminHeader from '../Navbar/AdminHeader'
import { CSVLink} from "react-csv";

function AdminReports()
{

    const [logs,setlogs]=useState([])
    const headers=[
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Date and Time", key: "dt" },
        { label: "Description", key: "description" }

    ]
    
    var array=[];
    
    useEffect(()=>{
       
        //getting company's applied reimbursment
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem("company_id"), requestOptions)
            .then(response => response.json())
            .then(data => {
                // setlogs(data.logArray);
                data.logArray=data.logArray.reverse();
                for(let item in data.logArray){
                    // .split('|')
                    // data.logArray[item]
                    // console.log(array);
                    var arr=data.logArray[item].split('|');
                    // console.log(arr);
                    var obj={
                        name:arr[0],
                        email:arr[1],
                        dt:arr[3],
                        description:arr[2]
                    }
                    // console.log(obj);
                    array.push(obj);
                    
                }
                setlogs(array);
                // console.log(logs);
            })
            // console.log(array);
            
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // function Search(emp_name)
    // {
    //     console.log(emp_name);
    // }
    return (
        <div id="main">
            <AdminHeader/>
                        <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}}>
                <div className="container-fluid">
                <b className="navbar-brand" style={{marginLeft:"50px"}}></b>
                    <div className="d-flex">
                    <button className="btn btn-primary">
                        <CSVLink
                            data={logs}
                            headers={headers}
                            filename="Employee_logs.csv"
                            style={{ color: "white", textDecoration: "none" }}
                        >
                            Export CSV
                        </CSVLink>
                        </button>
                    </div>
                </div>
            </nav>
            <br />
            <div className="card container employee">
                <div className="row" style={{marginTop:"5px",marginBottom:"5px"}}>
                    <div className="col-6 col-sm-3"><b>Employee Name</b></div>
                    <div className="col-6 col-sm-3"><b>Work Email</b></div>
                    <div className="col-6 col-sm-3"><b>Log Date {'&'} Time</b></div>
                    <div className="col-6 col-sm-3"><b>Description</b></div>
                </div>
            </div>
            
            {
                logs.map((item,index)=>{
                    return (
                                <div key={index} className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>    
                                <div className="col-6 col-sm-3"><p>{item.name}</p></div>
                                <div className="col-6 col-sm-3"><p>{item.email}</p></div>
                                <div className="col-6 col-sm-3"><p>{item.dt}</p></div>
                                <div className="col-6 col-sm-3"><p>{item.description}</p></div>
                    
                                <div className="w-100 d-none d-md-block"></div>
                                </div>
                          )
                })
                // logs.map((items,index)=>{
                //     // var item=items.split('|');
                //     var item=items.log.split('|');
                //     return (
                //         <div key={index} className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>    
                //         <div className="col-6 col-sm-3"><p>{item[0]}</p></div>
                //         <div className="col-6 col-sm-3"><p>{item[1]}</p></div>
                //         <div className="col-6 col-sm-3"><p>{item[3]}</p></div>
                //         <div className="col-6 col-sm-3"><p>{item[2]}</p></div>
            
                //         <div className="w-100 d-none d-md-block"></div>
                //         </div>
                //   )
                // })
            }
        
        </div>
    )
}
export default AdminReports;