import React from "react";
function SideBar()
{
    return(
        <div className="card" style={{width: "18rem",float:"left",marginTop:"50px",backgroundColor:"white",marginLeft:"30px"}}>
        <div className="card-body">
          <h5 className="card-title">Payroll</h5>
          <hr />
          <p className="card-text">Organization Setup</p> <hr />
          <p className="card-text">Tax Info</p> <hr />
          <p className="card-text">Pay Schedule</p> <hr />
          <p className="card-text">Statutory</p> <hr />
          <p className="card-text">Salary Components</p>
        </div>
      </div>
    )
}
export default SideBar;