import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';


function Payslip() {
  const [company,setcompany] = useState([])
  const [employee,setempDetails]=useState([])
  const [payslip,setpayslip]=useState([])
  const [earning,setearning]=useState([])
  const [reimbursment,setreimbursment]=useState([])

  const [month,setMonth] = useState('')
  var totEarning = 0
  var reimbursmentAmount = 0
  const [currPayDate,setCurrPayDate] = useState('')

  function calculteEarning(){
    earning.forEach((earn) => { 
      totEarning+= Number(earn.amount) 
    })
    
    reimbursment.forEach(reimbursments =>{
      if(reimbursments.status === "Approved"){
        reimbursmentAmount += Number(reimbursments.amount)
      }
    })
  }

    function getData(){
    // Update the document title using the browser API
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        };
        
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem("emp_company_id"), requestOptions)
        .then(response => response.json())
        .then(data => {
          if(!data.error){
            setcompany(data);
            setearning(data.earningsDocArray);
            var PayDate = data.payDate.split('-');
            var curmonth = (Number(PayDate[1])-1).toString().padStart(2,'0');
            setCurrPayDate(PayDate[0]+'-'+curmonth+'-'+PayDate[2]);
            console.log(earning);
          }
        })

    const requestOptions1 = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      };
      
      fetch('https://payroll-fastify.herokuapp.com/api/employee/'+localStorage.getItem("employee_id"), requestOptions1)
      .then(response => response.json())
      .then(data => {
        if(!data.error){
          setempDetails(data);
          // console.log(data)
        }
      })
      
    }


  function dateConversion(){
    var date = new Date(month)
    console.log("date")
    var curr = (date.toLocaleString('default',{month:'long'}))
    var selectedMonth = curr + ' ' + date.getFullYear()

    console.log(selectedMonth)

    const requestOptions2 = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      };
      
      fetch('https://payroll-fastify.herokuapp.com/api/employeePayslip/'+localStorage.getItem("employee_id")+'/'+selectedMonth, requestOptions2)
      .then(response => response.json())
      .then(data => {
        if(!data.error){
          console.log(data);
          if(data.length !== 0){
            setpayslip(data[0]);
            setreimbursment(data[0].reimbursment)
            console.log(data)
          }
          else{
            setcompany([])
            setempDetails([])
            setreimbursment([])
            setpayslip([])
            toast.error('No Payslip Found for Selected Month',{autoClose:2000})
            return
          }
        }
    })

    getData()
    

  }

  

  function renderData(){
    console.log(payslip,company,employee,reimbursment)
    if(payslip.length !== 0 && company.length !== 0 && employee.length !== 0){
      console.log("data")
      return (
        <div className="border border-dark mt-4">
          {calculteEarning()}
          <div className="payslip-header d-flex justify-content-around mt-4">
            <div className="company-wrappe1r d-flex">
              
              <div className="company-details col-8 ms-5">
                <h4>{company.company}</h4>
                <p> 
                  {company.address}
                </p>
              </div>
            </div>
            <div className="payslip-details col-4 my-4">
            
              <h5>Payslip</h5>
              <p>For the month of {payslip.payDate}</p>
            </div>
          </div>

          <div className="employee container">
            <hr className="text-primary" style={{ height: '4px' }} />
            <h4 className="text-primary">EMPLOYEE PAY SUMMARY</h4>
            <div className="container d-flex justify-content-between">
              {/* <div className="col-8">
                <h5 className="d-inline">Employee Name</h5>
                <p className="d-inline">: {employee.employeeName} </p>
                <h5>Employee Name</h5>
                <p>: {employee.employeeName} </p>
              </div> */}
              <table className="col-8 g-2">
                <tbody>
                  <tr style={{height:"2px"}}>
                    <th className="text-start">Employee Name</th>
                    <td>: {employee.employeeName} </td>
                  </tr>
                  <tr>
                    <th className="text-start">Designation</th>
                    <td>: {employee.role}</td>
                  </tr><tr>
                    <th className="text-start">Employee Email</th>
                    <td>: {employee.employeeEmail} </td>
                  </tr>
                  <tr>
                    <th className="text-start">Pay Date</th>
                    <td>: {currPayDate}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Account Number</th>
                    <td>: {employee.accNumber} </td>
                  </tr> 
                </tbody>
              </table>

              <div className="pay-details text-dark m-3 col-4">
                <p>Employee Net Pay</p>
                <h2>₹ {Number(employee.salary) + reimbursmentAmount}</h2>
                {/* <p>Paid Date 31 LOP: 0</p> */}
              </div>
            </div>
            <hr className="text-primary" style={{ height: '4px' }} /> 
            <table className="table table-borderless">
              <thead>
                <tr className="text-primary">
                  <th scope="col" className="text-start">EARNINGS</th>
                  <th scope="col" className="text-start">AMOUNT</th>
                  <th scope="col" className="text-start">YTD</th>
            
                </tr>
              </thead>
              <tbody>
              <tr>
                <td className="text-start">Basic</td>
                <td className="text-start">₹ {employee.basicPay}</td>
                <td className="text-start">₹ {Number(employee.basicPay)*12}</td>
              </tr>
                {
                    earning.map((items,index)=>{
                    return(
                    
                  
                      <tr key={index}>
                        <td className="text-start">{items.name}</td>
                        <td className="text-start">₹ {items.amount}</td>
                        <td className="text-start">₹ {items.amount*12}</td>
                      </tr>
                      
                
                  )})
                }   
                <tr>
                  <th scope="row"  className="text-start">Gross Pay</th>
                  <td  className="text-start">₹ {totEarning + Number(employee.basicPay)}</td>
                </tr>
              </tbody>
            </table>
            <hr className="text-primary" style={{ height: '4px'}} /> 
            <table className="table table-borderless">
              <thead>
                <tr className="text-primary">
                  <th scope="col" className="text-start">DEDUCTIONS</th>
                  <th scope="col" className="text-start">(-)AMOUNT</th>
                  <th scope="col" className="text-start">YTD</th>
              
                </tr>
          
              </thead>
              <tbody>
                <tr>
                  <td className="text-start">EPF CONTIBUTION</td>
                  <td className="text-start">₹ {employee.deductions}</td>
                  <td className="text-start">₹ {employee.deductions*12}</td>
                </tr>
              </tbody>
            </table>

            <hr className="text-primary" style={{ height: '4px'}} /> 
            <table className="table table-borderless">
              <thead>
                <tr className="text-primary">
                  <th scope="col" className="text-start">REIMBURSTMENTS</th>
                  <th scope="col" className="text-start">AMOUNT</th>
                  <th scope="col" className="text-start" >YTD</th>
              
                </tr>
      
              </thead>
              <tbody>
                {
                  reimbursment.map((items,index)=>{
                    if(items.status === "Approved"){
                      return(
                        <tr key={index}>
                            <td className="text-start">{items.type}</td>
                            <td className="text-start">₹ {items.amount}</td>
                            <td className="text-start">₹ {items.amount*12}</td>
                        </tr>    
                    )}
                    return (<></>)
                  })
                }  
                <tr>
                  <th scope="row"  className="text-start">Total Reimburstments</th>
                  <td className="text-start">₹ {reimbursmentAmount}</td>
                </tr>
              </tbody>
            </table>  

            <hr className="text-primary" style={{ height: '4px' }} /> 

            <div style={{background:"#cce2e8", color:"#0b8eb3"}} className="p-3 mt-5">
              <p>Net Pay((Gross Earnings - Deductions)+Reimburstments ) = <span>₹ {Number(employee.salary)+reimbursmentAmount}</span></p>
            </div>

            <div className="mt-5">
              <h3>Total Net Payable  <strong>₹ {Number(employee.salary)+reimbursmentAmount}</strong> </h3>
              <hr className="text-primary mb-5" style={{ height: '4px'}} /> 
            </div>
        
        </div>
      </div>
      )
    }
    return (<p></p>)
  }


  return (
    <div className="payslip container p-4 d-flex flex-column" style={{marginLeft:"10%"}}>
      <ToastContainer />
      <div className="filter d-flex mb-4">
        <label className="mt-2 me-2"><h6>Month</h6></label>
        <input className="form-control w-25" type="month" id="month" value={month} onChange={(event)=>setMonth(event.target.value)}/>
        <button type="submit" className="btn btn-primary ms-2" onClick={dateConversion}>Get Payslip</button>
      </div>
      <hr />

      {renderData()}
      
    </div>
  );
}
export default Payslip;