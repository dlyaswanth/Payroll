/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DomainIcon from "@material-ui/icons/Domain";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";
import HttpsIcon from "@material-ui/icons/Https";
import LanguageIcon from "@material-ui/icons/Language";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";
import {Link} from 'react-router-dom'
import {
  makeStyles,
} from "@material-ui/core/styles";

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
    height: "550px",
    marginTop: "-80px",
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
    //backgroundColor: "#fff",
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
  let history = useHistory();
  const classes = useStyles();
  // create state variables for each input
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(" ");
  
  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
    // Don't miss the exclamation mark
  };
  const handleError = () => {
    if (email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(email)) {
        setError("Invalid Email");
      } else {
        
        doSignUp();
        setError(" ");
      }
    }
  };

  // When the button is clicked
  const doSignUp = () => {
    // Simple POST request with a JSON body using fetch
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(password), 'my-secret-key@123').toString();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: companyName,
        companyEmail: email,
        password: ciphertext,
        location: location,
        address: "",
        companyType: "",

        //pay schedule
        payDate: "",
        payRollStartFrom: "",
        workHours: 0,
        workdays: [],

        //tax details
        pan: "",
        tan: "",
        aocode: "",
        taxpaymentfrequency: "",

        //Statutory
        epfnumber: "",
        empcontributionrate: "",
        empstateinsurance: "",
        proftax: "",
        employeeNetPay:0,
        employeeCount:0,

        //earnings and reimbursment
        earningsDocArray: [],
        reimbursmentArray: [],
        logArray: [],
      }),
    };
    fetch("https://payroll-fastify.herokuapp.com/api/company", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log("data", data);
          localStorage.setItem("company_id", data.company._id);
          console.log("cid", data.company._id);
          history.push("/organizationsetup");
        } 
        else {
          toast.error("Setup Error! Contact admin", { autoClose: 2500 });
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(companyName, email, email, password);
  };

  return (
    <div className={classes.root1}>
      <div className={classes.root1}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 600 }}>
            {"  "}
            <img alt=""
              src={process.env.PUBLIC_URL + "/images/Capture.png"}
              width="30"
              height="30"
            />
             &nbsp;&nbsp;Codingmart Payroll
          </h1>

          <p>
            CodingMart Payroll is online payroll software that helps<br></br>{" "}
            businesses in india manage their payroll operations and<br></br> pay
            employees on time.
            <br></br>
            <br></br>
            we built CodingMart Payroll so you can:<br></br>
            <br></br>
            <li>
              <b>Streamline</b> your payroll process end-to-end
            </li>
            <br></br>
            <li>
              <b>Define</b> clear roles for your payroll staff
            </li>
            <br></br>
            <li>
              <b>Create</b> salary components,allowances and more,the way you
              want
            </li>
            <br></br>
            <li>
              <b>Compute</b> your employees paycheck accurately every time
            </li>
            <br></br>
            <li>
              {" "}
              <b>Distribute</b> salaries and payslips online
            </li>
            <br></br>
            <li>
              <b>Automatic</b> payroll accounting with codingmart Books
            </li>
            <br></br>
            <li>
              <b>Reduce</b> payroll staff workload with collaborative
              self-service portal.
            </li>
            <br></br>
          </p>
        </div>
      </div>
      <div className="zp-signup-form-container" style={{ marginTop: "-100px" }}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <div className="zp-signup-form">
            <div style={{ marginBottom: "30px" }}>
              <h2>
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 600,
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp; Let's get started
                </span>
              </h2>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Explore all
              features with 30 day free-trail
            </div>
            <div style={{ marginBottom: "20px" }}>
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield1"
                placeholder="Company Name"
                autoComplete="off"
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
            </div>
            <div style={{ marginBottom: "20px" }}>
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield2"
                placeholder="Email"
                autoComplete="off"
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
              <div className="text-danger">{error}</div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield3"
                placeholder="Contact Number"
                type="tel"
                autoComplete="off"
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
            </div>
            <div style={{ marginBottom: "30px" }}>
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield4"
                hinttext="Password"
                floatinglabeltext="Password"
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
            </div>
            <div style={{ marginBottom: "30px" }}>
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield5"
                placeholder="India"
                autoComplete="off"
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
            </div>
            <div>
              <input type="checkbox" id="agree" onChange={checkboxHandler} />
              <label htmlFor="agree">
                {" "}
                  I agree to <a href="/">Terms of Service</a> and{" "}
                <a href="/">Privacy Policy</a>
              </label>
            </div>
            <div className="form-group">
              <button
                disabled={!agree}
                className="zp-form-submit"
                onClick={handleError}
              >
                SignUp
              </button>
            </div>
          </div>
          <label htmlFor="agree" className="mt-4">
            Already have an account? <Link to="/login">Sign in</Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

