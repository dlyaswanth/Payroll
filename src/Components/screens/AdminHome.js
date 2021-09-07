import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';
import Logout from './Logout';
import Loader from './Loader';

function AdminHome()
{
    const [name,setName]=useState('')
    const [companyDetails,setCompanyDetails] = useState({})

    useEffect( ()=>{
        // Update the document title using the browser API
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
            
            fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem("company_id"), requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCompanyDetails(data);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function Search(emp_name)
    {
        console.log(emp_name);
    }
    
    return (
        <div id="main">
            <Loader />
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
            <div style={{marginTop:"110px",marginLeft:"50px"}}>
                <h3>Welcome Codesters !</h3>
                <div className="card-body">
                <b>Process Pay run</b> <span>{companyDetails["payRollStartFrom"]} to 31-12-2021</span>
                <br /> <br />
                    <div className="card container" style={{height:"140px",width:"65%"}}>
                        <div className="row" style={{marginTop:"20px"}}>
                            <div className="col-6 col-sm-3"><b>Employee net pay</b></div>
                            <div className="col-6 col-sm-3"><b>Payment Date</b></div>
                            <div className="col-6 col-sm-3"><b>No of Employees</b></div>
                            <div className="w-100 d-none d-md-block"></div>
                            <div className="col-6 col-sm-3 top">₹ {companyDetails["employeeNetPay"]}</div>
                            <div className="col-6 col-sm-3 top">{companyDetails["payDate"]}</div>
                            <div className="col-6 col-sm-3 top">{companyDetails["employeeCount"]}</div>
                            <button className="btn btn-primary view"><Link to="/employee" className="text-white" style={{textDecoration:"none"}}>View Details</Link></button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                <b>Deduction Summary</b>
                <br /> <br />
                    <div className="card container" style={{height:"140px",width:"65%"}}>
                        <div className="row" style={{marginTop:"20px"}}>
                            <div className="col-6 col-sm-3"><b>EPF</b></div>
                            <div className="col-6 col-sm-3"><b>ESI</b></div>
                            {/* <div className="col-6 col-sm-3"><b>TDS Deduction</b></div> */}
                            <div className="col-6 col-sm-3"><b>Active Employees</b></div>
                            <div className="w-100 d-none d-md-block"></div>
                            <div className="col-6 col-sm-3 top">{companyDetails["epfnumber"]}</div>
                            <div className="col-6 col-sm-3 top">{companyDetails["empstateinsurance"]}</div>
                            {/* <div className="col-6 col-sm-3 top">{companyDetails["employeeCount"]}</div> */}
                            <div className="col-6 col-sm-3 top">{companyDetails["employeeCount"]}</div>
                            <div className="w-100 d-none d-md-block"></div>
                            <div className="col-6 col-sm-3 pointer top">View Details</div>
                            <div className="col-6 col-sm-3 pointer top">View Details</div>
                            {/* <div className="col-6 col-sm-3 pointer top">View Details</div> */}
                            <div className="col-6 col-sm-3 pointer top"><Link to="/employee">View Employees</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminHome;