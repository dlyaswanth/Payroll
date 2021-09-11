/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Logout from "../screens/Logout";
import {ToastContainer,toast} from 'react-toastify'; 
import CryptoJS from "crypto-js";
import 'react-toastify/dist/ReactToastify.css';
import { Form,Row,Col } from 'react-bootstrap';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom'

import Modal from "react-bootstrap/Modal";
let weekDay = [
  { day: 'Monday', Check: false },
  { day: 'Tuesday', Check: false },
  { day: 'Wednesday', Check: false },
  { day: 'Thursday', Check: false },
  { day: 'Friday', Check: false },
  { day: 'Saturday', Check: false },
  { day: 'Sunday', Check: false }
];
function AdminHeader() {
  
  const [oldPassword,setOldPassword]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [compDetails,setCompDetails]=useState({});
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [search, setSearch] = useState("");
  //oragnization profile
     const[orgname,setOrgName]=useState('')
      const[bussiness]=useState('India')
      const[industry,setIndustry]=useState('')
      const[address,setAddress]=useState('')
      const[city,setCity]=useState('')
      const[state,setState]=useState('')
      const[pincode,setPincode]=useState('')
      const[error,setError]=useState({})


      //payschedule data

      const refer = useRef();
      let history=useHistory();
      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    
      let setDate = '';
      const onSubmit = data => {
        let weekDays = [];
        const updatedDay = weekDay.filter((day) => {
          if (day.Check === true) weekDays.push(day.day);
          console.log()
        });
        data.day = weekDays;
        if (
          data.hoursWork === '' ||
          data.payDate === '' ||
          data.payDateFrom === ''
        ) {
          alert('Fill all the Details');
          return;
        }
        const updateDate = data.payDate
          .split('-')
          .reverse()
          .join('-');
        data.payDate = updateDate;
        const updateDateFrom = data.payDateFrom
          .split('-')
          .reverse()
          .join('-');
        data.payDateFrom = updateDateFrom;
        setDate = data.payDateFrom;
        console.log(data);
        
        const update = () => {
          return <h4>Submitted</h4>;
        };
    
    
        //api integration
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
                  payDate : data.payDate,
                  payRollStartFrom :data.payDateFrom,
                  workdays : data.day,
                  workHours: data.hoursWork
          })
      };
      fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), requestOptions)
          .then(console.log(localStorage.getItem('company_id')))
          .then(response => response.json())
          .then (data => {
            console.log(data)
            if (!data)
            toast.error("ERROR",{autoClose:2500})
            else
            {
                toast.success(data.message,{autoClose:2500})
                window.open("/statutory","_self")
                // history.push('/statutory')
            }
          })
        //api integration
    
        
        update();
        return data;
      };

      //-->payschedule
  
      var currPassword="";


  useEffect(() => {
    // Update the document title using the browser API
    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
      "https://payroll-fastify.herokuapp.com/api/companyEmployee/" +
        localStorage.getItem("company_id"),
      requestOptions1
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.employee);
        console.log("searchemployee", data.employee);
      });

      const requestOptions2 = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
        
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem("company_id"), requestOptions2)
        .then(response => response.json())
        .then(data => {
            setCompDetails(data);
            
        })
  }, []);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  // function Search(emp_name) {
  //   console.log("namw", emp_name);
  // }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(function (item) {
        //console.log("loggg", item.employeeName);
        const itemData = item.employeeName
          ? item.employeeName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setEmployee(newData);
      //setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setEmployee("");
      setSearch(text);
    }
  };

  

    function handleSubmitpwd(event) {

        console.log(compDetails);
        event.preventDefault();
        var bytes = CryptoJS.AES.decrypt(compDetails.password, 'my-secret-key@123');
        currPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        console.log(oldPassword,password,confirmPassword);
        validate();
    
        reset();
    
      }

      function updatePassword(){
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(password), 'my-secret-key@123').toString();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password : ciphertext
            })
        };
            
            fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem("company_id"), requestOptions)
            .then(response => response.json())
            .then(data => {
                return data
            })
      }

      function reset(){
        setOldPassword('');
        setPassword('');
        setOrgName('');
        setIndustry('');
        setAddress('');
        setCity('');
        setState('');
        setPincode('');


      }
    
      function validate(){

          console.log(oldPassword,password,confirmPassword);
    
          if (!oldPassword) {
    
            toast.error("Please fill All fields! Try again!",{autoClose:2000})
            return;
    
          }
    
          if (!password) {

            toast.error("Please fill All fields! Try again!",{autoClose:2000})
            return;
    
          }
    
          if (!confirmPassword) {

            toast.error("Please fill All fields! Try again!",{autoClose:2000})
            return;
          }
          if(currPassword===oldPassword){
            if (typeof password !== "undefined" && typeof confirmPassword !== "undefined") {

    
              if (password !== confirmPassword) {
  
                  toast.error("Password mismatch! Please try again!",{autoClose:2500})
                  return;
      
      
              }
              else{
                  updatePassword();
                  toast.success('Password Updated Successfully',{autoClose:2500})
                  
                  return;
              }
      
            } 
          }else{
            toast.error("Current Password Doesn't Match! Pls Try Again!",{autoClose:2500})
            return;
          }
          
    
      }

      
        
              
              
      
    
        // handleChange(e) {
        // //   console.log(e.target.value)
        // // //   let fields = this.state.fields;
        // //   fields[e.target.name] = e.target.value;
        //   const {fields}=this.state;
        //   this.setState({
           
        //    fields:{...fields,[e.target.name]:e.target.value}
        //   });
    
        // }
    
       function submitorganisationSetupForm(e) {
          const companyid= localStorage.getItem('company_id');
          e.preventDefault();
         // console.log(this.state.fields)
          if (validateForm()) {
            
            //api integration
            const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                      location : bussiness,
                      address :address+","+city+","+state+","+pincode,
                      companyType : industry
              })
          };
          fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), requestOptions)
              .then(console.log(companyid))
              .then(response => response.json())
              .then(data=>{
                if (!data)
                  toast.error("error",{autoClose:2500})
                else
                {
                    toast.success(data.message,{autoClose:2500})
                    window.open("/taxinfo","_self")
                    // history.push('/taxinfo');
                }
            })
    
              //api integration
    
    
            // fetch('', { //backend url
            //   method: 'POST',
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(this.state.fields)
            //   }).then(() => {
            //   console.log('organisation setup added');
            // })
              // let fields = {};
              // fields["orgname"] = "";
              // fields["address"] = "";
              // fields["city"] = "";
              // fields["pincode"] = "";
              // fields["industry"] = "";
              // fields["state"] = "";
              // this.setState({fields:fields});
              //alert("Form saved");
              
          }
    
        }
    

      function validateForm() {

        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        if (!orgname) {
          formIsValid = false;
          errors["orgname"] = "*Please enter your location.";
        }
        if (orgname !== "undefined") {
          if (!orgname.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["orgname"] = "*Please enter alphabet characters only.";
          }
        }
  
        if (!address) {
          formIsValid = false;
          errors["address"] = "*Please enter your address.";
        }
  
        if (!city) {
          formIsValid = false;
          errors["city"] = "*Please enter your city.";
        }
        if (city !== "undefined") {
          if (!city.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["city"] = "*Please enter alphabet characters only.";
          }
        }
  
        if (!pincode) {
          formIsValid = false;
          errors["pincode"] = "*Please enter your pincode.";
        }
        if (pincode !== "undefined") {
          if (!pincode.match(/^[1-9][0-9]{5}$/)) {
            formIsValid = false;
            errors["pincode"] = "*Please enter 6 digit pincode.";
          }
        }
  
        if (!industry) {
          formIsValid = false;
          errors["industry"] = "*Please select valid field.";
        }
  
        if (!state) {
          formIsValid = false;
          errors["state"] = "*Please select valid field.";
        }
  
        // this.setState({
        //   errors: errors
        // });
        setError(errors)
        return formIsValid;
  
  
      }

  const renderSearchResults = () => {
    if (employee.length) {
      return (
        <div>
          {employee.map((result) => {
            return (
              <div style={{ flexDirection: "column" }}>
                <h6>
                  <b>Employee Name</b>:&nbsp;{result.employeeName} &nbsp;{" "}
                  <b>Work Mail</b>:&nbsp;
                  {result.employeeEmail}&nbsp; <b>Role</b>:&nbsp;
                  {result.role}&nbsp; <b>Salary</b>:&nbsp;
                  {result.salary}
                </h6>
              </div>
            );
          })}
        </div>
      );
    }
  };
  return (
    <div id="main">
      <ToastContainer />
      <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <AdminNavbar className="navbar-brand" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse right navbar-collapse d-flex justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li>
                <button
                  className="btn btn-outline-success"placeholder="Search Employee"
                  //aria-label="Search"
                  // className="btn-close"
                  // data-bs-dismiss="modal"
                  onClick={() => handleShow()}
                  // onChange={() => handleShow()}
                >Search Employee</button>
              </li>
              <li>
                {/* &nbsp;
                <button
                  className="btn btn-outline-success"
                  onClick={() => Search(name)}
                >
                  Search
                </button> */}
              </li>
              <li className="company_name me-2 ">
              
              <img alt=""
                                src={process.env.PUBLIC_URL + "/images/codingmart.png"}
                                width="160"
                                height="40"
                            />&nbsp;{" "}
                
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Settings
                  </button>
                  <ul className="dropdown-menu">
                    <li className="settings">
                    <li data-bs-toggle="modal" data-bs-target="#organizationprofile" className="dropdown-item settings" style={{cursor:"pointer"}}>
                      Organization Profile
                    </li>
                    </li>
                    
                    <li className="settings">
                      <hr />
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#updatepassword" className="dropdown-item settings" style={{cursor:"pointer"}}>
                      Update Password
                    </li>
                    <hr />
                    <li>
                      <Link className="dropdown-item settings" to="/">
                        Work Location
                      </Link>
                    </li>
                    <li>
                      <hr />
                    </li>
                    <li className="settings">
                    <li data-bs-toggle="modal" data-bs-target="#payschedule" className="dropdown-item settings" style={{cursor:"pointer"}}>
                      Pay Schedule
                    </li>
                    </li>
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
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{width:"100%"}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Employee"
              aria-label="Search"
              // className="btn-close"
              // data-bs-dismiss="modal"
              onChange={(event) => searchFilterFunction(event.target.value)}
              //onClear={(event) => searchFilterFunction("")}
              onClear={(text) => searchFilterFunction("")}
              value={search}
              style={{marginLeft:"25%",width:"50%",marginRight:"25%"}}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderSearchResults()}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <div className="modal fade" id="updatepassword" tabIndex="-1" aria-labelledby="updatepassword" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Password</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>reset()}></button>
                    </div>
                    {/* update password */}
                    <form onSubmit={handleSubmitpwd}>
                        <div className="modal-body">

                                <div className="form-group my-3">

                                    <label htmlFor="oldpassword">Enter Your Password:</label>

                                    <input 

                                    type="password" 

                                    name="oldpassword" 

                                    value={oldPassword}

                                    onChange={(event)=>{setOldPassword(event.target.value)}}

                                    className="form-control" 

                                    placeholder="Enter password" 

                                    id="oldpassword" />

                                </div>

                                <div className="form-group my-3">

                                <label htmlFor="password">Enter Your New Password:</label>

                                <input 

                                type="password" 

                                name="password" 

                                value={password}

                                onChange={(event)=>{setPassword(event.target.value)}}

                                className="form-control" 

                                placeholder="Enter new password" 

                                id="password" />

                                </div>

                                <div className="form-group my-3">

                                <label htmlFor="password">Confirm Password:</label>

                                <input 

                                type="password" 

                                name="confirm_password" 

                                value={confirmPassword}

                                onChange={(event)=>{setConfirmPassword(event.target.value)}}

                                className="form-control" 

                                placeholder="Enter confirm password" 

                                id="confirm_password" />

                                </div>

                        </div> 
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>reset()}>Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                        </div>
                    </form>
                    
                </div>
            </div>
            </div>
            <div className="modal fade" id="organizationprofile" tabIndex="-1" aria-labelledby="organizationprofile" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Organization Profile</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>reset()}></button>
                    </div>
                    {/* update password */}
                    <div className="container-fluid">
                        <Form method="post"  name="organisationSetupForm"  onSubmit= {submitorganisationSetupForm}>
                            <Form.Group className="mb-3" controlId="formOrgname">
                                <Form.Label>Organisation Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter organisation name" name="orgname"  value={orgname} onChange={(e)=>setOrgName(e.target.value)}  />
                                <div className="errorMsg">{error.orgname}</div>
                            </Form.Group>
              
                          <Row className="mb-3">

                              <Form.Group as={Col} controlId="formGridLocation">
                              <Form.Label>Buisness Location</Form.Label>
                              <Form.Control type="text" placeholder="Enter location" name="buisness" value="India" />
                              </Form.Group>

                                <Form.Group as={Col} controlId="formGridIndustry">
                                <Form.Label>Industry</Form.Label>
                                  <Form.Select  name="industry" value={industry} onChange={(e)=>setIndustry(e.target.value)} placeholder="Select an Industry">
                                  <option selected>Select an industry type...</option>
                                      <option value="Agriculture">Agriculture</option>
                                      <option value="Aerospace">Aerospace</option>
                                      <option value="Art & Design">Art & Design</option>
                                      <option value="Automotive">Automotive</option>
                                      <option value="Construction">Construction</option>
                                      <option value="Consulting">Consulting</option>
                                      <option value="Computer Industry">Computer Industry</option>
                                      <option value="Education Industry">Education Industry</option>
                                      <option value="Entertainment Industry">Entertainment Industry</option>
                                      <option value="Energy Industry">Energy Industry</option>
                                      <option value="Electronics Industry">Electronics Industry</option>
                                      <option value="Food Industry">Food Industry</option>
                                      <option value=" Health care Industry"> Health care Industry</option>
                                      <option value="Food Industry">Food Industry</option>
                                      <option value="Manufacturing Industry">Manufacturing Industry</option>
                                      <option value="Music Industry">Music Industry</option>
                                      <option value="Mining Industry">Mining Industry</option>
                                      <option value="News Media Industry">News Media Industry</option>
                                      <option value="Networking Industy">Networking Industy</option>
                                      <option value="Pharmaceutical Industry">Pharmaceutical Industry</option>
                                      <option value="Telecommunication Industry">Telecommunication Industry</option>
                                      <option value="Transport Industry">Transport Industry</option>
                                      <option value="Worldwide web">Worldwide web</option>
                                  </Form.Select> 
                                  <div className="errorMsg">{error.industry}</div> 
                              </Form.Group>
                          </Row> 
        
                            <Form.Group className="mb-3" controlId="formAddress">
                                <Form.Label>Organisation Address
                                <p className="text-muted fw-lighter">This will be considered as the address of your primary location.</p>  
                                </Form.Label>
                                <Form.Control type="text" placeholder="Address" name="address" value={address}  onChange={(e)=>setAddress(e.target.value)}  />
                                <div className="errorMsg">{error.address}</div>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" name="city" value={city}  onChange={(e)=>setCity(e.target.value)}/>
                                <div className="errorMsg">{error.city}</div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                        <Form.Select  name="state"  value={state} onChange={(e)=>setState(e.target.value)}>
                                        <div className="errorMsg">{error.state}</div>  
                                        <option selected>Select a state...</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>   
                                            <option value="Maharastra">Maharastra</option>       
                                        </Form.Select>
                                        <div className="errorMsg">{error.state}</div> 
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Pincode</Form.Label>
                                    <Form.Control type="text" placeholder="Pincode" name="pincode" value={pincode}  onChange={(e)=>setPincode(e.target.value)}/>
                                    <div className="errorMsg">{error.pincode}</div>
                                </Form.Group>
                            </Row>     
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>reset()}>Close</button>
                            <button type="submit" className="btn btn-primary"  >Update</button>
                        </div>
                        </Form>
                    </div>
                    
                </div>
            </div>
            </div>
            <div className="modal fade" id="payschedule" tabIndex="-1" aria-labelledby="payschedule" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Pay Schedule</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>reset()}></button>
                    </div>
                    {/* update password */}
                    <form
                      className="form-group m-1 p-2 px-6"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      
                      <label className="mt-4 mb-2" htmlFor="workWeek">
                        Select Work Week <span className="text-danger ">*</span>
                      </label>
                      {weekDay.map((day, i) => {
                        return (
                          <>
                            <br />
                            <input
                              className="form-check-input"
                              key={day.day}
                              type="checkbox"
                              htmlFor="day"
                              onChange={() => {
                                weekDay[i].Check = !weekDay[i].Check;
                              }}
                              name={{ day }}
                              value={{ day }}
                            />
                            <label className="form-check-label" for="day">
                              {' '}
                              &nbsp; {day.day}
                            </label>
                          </>
                        );
                      })}
                      <br />
                      <br />
                      <label htmlFor="hoursWork">
                        Working Hours <span className="text-danger ">*</span>{' '}
                      </label>
                      <input
                        className="form-control"
                        {...register('hoursWork', { required: true })}
                        type="hours"
                        placeholder="Enter Week Hours"
                        name="hoursWork"
                      />
                      {errors.hoursWork && (
                        <p className="text-danger">*Working Hours is required.</p>
                      )}
                      <br />
                      <label htmlFor="payDate">
                        Pay Date <span className="text-danger ">*</span>{' '}
                      </label>
                      <input
                        className="form-control"
                        {...register('payDate', { required: true })}
                        type="date"
                        name="payDate"
                      />
                      {errors.payDate && <p className="text-danger">*Pay Date is required.</p>}
                      <br />
                      <label htmlFor="payDateFrom">
                        Pay Date From <span className="text-danger ">*</span>
                      </label>
                      <input
                        className="form-control"
                        {...register('payDateFrom', { required: true })}
                        type="date"
                        name="payDateFrom"
                      />
                      {errors.payDateFrom && (
                        <p className="text-danger">*Pay Date From is required.</p>
                      )}
                      <br />
                      {/* <span className="bg-secondary text-light p-1 rounded ">
                        Salary for the month of {setDate}
                      </span> */}
                      {/* <br />
                      <br /> */}
                      {/* <button
                        className="form-control btn btn2 btn-primary"
                        type="submit"
                        value="Save & Continue →"
                      >
                        Save & Continue →
                      </button> */}

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>reset()}>Close</button>
                            <button type="submit" className="btn btn-primary"  >Update</button>
                        </div>
                    </form>
                    
                </div>
            </div>
            </div>
    </div>
  );
}
export default AdminHeader;
