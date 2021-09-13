import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../Navbar/AdminHeader'

import Loader from './Loader';

function AdminHome()
{

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
                if(!data.error){
                    console.log(data);
                    setCompanyDetails(data);
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // function Search(emp_name)
    // {
    //     console.log(emp_name);
    // }
    
    return (
        <div id="main">
            <AdminHeader/>
            <div style={{marginTop:"110px",marginLeft:"50px"}}>
                {
                    companyDetails["employeeCount"] === undefined
                    ?
                    <Loader />
                    :
                    <div>
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
                                        <div className="col-6 col-sm-3 top">₹ {Number(companyDetails["employeeNetPay"])}</div>
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
                }
            </div>
        </div>
    )
}
export default AdminHome;