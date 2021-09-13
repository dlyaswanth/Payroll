import { useState,useEffect } from 'react';
import AdminHeader from '../Navbar/AdminHeader'
import { CSVLink} from "react-csv";
import Loader from './Loader';
function AdminReports()
{

    const [logs,setlogs]=useState([])
    const [records,setRecords]=useState('')
    const[hidden,setHidden]=useState(false)
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
                if(!data.error){
                    data.logArray=data.logArray.reverse();
                    for(let item in data.logArray){
                        var arr=data.logArray[item].split('|');
                        var obj={
                            name:arr[0],
                            email:arr[1],
                            dt:arr[3],
                            description:arr[2]
                        }
                        array.push(obj);  
                    }
                    setlogs(array);
                }
            })
            
            
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
                logs.length === 0
                ?
                <div>
                <div hidden={hidden}>
                    <Loader/>
                </div>
                <div hidden>{setTimeout(()=>{setRecords('No Records found');setHidden(true)},8000)}</div>
                <div className="text-center" style={{marginTop:"40px"}}><b>{records}</b></div>
                </div>
                :
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
            }
        
        </div>
    )
}
export default AdminReports;