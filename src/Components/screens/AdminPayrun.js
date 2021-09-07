/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";
import { CSVLink } from "react-csv";
import Logout from './Logout';
function AdminPayrun()
{
    const [name,setName]=useState('')
    const [empDetails,setEmpDetails] = useState([])
    const [benefits,setBenefits] = useState(0)
    const headers = [
        { label: "Employee Name", key: "employeeName" },
        { label: "Paid Days", key: "days" },
        { label: "Gross Pay", key: "basicPay" },
        { label: "Deductions", key: "deductions" },
        { label: "Benefits", key: "approvedReimbursment" },   
        { label: "Reimbursemnets", key: "salary" },
        { label: "Net Pay", key: "salary" },
      ];
      var csvValues=[];
      const [csv,setCsv]=useState([])
    useEffect( ()=>{

        async function init(){
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
                
            await fetch('https://payroll-fastify.herokuapp.com/api/companyEmployee/'+localStorage.getItem("company_id"), requestOptions)
            .then(response => response.json())
            .then(data => {
                setEmpDetails(data.employee);
                csvValues=data.employee;
                console.log(empDetails);
            })

            calculateEarnings(JSON.parse(localStorage.getItem('company')).earningsDocArray);
    
        }
        
        init()
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
    function calculateEarnings(data){
        console.log(data);
        var amt = 0;
        data.forEach(element => {
            //console.log(element.amount);
            amt += Number(element.amount);
        });
        console.log(amt);
        setBenefits(amt);
        
        // eslint-disable-next-line array-callback-return
        csvValues.forEach((items)=>{
            items["days"]=31;
            items["benefits"]=amt;
        })
        console.log(csvValues)
        setCsv(csvValues)
        // setEmpDetails([...empDetails)
    }

    
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
                                        <li><hr /></li>
                                        <li className="settings"><Link className="dropdown-item settings" to="/">Work Location</Link></li>
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
        
            <div id="summary">
                <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}} >
                <div className="container-fluid">
                    <b className="navbar-brand" style={{marginLeft:"50px"}}>Active Employees</b>
                    <div className="d-flex">
                        <button className="btn btn-primary">
                        <CSVLink
                            data={csv}
                            headers={headers}
                            filename="Employee_Payrun_details.csv"
                            style={{ color: "white", textDecoration: "none" }}
                        >
                            Export CSV
                        </CSVLink>
                        </button>
                    </div>
                </div>
                </nav>
                <br />
                <div className="card container employee" >
                    <div className="row align-items-start" style={{marginTop:"5px",marginBottom:"5px"}}>
                        <div className="col"><b>Employee Name</b></div>
                        <div className="col"><b>Paid Days</b></div>
                        <div className="col"><b>Gross Pay</b></div>
                        <div className="col"><b>Deductions</b></div>
                        {/* <div className="col"><b>Taxes</b></div> */}
                        <div className="col"><b>Benefits</b></div>
                        <div className="col"><b>Reimbursements</b></div>
                        <div className="col"><b>Net Pay</b></div>
                    </div>
                </div>

                {
                    empDetails.map((item,index) =>{
                        //getReimbursment(item._id)
                        return(
                            <div key={index} className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>
                                <div className="col"><p>{item.employeeName}</p></div>
                                <div className="col"><p>31</p></div>
                                <div className="col"><p>₹ {item.basicPay}</p></div>
                                {/* <div className="col"><p>₹ 0.00</p></div> */}
                                <div className="col"><p>₹ {item.deductions}</p></div>
                                <div className="col"><p>₹ {benefits}</p></div>
                                <div className="col"><p>₹ {item.approvedReimbursment}</p></div>
                                <div className="col"><p>₹ {item.salary}</p></div>
                                <div className="w-100 d-none d-md-block"></div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}
export default AdminPayrun;