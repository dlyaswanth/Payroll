import { BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import SignUpForm from './Components/screens/SignUp';
import Loginpage from './Components/screens/Login';
import AdminHome from './Components/screens/AdminHome';
import AdminEmployee from './Components/screens/AdminEmployee';
import AdminReports from './Components/screens/AdminReports';
import AdminPayrun from './Components/screens/AdminPayrun';
import Statutory from './Components/screens/Statutory';
import AdminReimbursements from './Components/screens/AdminReimbursements';
import AdminSalaryRevision from './Components/screens/AdminSalaryRevision'; 
import Support from './Components/screens/Support';
import SalaryComponents from './Components/screens/SalaryComponents';
import PaySchedule from './Components/screens/PaySchedule';
import Taxinfo from './Components/screens/TaxInfo';
import {OrganizationSetup} from './Components/screens/OrganizationSetup'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Route exact path="/"><SignUpForm/></Route>
        <Route path="/home"><AdminHome /></Route>
        <Route path='/login'><Loginpage /></Route>
        <Route path="/statutory"><Statutory /></Route>
        <Route path="/employee"><AdminEmployee /></Route>
        <Route path="/payrun"><AdminPayrun /></Route>
        <Route path="/reimbursements"><AdminReimbursements /></Route>
        <Route path="/salary-revision"><AdminSalaryRevision /></Route>
        <Route path="/support"><Support /></Route>
        <Route path="/reports"><AdminReports /></Route>
        <Route path="/payschedule"><PaySchedule /></Route>
        <Route path="/organizationsetup"><OrganizationSetup /></Route>
        <Route path="/taxinfo"><Taxinfo /></Route>
        <Route exact path="/salary"><SalaryComponents /></Route>
        </BrowserRouter>
      </header>
    </div>
  );
}
export default App;