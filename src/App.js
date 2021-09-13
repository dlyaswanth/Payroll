import { BrowserRouter,Route} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'
import './App.css';
import SignUpForm from './Components/screens/SignUp';
import Loginpage from './Components/screens/Login';
import AdminHome from './Components/screens/AdminHome';
import AdminEmployee from './Components/screens/AdminEmployee';
import AdminReports from './Components/screens/AdminReports';
import AdminPayrun from './Components/screens/AdminPayrun';
import Statutory from './Components/screens/Statutory';
import AdminReimbursements from './Components/screens/AdminReimbursements';

import Support from './Components/screens/Support';
import SalaryComponents from './Components/screens/SalaryComponents';
import PaySchedule from './Components/screens/PaySchedule';
import Taxinfo from './Components/screens/TaxInfo';
import {OrganizationSetup} from './Components/screens/OrganizationSetup'
import EmployeeReimbursements from './Components/screens/EmployeeReimbursements';
import EmpLoginpage from './Components/screens/empLogin';
import UserHome from './Components/screens/UserHome'
import UserSalary from './Components/screens/UserSalary';
import {value} from './Components/screens/Login'

function App() {
  // const [state,setState]=useState(false)
  function renderList()
  {
    if (localStorage.getItem('company_id') || value === true)
    {
      // setState(true)
      return (
        <div>
          <Route exact path="/"><SignUpForm/></Route>
          <Route path="/home"><AdminHome /></Route>
          <Route path='/login'><Loginpage /></Route>
          <Route path="/statutory"><Statutory /></Route>
          <Route path="/employee"><AdminEmployee /></Route>
          <Route path="/payrun"><AdminPayrun /></Route>
          <Route path="/reimbursements"><AdminReimbursements /></Route>
 
          <Route path="/support"><Support /></Route>
          <Route path="/reports"><AdminReports /></Route>
          <Route path="/payschedule"><PaySchedule /></Route>
          <Route path="/organizationsetup"><OrganizationSetup /></Route>
          <Route path="/taxinfo"><Taxinfo /></Route>
          <Route exact path="/salary"><SalaryComponents /></Route>
         
        </div>
      )
    }
    else if(localStorage.getItem('employee_id') || value === true ){
      return(
        <div>
          <Route path="/emphome"><UserHome /></Route>
          <Route path="/employeereimbursements"><EmployeeReimbursements /></Route>
          <Route path="/empsalary"><UserSalary /></Route>
        </div>
      )
    }
    else
    return (
      <div>
        <Route exact path="/"><SignUpForm/></Route>
        <Route path='/emplogin'><EmpLoginpage /></Route>
        <Route path='/login'><Loginpage /></Route>
        {/* <Route path='/course'><Coursecard/></Route> */}
      </div>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        {renderList()}
        </BrowserRouter>
      </header>
    </div>
  );
}
export default App;