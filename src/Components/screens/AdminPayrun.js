/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState , useEffect } from "react";
import AdminHeader from '../Navbar/AdminHeader'
import { CSVLink } from "react-csv";
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
function AdminPayrun()
{
    
    const [empDetails,setEmpDetails] = useState([])
    const [benefits,setBenefits] = useState(0)
    const [records,setRecords]=useState('')
    const [hidden,setHidden]=useState(false)

    const headers = [
        { label: "Employee Name", key: "employeeName" },
        { label: "Paid Days", key: "days" },
        { label: "Gross Pay", key: "basicPay" },
        { label: "Deductions", key: "deductions" },
        { label: "Benefits", key: "approvedReimbursment" },   
        { label: "Reimbursemnets", key: "salary" },
        { label: "Net Pay", key: "salary" },
      ];
      var csvValues=[];
      const [csv,setCsv]=useState([])

    useEffect( ()=>{

        async function init(){
            const requestOptions = {
                method: 'GET',      
                headers: { 'Content-Type': 'application/json' },
            };
                
            await fetch('https://payroll-fastify.herokuapp.com/api/companyEmployee/'+localStorage.getItem("company_id"), requestOptions)
            .then(response => response.json())
            .then(data => {
                if(!data.error){
                    setEmpDetails(data.employee);
                    csvValues=data.employee;
                    console.log(empDetails);
                }
            })

            calculateEarnings(JSON.parse(localStorage.getItem('company')).earningsDocArray);
    
        }
        
        init()
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
    function calculateEarnings(data){
        console.log(data);
        var amt = 0;
        data.forEach(element => {
            //console.log(element.amount);
            amt += Number(element.amount);
        });
        console.log(amt);
        setBenefits(amt);
        
        
        csvValues.forEach((items)=>{
            items["days"]=31;
            items["benefits"]=amt;
        })
        console.log(csvValues)
        setCsv(csvValues)
        // setEmpDetails([...empDetails)
    }

    //adding to log array
    function addLog(message){
    
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then(data =>{
            if(!data.error){
                var currentLog = data.logArray;
                currentLog.push(message);

                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        logArray:currentLog
                    })
                };
                
                fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), requestOptions)
                .then(response => response.json())
                .then(res=>{
                    console.log(res);
                })
            }
        })
    }

    //for adding pay date in MMM/YYYY format
    var today = new Date()
    var month = today.toLocaleString('default',{month:'long'})
    var currMonth = String(today.getMonth()+1).padStart(2, '0')

    var dateOfPayment = month + " " + today.getFullYear() 

    var paidArray = [] 

    //Add into PayslipTable
    function addPayslip(){

        var updatedNetPay;

        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then(data =>{
            if(!data.error){
                updatedNetPay = Number(data.employeeNetPay);
            }
        })

        empDetails.forEach(item =>{
           //getting reimbursments by employee
            const requestOptions1 = {
                method: 'GET',      
                headers: { 'Content-Type': 'application/json' },
            };
                
            fetch('https://payroll-fastify.herokuapp.com/api/employeeReimbursment/'+item._id, requestOptions1)
            .then(response => response.json())
            .then(data => {

                if(!data.error){
                    console.log(data)

                    //filtering the reimbursments for a single month
                    var reimbursmentByMonth = []
                    data.forEach(item => {
                        var reimbDate = item.date;
                        reimbDate = reimbDate.slice(3,5)
                        
                        if(reimbDate === currMonth){
                            reimbursmentByMonth.push(item)
                        }
                    })

                    console.log(reimbursmentByMonth)

                    //posting to payslip table
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            companyId: item.companyId,
                            employeeId: item._id,
                            reimbursment: reimbursmentByMonth,
                            employeeName: item.employeeName,
                            payDate: dateOfPayment
                            
                        })
                    };
                    
                    fetch('https://payroll-fastify.herokuapp.com/api/payslip', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if(!data.error){
                            console.log(data); 
                            var temp=item.approvedReimbursment;
                            updatedNetPay = updatedNetPay - temp;
                            const requestOptions2 = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ 
                                    salary:item.salary-temp,
                                    approvedReimbursment : 0
                                })
                            };
                            
                            fetch('https://payroll-fastify.herokuapp.com/api/employee/'+item._id, requestOptions2)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                            })
                        }
                        else{
                            toast.error("Payment Failed! Contact Support Team!",{autoClose:2500})
                            return
                        }
                    })
                }
        
            })
        })

        paidArray = JSON.parse(localStorage.getItem('company')).paidArray;

        //update payDate for next months
        var updatePayDate = JSON.parse(localStorage.getItem('company')).payDate;
        var splitDate = updatePayDate.split('-');

        if(Number(splitDate[1]) >= 12){
            updatePayDate = splitDate[0] + '-01-' + (Number(splitDate[2])+1);
        }
        else{
            updatePayDate = splitDate[0] + '-' + (Number(splitDate[1])+1) + '-' + splitDate[2];
        }
        console.log(updatePayDate)
    
        paidArray.push(dateOfPayment)
        const requestOptions2 = {
            method: 'PUT',      
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paidArray : paidArray,
                payDate : updatePayDate,
                employeeNetPay : updatedNetPay
            })
        };
            
    
        //updating in company table
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), requestOptions2)
        .then(response => response.json())
        .then(data => {
            // console.log("Hi",data);
            if(!data.error){
                localStorage.setItem('company',JSON.stringify(data.updatedCompany));
                var today= new Date();
                today=today.toString()
                today = today.substring(4,today.length-30);
                addLog(JSON.parse(localStorage.getItem('company')).company+"|"+JSON.parse(localStorage.getItem('company')).companyEmail+"|Salary Credited to all Employees|"+today);
            }
        })

        
        
        toast.success('Payment Done Successfully',{autoClose:2500})
        return
        
    } 

    //Date Comparsion
    function checkDate(){
        
        var today=new Date();
        today = String(today.getDate()).padStart(2, '0') + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + today.getFullYear();
        var paydate=JSON.parse(localStorage.getItem('company')).payDate;
        
        if(today===paydate){
            paidArray = JSON.parse(localStorage.getItem('company')).paidArray;
            if(paidArray[paidArray.length-1] === dateOfPayment){
                return(<button disabled className="btn btn-success me-3">Pay All</button>) 
            }
            return (<button className="btn btn-outline-success me-3" onClick={()=>window.confirm("Are you sure to proceed with payment?") && addPayslip()}>Pay all</button>)
        }
        else{
            return(<button disabled className="btn btn-success me-3">Pay All</button>) 
        }

    }
    return (
        <div id="main">
            <ToastContainer/>
            <AdminHeader/>
            <div id="summary">
                <nav className="navbar navbar-expand-lg navbar-light" style={{marginTop:"90px"}} >
                <div className="container-fluid">
                    <b className="navbar-brand" style={{marginLeft:"50px"}}>Active Employees</b>
                    <div className="d-flex">
                        {checkDate()}
                        <button className="btn btn-primary">
                        <CSVLink
                            data={csv}
                            headers={headers}
                            filename="Employee_Payrun_details.csv"
                            style={{ color: "white", textDecoration: "none" }}
                        >
                            Export CSV
                        </CSVLink>
                        </button>
                    </div>
                </div>
                </nav>
                <br />
                <div className="card container employee" >
                    <div className="row align-items-start" style={{marginTop:"5px",marginBottom:"5px"}}>
                        <div className="col"><b>Employee Name</b></div>
                        <div className="col"><b>Paid Days</b></div>
                        <div className="col"><b>Gross Pay</b></div>
                        <div className="col"><b>Deductions</b></div>
                        {/* <div className="col"><b>Taxes</b></div> */}
                        <div className="col"><b>Benefits</b></div>
                        <div className="col"><b>Reimbursements</b></div>
                        <div className="col"><b>Net Pay</b></div>
                    </div>
                </div>

                {
                   empDetails.length === 0
                   ?
                   <div>
                        <div hidden={hidden}>
                            <Loader/>
                        </div>
                        <div hidden>{setTimeout(()=>{setRecords('No Records found');setHidden(true)},5000)}</div>
                        <div className="text-center" style={{marginTop:"40px"}}><b>{records}</b></div>
                    </div>
                   :
                   empDetails.map((item,index) =>{
                    //getReimbursment(item._id)
                    return(
                        <div key={index}>
                            <div  className="row employee" style={{marginTop:"5px",marginBottom:"5px"}}>
                                <div className="col"><p>{item.employeeName}</p></div>
                                <div className="col"><p>31</p></div>
                                <div className="col"><p>₹ {item.basicPay}</p></div>
                                {/* <div className="col"><p>₹ 0.00</p></div> */}
                                <div className="col"><p>₹ {item.deductions}</p></div>
                                <div className="col"><p>₹ {benefits}</p></div>
                                <div className="col"><p>₹ {item.approvedReimbursment}</p></div>
                                <div className="col"><p>₹ {item.salary}</p></div>
                                <div className="w-100 d-none d-md-block"></div>
                            </div>
                        </div>
                    )
                })
                    
                }
                
            </div>
        </div>
    )
}
export default AdminPayrun;