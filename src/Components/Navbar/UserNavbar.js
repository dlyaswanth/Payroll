// /* eslint-disable react/jsx-no-comment-textnodes */
// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react'
// import {Link} from 'react-router-dom'
// function UserNavbar()
// {
//     function openNav() 
//     {
//         document.getElementById("main").style.marginLeft = "250px";
//         document.getElementById("mySidenav").style.width = "250px";
//         document.getElementById("mySidenav").style.display = "block";
//     }
//     function closeNav() 
//     {
//         document.getElementById("main").style.marginLeft = "0%";
//         document.getElementById("mySidenav").style.display = "none";
//     }
//     return (
//         <div style={{marginTop:"1%",marginLeft:"1%"}} id="main">
//             <div id="mySidenav" className="sidenav" style={{backgroundColor:"#03045e",color:"white"}}>
//                 <a className="closebtn" onClick={() => closeNav()}><i className="far fa-times-circle"></i></a>
//                 <Link to="/emphome" >Home</Link>
//                 <Link to="/empsalary" >Salary Details</Link>
//                 <Link to="/employeereimbursements" >Reimbursements</Link>
//             </div>
//             <button className="btn btn-primary" onClick={() => openNav()}><i className="fa fa-bars"></i></button>
//         </div>
//     )
// }
// export default UserNavbar;
import React from "react";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ClearIcon from "@material-ui/icons/Clear";

function UserNavbar() {
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
          <Link to="/emphome" style={{ fontSize: "20px", marginTop: "30px" }}>
            <HomeOutlinedIcon />
            &nbsp;&nbsp;Home
          </Link>
        </h3>

        <h3>
          <Link to="/empsalary" style={{ fontSize: "20px", marginTop: "30px" }}>
            <MonetizationOnIcon />
            &nbsp;&nbsp;Salary Details
          </Link>
        </h3>
        <h3>
          <Link
            to="/employeereimbursements"
            style={{ fontSize: "20px", marginTop: "30px" }}
          >
            <LocalAtmIcon />
            &nbsp;&nbsp;Reimbursements
          </Link>
        </h3>
      </div>
      <button className="btn btn-primary" onClick={() => openNav()}>
        <i className="fa fa-bars"></i>
      </button>
    </div>
  );
}
export default UserNavbar;
