import React, { useState , useEffect} from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function SalaryStructure() {
  //const [empPay,setEmpPay] = useState()
  const [earnings,setEarnings]=useState([])
  const [reimbursments,setReimbursments]=useState([]) 

  var totEarning = 0;
  var deductions = JSON.parse(localStorage.getItem('employee')).deductions;
  var reimbursmentAmount = 0;
  var total,newded,reimb,ttamt;
  var yearCTC;
  var reimbursmentByMonth = []

  //fn
  function calculteEarning(){
    earnings.forEach((earning) => { 
      totEarning+= Number(earning.amount) 
    })

    var today = new Date()
    var currMonth = String(today.getMonth()+1).padStart(2, '0')

    reimbursments.forEach(item => {
      var reimbDate = item.date;
      reimbDate = reimbDate.slice(3,5)
      
      if(reimbDate === currMonth && item.status === "Approved"){
          reimbursmentByMonth.push(item)
      }
    })

    
    reimbursmentByMonth.forEach(reimbursment =>{
      if(reimbursment.status === "Approved"){
        reimbursmentAmount += Number(reimbursment.amount)
      }
    })
    //console.log("in func",totamount);
    total = totEarning + deductions + reimbursmentAmount
    newded = (deductions / total) * 100
    reimb = (reimbursmentAmount/ total)*100
    ttamt = (totEarning/total)*100

    dataMock.push({ title: 'Earnings', value: ttamt, color:'#FC9E4F'},
                  { title: 'Reimbursments', value: reimb, color:'#FF521B'},
                  { title: 'Taxes & Deductions', value: newded, color:'#EDD382'})

    //console.log(total,newded,reimb,ttamt);
    yearCTC = (Number(JSON.parse(localStorage.getItem('employee')).basicPay)+totEarning)*12
  }
 


  useEffect(()=>{
    //fetching earnings doc array from company
    const requestOptions1 = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
      
    fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem("emp_company_id"), requestOptions1)
        .then(response => response.json())
        .then(data => {
          if(!data.error){
            setEarnings(data.earningsDocArray);
          }
        })
    //fetching reimbursment od the employee
    const requestOptions2 = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
    fetch('https://payroll-fastify.herokuapp.com/api/employeeReimbursment/'+localStorage.getItem("employee_id"), requestOptions2)
        .then(response => response.json())
        .then(data => {
          if(!data.error){
            setReimbursments(data);
          }
        })
        
        },[])

    

  function dataLength(){
    if(reimbursmentByMonth.length>=1){
      return(
          <h4>Reimburstments</h4>

      )
    }
  }

  const Deduction = 
    {
      name: 'PF Empolyer Contribution',
      money: JSON.parse(localStorage.getItem('employee')).deductions
    };

  var dataMock = [];
  

  const INR =money=>{return (new Intl.NumberFormat('en-IN').format(money))};
  return (
    <div>
      {
        calculteEarning()
      }
      
      <div className="details mb-3">
        <h2>Monthly CTC : ₹{INR(JSON.parse(localStorage.getItem('employee')).salary)}.00</h2>
        <h3 style={{ color: 'grey' }}>Yearly CTC : ₹ {INR(yearCTC)}.00</h3>
      </div>

      <PieChart className="my-2"
          data={dataMock}
          style={{height: '250px', marginright:"px"}}
          lineWidth={25} paddingAngle={5}
          label={({ dataEntry }) => dataEntry.month}
          labelStyle={{
              fontSize: '8px',
              fontFamily: 'sans-serif',
          }}
          labelPosition={0}
          lengthAngle={-360} animate 
        />

       <div className="container mt-5 mb-3" style={{marginLeft:"80px"}}>
        <h4>Pay</h4>
        
            <div className="d-flex justify-content-between">
              <div className="name mb-1">Basic Pay</div>
              <div className="amount mb-1">₹ {INR(JSON.parse(localStorage.getItem('employee')).basicPay)}.00</div>
            </div>
          
      </div>
      
      <div className="container mb-3" style={{marginLeft:"80px"}}>
        <h4>Earnings</h4>
        {
        earnings.map((earning,index) => {
          return (
            <div key={index} className="d-flex justify-content-between">
              <div className="name mb-1">{earning.name}</div>
              <div className="amount mb-1">₹ {INR(earning.amount)}.00</div>
            </div>
          );
        })
        }
      </div>
        <div className="container" style={{marginLeft:"80px"}}>

        {
          dataLength()
        }

        {
          
          reimbursmentByMonth.map((reimbursment,index) => {
         
            if(reimbursment.status==="Approved"){
              return (
                <div key={reimbursment._id} className="d-flex justify-content-between">
                  <div className="name mb-1">{reimbursment.type}</div>
                  <div className="amount mb-1">₹ {INR(reimbursment.amount)}.00</div>
                </div>
              );
            }
            return(
              <span key={index}></span>
            );
            
        })
        }
      </div>
      
      <div className="container mt-3" style={{marginLeft:"80px"}}>
        <h4>Deduction</h4>
            <div className="d-flex justify-content-between">
              <div className="name">{Deduction.name}</div>
              <div className="amount">₹ {INR(Deduction.money)}.00</div>
            </div>
        <hr />
        <div className="d-flex justify-content-end" >
          <h6>Monthly CTC : ₹ {INR(JSON.parse(localStorage.getItem('employee')).salary + reimbursmentAmount)}.00</h6>
        </div>
        <hr className="mb-5"/>
      </div>
    </div>
  );
}