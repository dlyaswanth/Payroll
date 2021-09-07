import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';
import { CSVLink} from "react-csv";
import Logout from './Logout';
function AdminReports()
{
    const [name,setName]=useState('')
    const [logs,setlogs]=useState([])
    const [csv,setCsv]=useState([])
    const headers = [
        { label: "Employee Name", key: "Employee_Name" },
        { label: "Work Email", key: "Work_Email" },
        { label: "Log Date & Time", key: "logs" },
        { label: "Description", key: "des" },
      ];
    useEffect(()=>{
        //getting company's applied reimbursment
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem("company_id"), requestOptions)
            .then(response => response.json())
            .then(data => {
                setlogs(data.logArray.reverse());
                // console.log(logs);
            })
            var flgele=[]
            logs.forEach(element => {   
                var temp = element.split('|');
                // console.log(temp);
                var ele={}
                ele['Employee_Name']=temp[0]   
                ele['Work_Email']=temp[1]
                ele['logs']=temp[3]
                ele['des']=temp[2]
                flgele.push(ele);
            });
            setCsv(flgele)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function Search(emp_name)
    {
        console.log(emp_name);
    }
    return (
        <div id="main">
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
            <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}}>
                <div className="container-fluid">
                <b className="navbar-brand" style={{marginLeft:"50px"}}></b>
                    <div className="d-flex">
                    <button className="btn btn-primary">
                        <CSVLink
                            data={csv}
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
                    <div className="col-6 col-sm-3"><b>Log Date & Time</b></div>
                    <div className="col-6 col-sm-3"><b>Description</b></div>
                </div>
            </div>
            
            {
                logs.map((items,index)=>{
                    var item=items.split('|');
                    return (
                        <div key={index} className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>    
                        <div className="col-6 col-sm-3"><p>{item[0]}</p></div>
                        <div className="col-6 col-sm-3"><p>{item[1]}</p></div>
                        <div className="col-6 col-sm-3"><p>{item[3]}</p></div>
                        <div className="col-6 col-sm-3"><p>{item[2]}</p></div>
            
                        <div className="w-100 d-none d-md-block"></div>
                        </div>
                  )
                })
            }
        
        </div>
    )
}
export default AdminReports;