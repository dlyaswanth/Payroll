/* eslint-disable react/jsx-no-duplicate-props */
import { Link } from 'react-router-dom';
import UserNavbar from '../Navbar/UserNavbar';
import { PieChart } from 'react-minimal-pie-chart';
import Logout from './Logout';

function UserHome()
{
    const dataMock = [
        { title: 'Take Home', value: 60, color:'#32CD32',month:'JANUARY 2019' },
        { title: 'Taxes & Deductions', value: 40, color:'#FF6347',month:'JANUARY 2019' }
      ];
    return (
        <div id="main">
           <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <UserNavbar className="navbar-brand"/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse right navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                           
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
                <div style={{marginTop:"80px",marginLeft:"100px"}}>
                    <div className="container-fluid">
                        <h1>Welcome Meera Kishnan</h1>
                        <p className="fs-5 fw-light my-3">Senior Engineer at Zyka Corp</p>
                    </div>
                    <div className="container-fluid my-5">
                        <div class="row">
                            <div class="col-6">
                                 <div ClassName="container-sm" id="reim1" style={{backgroundColor:"#F8F8F8"}}>
                                 <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="45" fill="currentColor" className="bi bi-cash-coin ms-3 my-3" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                                        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                                        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                                        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                                        </svg>
                                        <span className="ms-2 fs-4 my-5">Payslips</span>
                                   </div>
                                   <div className="container"> 
                                   <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item "><Link to="#" className="skip">January 2019</Link></li>
                                            <li class="breadcrumb-item"><Link to="#" className="skip">December 2018</Link></li>
                                            <li class="breadcrumb-item"><Link to="#" className="skip">November 2018</Link></li>
                                            <li class="breadcrumb-item"><Link to="#" className="skip">October 2018</Link></li>
                                            
                                        </ol>
                                    </nav>
                                   </div>
                                    <div className="card-body" id="reim2">
                                            <div className="card container" id="reim2" style={{backgroundColor:"#eff5f5"}}>
                                            <div class="row">
                                                <div class="col-6">
                                                    <PieChart className="my-2"
                                                    data={dataMock}
                                                    style={{height: '250px', marginright:"px"}}
                                                    lineWidth={25} paddingAngle={5}
                                                    data={dataMock}
                                                    label={({ dataEntry }) => dataEntry.month}
                                                    labelStyle={{
                                                        fontSize: '8px',
                                                        fontFamily: 'sans-serif',
                                                    }}
                                                    labelPosition={0}
                                                    data={dataMock} lengthAngle={-360} animate 
                                                    data={dataMock}
                                                    />

                                                </div>
                                                <div class="col-6">
                                                <div className="b1 my-3 " style={{borderLeft:"6px solid",borderColor:"#32CD32"}}><p className="ms-2" >Take Home</p> <span style={{marginLeft:"4%"}}><b>₹ 87,645.00</b></span>  </div>
                                                <div className="b1 my-3" style={{borderLeft:"6px solid",borderColor:"#FF6347"}}><p className="ms-2">Taxes {'&'} Deductions</p> <span style={{marginLeft:"4%"}}><b>₹ 8,085.00</b></span>  </div>
                                                <div className="b1 my-3" style={{borderLeft:"6px solid",borderColor:"#D3D3D3"}}><p className="ms-2">Gross Pay</p> <span style={{marginLeft:"4%"}}><b>₹ 95,730.00</b></span>  </div>
                                                </div>
                                            </div>
                                            </div>
                                            <br/>

                                        <br/>

                                     <button className="btn btn-primary">View Pay Slip -{'>'}</button>

                                    </div>    
                                </div>     
                                
                            </div>
                            <div class="col-6 ">
                                <div ClassName="container-sm" id="reim1" style={{backgroundColor:"#F8F8F8"}}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="45" fill="currentColor" class="bi bi-journal-text ms-3 my-3" viewBox="0 0 16 16">
                                        <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                        </svg>
                                        <span className="ms-2 fs-4 my-5">Reimbursement Summary</span>
                                   </div>
                                    <div className="card-body" id="reim2">
                                            <div className="card container" id="reim2" style={{backgroundColor:"#eff5f5"}}>
                                                <div className="row m-5" style={{marginTop:"7%"}}>
                                                    <div className="col-6 col-sm-12" >Unclaimed Amount</div>
                                                    
                                                    <div className="col-6 col-sm-12" > <h4><b> ₹ 12,500.00</b></h4></div>
                                                    <div className="col-6 col-sm-12">You have an Unpaid Amount of ₹ 5,000.00</div>
                                                </div>
                                            </div>
                                            <br/>

                                            <div className="container" id="reim3">
                                                <p>CLAIMS FOR JANUARY 2019</p>
                                                <div className="row m-3" id="reim3">
                                                <div className="col-md-3">
                                                    <div className="b1" style={{borderLeft:"6px solid blue"}}><p className="ms-2" >Submitted</p> <span style={{marginLeft:"4%"}}><b>₹ 23,650.00</b></span>  </div>
                                                </div>
                                                <div className="col-md-3">
                                                <div className="b1" style={{borderLeft:"6px solid green"}}><p className="ms-2" >Approved</p> <span style={{marginLeft:"4%"}}><b>₹ 19,480.00</b></span>  </div>
                                            </div>
                                        </div>
                                        </div>
                                        <br/>

                                     <button className="btn btn-primary">View More Details -{'>'}</button>

                                    </div>    
                                </div>             
                            </div>
                        </div>
                    </div>
                    
                </div>   

            
        </div>
        
    )
}
export default UserHome;