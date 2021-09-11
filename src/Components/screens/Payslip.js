import React, { useState,useEffect } from 'react';


function Payslip() {
  const [company,setcompany] = useState([])
  const [employee,setempDetails]=useState([])
  const [payslip,setpayslip]=useState([])
  const [earning,setearning]=useState([])
  const [reimbursment,setreimbursment]=useState([])

  const [month,setMonth] = useState('')


  useEffect(()=>{
    const requestOptions2 = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      };
      
      fetch('http://localhost:8080/api/employeePayslip/'+localStorage.getItem("employee_id"), requestOptions2)
      .then(response => response.json())
      .then(data => {
          setpayslip(data[0]);
          console.log(data[0])
          console.log(data[0].employeeName,data[0].reimbursment)
      })
  },[])

    function getData(){
    // Update the document title using the browser API
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        };
        
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem("emp_company_id"), requestOptions)
        .then(response => response.json())
        .then(data => {
            setcompany(data);
            setearning(data.earningsDocArray);
            console.log(earning);
        })

    const requestOptions1 = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      };
      
      fetch('https://payroll-fastify.herokuapp.com/api/employee/'+localStorage.getItem("employee_id"), requestOptions1)
      .then(response => response.json())
      .then(data => {
          setempDetails(data);
          // console.log(data)
      })
      
    }

    const [inputMonth,setInputMonth] = useState('')

  function dateConversion(){
    var date = new Date(month)
    var selectedMonth;
    console.log("date")
    selectedMonth = date.toLocaleString('default',{month:'long'})
    selectedMonth = (selectedMonth + ' ' + date.getFullYear())

    setInputMonth(selectedMonth)

    if(selectedMonth === payslip.payDate){
      getData()
      setreimbursment(payslip.reimbursment)
    }


  }

  function renderData(){
    if(inputMonth){
      console.log("data")
      return (
        <>
          <div className="payslip-header d-flex justify-content-around">
            <div className="company-wrappe1r d-flex">
              
              <div className="company-details">
                <h5>{company.company}</h5>
                <h6>
                  {company.address}
                </h6>
              </div>
            </div>
            <div className="payslip-details">
            
              <h5>Payslip</h5>
              <h6>For the month of {inputMonth}</h6>
            </div>
          </div>

          <div className="employee container">
            <hr className="text-primary" style={{ height: '4px' }} />
            <h4 className="text-primary">EMPLOYEE PAY SUMMARY</h4>
            <div className="container d-flex justify-content-between">
              <table>
                <tbody>
                  <tr>
                    <th>Employee Name</th>
                    <td>: {employee.employeeName} </td>
                  </tr>
                  <tr>
                    <th>Designation</th>
                    <td>: {employee.role}</td>
                  </tr><tr>
                    <th>Employee Email</th>
                    <td>: {employee.employeeEmail} </td>
                  </tr>
                  <tr>
                    <th>Pay Date</th>
                    <td>: {company.payDate}</td>
                  </tr>
                  <tr>
                    <th>Account Number</th>
                    <td>: Dummy </td>
                  </tr> 
                </tbody>
              </table>

              <div className="pay-details text-dark m-3">
                <p>Employee Net Pay</p>
                <h2>₹ {employee.salary}</h2>
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
                  <td  className="text-start">₹ {employee.salary}</td>
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
                  <td className="text-start">₹ {employee.approvedReimbursment}</td>
                </tr>
              </tbody>
            </table>  

            <hr className="text-primary" style={{ height: '4px' }} /> 

            <div style={{background:"#cce2e8", color:"#0b8eb3"}} className="p-3 mt-5">
              <p>Net Pay((Gross Earnings - Deductions)+Reimburstments ) = <span>₹ {employee.salary}</span></p>
            </div>

            <div className="mt-5">
              <h3>Total Net Payable  <strong>₹ {employee.salary}</strong> </h3>
              <hr className="text-primary" style={{ height: '4px'}} /> 
            </div>
        
        </div>
      </>
      )
    }
    return (<p></p>)
  }


  return (
    <div className="payslip container p-4 d-flex flex-column" style={{marginLeft:"10%"}}>
      <div className="filter d-flex mb-4">
        <div className="icon">
          <i className="fas text-info fa-filter" />
        </div>
        &nbsp;
        <h5>Month</h5> &nbsp;
        <input className=" border-0" type="month" id="month" value={month} onChange={(event)=>setMonth(event.target.value)}/>
        <button type="submit" className="btn btn-primary ms-2" onClick={dateConversion}>Get Payslip</button>
      </div>

      {renderData()}
      
    </div>
  );
}
export default Payslip;