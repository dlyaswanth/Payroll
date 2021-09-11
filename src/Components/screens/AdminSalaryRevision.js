import AdminHeader from '../Navbar/AdminHeader'
function AdminSalaryRevision()
{
    // function Search(emp_name)
    // {
    //     console.log(emp_name);
    // }
    return (
        <div id="main">
            <AdminHeader/>
            <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}}>
                <div className="container-fluid">
                    <b className="navbar-brand" style={{marginLeft:"50px"}}>All Revisions</b>
                    <div className="d-flex">
                    <button className="btn btn-outline-secondary"><i className="fas fa-filter"></i>&nbsp;Filter</button>
                    </div>
                </div>
            </nav>
            <br />
            <div className="card container employee">
                <div className="row" style={{marginTop:"5px",marginBottom:"5px"}}>
                    <div className="col"><b>Employee Name</b></div>
                    <div className="col"><b>Revision Type</b></div>
                    <div className="col"><b>Payout Month</b></div>
                    <div className="col"><b>Status</b></div>
                    <div className="col"><b>Current CTC</b></div>
                    <div className="col"><b>Revised CTC</b></div>
                </div>
            </div>
            <div className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>
                <div className="col"><p>User 01</p></div>
                <div className="col"><p>Flat Amount</p></div>
                <div className="col"><p>Mar 2022</p></div>
                <div className="col-6 col-sm-2"><p style={{color:"orange"}}>Pending</p></div>
                <div className="col"><p>₹ 8,50,000</p></div>
                <div className="col"><p>₹ 10,50,000</p></div>
                <div className="w-100 d-none d-md-block"></div>
            </div>
        </div>
    )
}
export default AdminSalaryRevision;