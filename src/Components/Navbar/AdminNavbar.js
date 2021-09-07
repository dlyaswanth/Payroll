/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
function AdminNavbar()
{
    function openNav() 
    {
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("mySidenav").style.display = "block";
    }
    function closeNav() 
    {
        document.getElementById("main").style.marginLeft = "0%";
        document.getElementById("mySidenav").style.display = "none";
    }
    return (
        <div style={{marginTop:"1%",marginLeft:"1%"}} id="main">
            <div id="mySidenav" className="sidenav" style={{backgroundColor:"#03045e",color:"white"}}>
                <a className="closebtn" onClick={() => closeNav()} ><i className="far fa-times-circle"></i></a>
                <Link to="/home" >Home</Link>
                <Link to="/employee" >Employee</Link>
                <Link to="/payrun" >Pay run</Link>
                <Link to="/reimbursements">Reimbursements</Link>
                
                <Link to="/reports" >Reports</Link>
                <Link to="/support" >Contact Support</Link>
            </div>
            <button className="btn btn-primary" onClick={() => openNav()}><i className="fa fa-bars"></i></button>
        </div>
    )
}
export default AdminNavbar;