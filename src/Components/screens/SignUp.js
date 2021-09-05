/* eslint-disable jsx-a11y/anchor-is-valid */
  
import React, { useState } from "react";
//import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DomainIcon from "@material-ui/icons/Domain";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";
import HttpsIcon from "@material-ui/icons/Https";
import LanguageIcon from "@material-ui/icons/Language";
// import {useHistory} from 'react-router-dom' 
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
import {
//   createTheme,
  makeStyles,
} from "@material-ui/core/styles";
// import { orange } from "@material-ui/core/colors";
//import TextField from "@material-ui/core/TextField";

//import { IconName } from "react-icons/fa";
//import capture from "../../public/logo192.png";
// const theme = createTheme({
//   palette: {
//     primary: orange,
//   },
// });
const useStyles = makeStyles((theme) => ({
  root1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "60px",
    //alignItems: "center",
  },
  margin: {
    margin: theme.spacing(7),
  },
  rectangle: {
    //backgroundColor: "lightgrey",
    // width: "400px",
    // height: "620px",
    // border: "1px solid black",
    // //padding: "50px",
    // margin: "10px",
    width: "350px",
    padding: "30px",
    border: "2px solid gray",
    height: "460px",
    marginTop: "0px",
    alignContent: "center",
    justifyContent: "center",
    //margin: "40",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(9),
    backgroundColor: "#fff",
    width: "100 * 2",
    height: "100",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const SignUpForm = () => {
  // let history=useHistory();
//   var FontAwesome = require("react-fontawesome");
  const classes = useStyles();
  // create state variables for each input
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
//   const [currentLayout, setCurrentLayout] = React.useState("k-card-list");
  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
    document.getElementById('btn').disabled=!agree;
    // Don't miss the exclamation mark
  };

  // When the button is clicked
  const btnHandler = () => {
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(password), 'my-secret-key@123').toString();
      //log encrypted data
      console.log('Encrypt Data -')
      console.log(ciphertext);
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
                  company : companyName,
                  companyEmail : email,
                  password : ciphertext,
                  location : location,
                  address : "",
                  companyType : "",

                  //pay schedule
                  payDate : "",
                  payRollStartFrom :"",
                  workHours: 0,
                  workdays:[],

                  //tax details
                  pan : "",
                  tan : "",
                  aocode : "",
                  taxpaymentfrequency : "",

                  //Statutory
                  epfnumber : "",
                  empcontributionrate : "",
                  empstateinsurance : "",
                  proftax : "",  

                  //Employee
                  employeeNetPay : 0,
                  employeeCount : 0,

                  //earnings and reimbursment
                  earningsDocArray : [],
                  reimbursmentArray : [],
                  logArray : []
          })
      };
      fetch('https://payroll-fastify.herokuapp.com/api/company', requestOptions)
          .then(response => response.json())
          .then(data => {
            if(data){
              localStorage.setItem('company_id', data.company._id);
              console.log(data.company._id);
              window.open("/organizationsetup","_self")
              // history.push('/organizationsetup');
            }
            else{
              toast.error("ERROR",{autoClose:2500})
            }
          })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(companyName, email, email);
  };

  return (

    <div className={classes.root1}>
      <div className={classes.root1}>
        <ToastContainer />
       <div>
          <h1 style={{ fontSize: 25 }}>
            CodingMart Payroll
          </h1>
          <p>
            CodingMart Payroll is online payroll software that helps<br></br>{" "}
            businesses in india manage their payroll operations and<br></br> pay
            employees on time.
            <br></br>
            <br></br>
            we built CodingMart Payroll so you can:<br></br>
            <br></br>* <b>Streamline</b> your payroll process end-to-end
            <br></br>
            <br></br>* <b>Define</b> clear roles for your payroll staff<br></br>
            <br></br>* <b>Create</b> salary components,allowances and more,the
            way you want<br></br>
            <br></br>* <b>Compute</b> your employees paycheck accurately every
            time<br></br>
            <br></br>* <b>Distribute</b> salaries and payslips online<br></br>
            <br></br>* <b>Automatic</b> payroll accounting with codingmart Books
            <br></br>
            <br></br>* <b>Reduce</b> payroll staff workload with collaborative
            self-service portal.<br></br>
          </p>
        </div>
      </div>

      <form className={classes.root} onSubmit={handleSubmit}>
        <div className={classes.rectangle}>
          <p>
            <span
              style={{
                fontSize: 30,
              }}
            >
              {"  "} Let's get started{" "}
            </span>
            <br></br>Explore all features with 30 day free-trail
          </p>

          <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            placeholder="Company Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DomainIcon />
                </InputAdornment>
              ),
            }}
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            placeholder="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            placeholder="Contact Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CallIcon />
                </InputAdornment>
              ),
            }}
            //type="email"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            placeholder="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsIcon />
                </InputAdornment>
              ),
            }}
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            placeholder="India"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon />
                </InputAdornment>
              ),
            }}
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          
            <span className="row ms-1"><input className="col-1 " style={{marginTop:"6px"}} type="checkbox" id="agree" onChange={checkboxHandler} />
            <label className="mt-1 col-10 p-0" htmlFor="agree" style={{fontSize:"10px"}}>
              {" "}
              I agree to <a href="">Terms of Service</a> and{" "}
              <a href="">Privacy Policy</a>
            </label>
            </span>
          <div style={{marginTop:"20px"}}>
          <button disabled={!agree} id="btn" className="btn btn-danger" onClick={btnHandler}>
            {/* <a href="/OrganizationSetup"> */}
              Sign Up Now
              {/* </a> */}
          </button>
          </div>
        </div>
        <h6 className="mt-3">Already have an account? <a href="/login">Sign In</a></h6>
      </form>
      
    </div>
    
  );
};

export default SignUpForm;