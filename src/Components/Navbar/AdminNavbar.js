
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import PaymentIcon from "@material-ui/icons/Payment";
import InsertChartOutlinedOutlinedIcon from "@material-ui/icons/InsertChartOutlinedOutlined";
import ClearIcon from "@material-ui/icons/Clear";


function AdminNavbar() {
  function openNav() {
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.display = "block";
  }
  function closeNav() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidenav").style.display = "none";
  }
  return (
    <div style={{ marginTop: "1%", marginLeft: "1%" }} id="main">
      <div
        id="mySidenav"
        className="sidenav"
        style={{ backgroundColor: "#001933", color: "white" }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 600, marginTop: "-50px" }}>
          {"  "}
          <img alt=""
            src={process.env.PUBLIC_URL + "/images/codingmart.png"}
            width="180"
            height="50"
          />
          &nbsp;&nbsp;
          <button
            onClick={() => closeNav()}
            style={{
              backgroundColor: "#001933",
              height: "45px",
              width: "50px",
              color: "white",
            }}
          >
            <ClearIcon />
          </button>
        </h1>

        <h3>
          <Link to="/home" style={{ fontSize: "20px", marginTop: "30px" }}>
            <HomeOutlinedIcon />
            &nbsp;&nbsp;Home
          </Link>
        </h3>

        <h3>
          <Link to="/employee" style={{ fontSize: "20px", marginTop: "30px" }}>
            <PermIdentityIcon />
            &nbsp;&nbsp; Employee
          </Link>
        </h3>
        <h3>
          <Link to="/payrun" style={{ fontSize: "20px", marginTop: "30px" }}>
            <PaymentIcon />
            &nbsp;&nbsp; Pay Runs
          </Link>
        </h3>
        <h3>
          <Link to="/reimbursements" style={{ fontSize: "20px", marginTop: "30px" }}>
          <CheckBoxOutlinedIcon />
            &nbsp;&nbsp; Reimbursments
          </Link>
        </h3>
     
        <h3>
          <Link to="/reports" style={{ fontSize: "20px", marginTop: "30px" }}>
            <InsertChartOutlinedOutlinedIcon />
            &nbsp;&nbsp; Reports
          </Link>
        </h3>
        <hr></hr>
        <h3>
          <Link
            to="/support"
            style={{
              fontSize: "20px",
              marginTop: "30px",
            }}
          >
            <PermIdentityIcon />
            &nbsp;&nbsp; Contact Support
          </Link>
        </h3>
      </div>
      <button className="btn btn-primary" onClick={() => openNav()}>
        <i className="fa fa-bars"></i>
      </button>
    </div>
  );
}
export default AdminNavbar;
