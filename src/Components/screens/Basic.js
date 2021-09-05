/* eslint-disable react/jsx-no-duplicate-props */
import '../../App.css';
import SideBar from "./SideBar";
import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

function Basic() {

  const [isOpen, setIsOpen] = useState(false);
  const [epfnum, setEpfnum] = useState('');
  const [empcont1, setEmpcont1] =useState('12% of Actual PF Wage');
  const [empcont2, setEmpcont2] =useState('12% of Actual PF Wage');
  const [dc, setDc] =useState('Monthly');
  const [dc1, setDc1] =useState('Monthly');
  const [dc2, setDc2] =useState('Monthly');
  const [esinum, setEsinum] = useState('');
  const [worl, setWorl] = useState('Head Office (Andhra Pradesh)');
  const [ptnum, setPtnum] = useState('');
  const [onenum, setOnenum] = useState('1');
  const [twnum, setTwnum] = useState('');
  const [thrnum, setThrnum] = useState('');
  const [frnum, setFrnum] = useState('');
  const [finum, setFinum] = useState('');
  const [sinum, setSinum] = useState('');
  const [senum, setSenum] = useState('');
  const [einum, setEinum] = useState('');
  const [ninum, setNinum] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const statutory = {epfnum,empcont1,empcont2,dc,dc1,dc2,esinum,worl,ptnum,
    onenum,twnum,thrnum,frnum,finum,sinum,senum,einum,ninum}
    console.log(statutory);
  //  console.log(epfnum);

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      epfnumber : statutory.epfnum,
      empcontributionrate :statutory.empcont1,
      empstateinsurance : statutory.esinum,
      proftax: statutory.ptnum
    })
};
fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), requestOptions)
    .then(console.log(localStorage.getItem('company_id')))
    .then(response => response.json())

  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container">
      <SideBar />
    <div style={{marginLeft:"28%",marginTop:"8%"}}>
          <h3 style={{marginLeft:"28%"}}>Configure PF, ESI, and Professional Tax </h3>
          <h6 style={{marginLeft:"28%"}}>These benefits and taxes are recommended by the government for your employees. Enable the components</h6>
          <h6 style={{marginLeft:"28%"}}>that are applicable to your organisation.</h6> <br/>

          <h3 style={{marginLeft:"28%"}}>Employees' Provident Fund (EPF)</h3>
          <h6 style={{marginLeft:"28%"}}>Any organisation with 20 or more employees must register for the Employee Provident Fund (EPF) scheme,</h6>
          <h6 style={{marginLeft:"28%"}}>a retirement benefit plan for all salaried employees.</h6>  

          <div id="App2">
          <div class="container1">

          <form onSubmit={handleSubmit}> 
            <div class="form-group col-md-4">
        <label for="epfnum1">EPF Number</label>
        <input type="text" class="form-control" id="epfnum1" value= {epfnum} onChange={(e) => setEpfnum(e.target.value)} aria-describedby="emailHelp" placeholder="AA/AAA/0000000/000"/>
      </div>
      <br/>

      <div class="form-group col-md-4">
        <label for="ecr1">Employer Contribution Rate</label>
        <select class="form-select"  value= {empcont1} onChange={(e) => setEmpcont1(e.target.value)}>
      <option>12% of Actual PF Wage</option>
      <option>Restrict Contribution to ₹15,000 of PF Wage</option>
    </select>
      </div>
      <br/>

      <div class="form-group col-md-4">
        <label for="ecr2">Employee Contribution Rate</label>
        <select class="form-select"  value= {empcont2} onChange={(e) => setEmpcont2(e.target.value)}>
      <option>12% of Actual PF Wage</option>
      <option>Restrict Contribution to ₹15,000 of PF Wage</option>
    </select>
    </div>

    <br/>

        <div class="form-group col-md-4">
        <label for="dc1">Deduction Cycle</label>  <i className="fa fa-info" data-toggle="tooltip" data-placement="bottom" title="Provident Fund (PF) contributions for each month should be deposited to the Employee Provident Fund Organisation (EPFO) within the 15th of the following month"></i>
        <input type="text" class="form-control" id="dc1" aria-describedby="emailHelp" value= {dc} onChange={(e) => setDc(e.target.value)} disabled/>
      </div>
      <br/>
      <div>
          <Button color="white" class="btn btn-link" onClick={toggle} style={{ marginBottom: '1rem',color:'#0066ff' }}><i className="fa fa-caret-down"> View Sample Calculation</i></Button>
          <Collapse isOpen={isOpen}>
            <Card>
              <CardBody id="samplecalc">
            Lets Assume the PF Wage is ₹20,000. The breakup of contribution will be:
            <br/>
            Employees' Contribution
            <br/>
            EPF = 12% of 1500 = ₹ 1800
            <br/>
            Employer's Contribution
            <br/>
            EPS = 8.33% of PF Wage (Maximum of ₹ 15,000) = 8.33% of 15000 = ₹ 1250
            <br/>
            EPF = 12% of PF Wage - EPS = 1800 (12% of 15000) - ₹ 1250 = ₹ 550

              </CardBody>
            </Card>
          </Collapse>
        </div>

    <br/>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
      <label class="form-check-label" for="defaultCheck1">
      Include employer's contribution in the CTC
      </label>
    </div>

    <div class="form-check form-check-inline" >
      <input class="form-check-input" type="checkbox" value="" id="inlineCheckbox1"/>
      <label class="form-check-label" for="inlineCheckbox1">
        Override PF contribution rate at employee level
      </label>
    </div>
    <br/>
    <h6>PF Configuration when LOP Applied</h6>
    <br/>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="prorate1"/>
      <label class="form-check-label" for="defaultCheck1">
        <h6>Pro-rate Restricted PF wage</h6>
        PF contribution will be pro-rated based on the number of days worked by the employee.
      </label>
    </div>
    <br/>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="lop1" checked/>
      <label class="form-check-label" for="defaultCheck1">
        <h6>Consider all applicable PF components if PF wage is less than 15k after Loss of Pay</h6>
        PF wage will be computed using the salary earned in that particular month (based on LOP) rather than
        the actual amount mentioned in the salary structure.

        <div style={{marginLeft:"-5px",marginTop:"5px"}}>

    <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i className="fa fa-eye">  View Sample Calculation
      </i>
    </button>


    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Sample LOP based EPF Calculation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
        <h6>Let's assume the salary split-up considered for EPF is as shown below with PF wage restricted to ₹ 15,000</h6>
        <table id="table">
      <tr>
        <th>SALARY COMPONENTS</th>
        <th>EARNINGS as mentioned in the CTC</th>
        <th>EARNINGS with 10 days of LOP</th>
      </tr>
      <tr>
        <td><b>Basic : </b> Always considered for EPF</td>
        <td>₹ 18,000</td>
    <td> ₹ 12,000</td>
      </tr>
      <tr>
        <td><b>Transport Allowance : </b>
    Considered for EPF only when PF wage {'<'} ₹ 15,000</td>
        <td>₹ 15,000</td>
        <td>₹ 2,666</td>
      </tr>
      <tr>
        <td><b>Telephone Allowance : </b>
    Considered for EPF only when PF wage {'<'} ₹ 15,000</td>
        <td>₹ 3,000</td>
        <td>₹ 2,000</td>
      </tr>
    </table>
          </div>
        <div class="container">
            <div class="row">
            <div class="col-md-6" style={{backgroundColor:"lavender"}}>
            <h5 style={{fontSize:"12px"}}>THE OPTION IS NOT ENABLED</h5>
            <h6>EPF = 12% of 12000 = ₹ 1,440</h6>
            <h5 style={{fontSize:"10px"}}>(Basic in CTC {'>'} ₹ 15,000)</h5>
            <h5 style={{fontSize:"15px"}}>Here, Basic is 18k (as given in the salary split-up), which is more than the (Always)restricted PF wage of 15k. Hence, only the Basic component is considered for EPF Computation.</h5>
            </div>
            <div class="col-md-6" style={{backgroundColor:"#FAECEA"}}>
            <h5 id="enable" style={{fontSize:"12px"}}>THE OPTION IS ENABLED</h5>
            <h6>EPF = 12% of 15000 = ₹ 1,800</h6>
            <h5 style={{fontSize:"10px"}}>(Basic + Transport Allowance + Telephone Allowance {'>'} ₹ 15,000)</h5>
            <h5 style={{fontSize:"15px"}}>Here, Basic is 12k, which is less than the PF wage Restriction of 15k, hence other PF components such as Travelling Allowance and Telephone Allowance are included in the PF wage computation to bring the EPF to 15k.</h5>
            </div>
            </div>
        </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" style={{marginRight:"980px"}}>Okay, got it!</button>
          </div>
        </div>
      </div>
    </div>
    </div>

      </label>
    </div>
    <br/>
    <button type="submit" class="btn btn-link"> <i className="fa fa-check"> Enable</i></button>
    <button type="button" class="btn btn-link"> <i className="fa fa-times"> Cancel</i></button><br/><br/>
    </form>

    <h3 style={{marginLeft:"1%"}}>Employees' State Insurance (ESI)</h3>
    <h6 style={{marginLeft:"1%"}}>Organisations having 10 or more employees must register for Employee State Insurance (ESI). This scheme</h6>
    <h6 style={{marginLeft:"1%"}}>provides cash allowances and medical benefits for employees whose monthly salary is less than ₹21,000.</h6>
    </div>
    </div>

    <div className="App3">
    <div class="container1">

    <form onSubmit={handleSubmit}>
    <div class="form-group col-md-4">
    <label for="esi2">ESI Number</label>
    <input type="text" class="form-control"  value= {esinum} onChange={(e) => setEsinum(e.target.value)} id="esi2" aria-describedby="emailHelp" placeholder="00-00-000000-000-0000"/>
    </div>
    <br/>

    <div class="form-group col-md-4">
        <label for="dc2">Deduction Cycle</label>  <i className="fa fa-info" data-bs-toggle="tooltip" data-bs-placement="top" title="Provident Fund (PF) contributions for each month should be deposited to the Employee Provident Fund Organisation (EPFO) within the 15th of the following month"></i>
        <input type="text" class="form-control"  value= {dc1} onChange={(e) => setDc1(e.target.value)} id="dc2" aria-describedby="emailHelp" value="Monthly" disabled/>
      </div>
      <br/>

      <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="ec2"/>
      <label class="form-check-label" for="defaultCheck1">
        Include employer's contribution in the CTC
      </label>
    </div>
    <br/>

    <button type="submit" class="btn btn-link"> <i className="fa fa-check"> Enable</i></button>
    <button type="button" class="btn btn-link"> <i className="fa fa-times"> Cancel</i></button>
    </form>

    </div>
    </div><br/><br/>

    <h3 style={{marginLeft:"30%"}}>Professional Tax (PT)</h3>
    <h6 style={{marginLeft:"30%"}}>This tax is levied on an employee’s income by the State Government. Tax slabs differ in each state.</h6>
    <br/>
    <h6 style={{marginLeft:"30%"}}>Note: Professional Tax has been enabled for your organisation by default based on your organisation's location and you cannot display it.</h6>
    <br/>

    <CardBody id="samplecalc1">
      <form onSubmit={handleSubmit}>
        <div class="form-group col-md-4">
        <label for="wl">Work Location</label>
        <input type="text" class="form-control" id="wl" value= {worl} onChange={(e) => setWorl(e.target.value)} aria-describedby="emailHelp" value="Head Office (Andhra Pradesh)" disabled/>
      </div>
      <br/>

      <div class="form-group col-md-4">
        <label for="pt1">PT Number</label>
        <input type="text" class="form-control" id="pt1" value= {ptnum} onChange={(e) => setPtnum(e.target.value)} aria-describedby="emailHelp" placeholder="Enter PT Number"/>
      </div>
      <br/>

      <div class="form-group col-md-4">
        <label for="dc3">Deduction Cycle</label>  <i className="fa fa-info" data-tip="Provident Fund (PF) contributions for each month should be deposited to the Employee Provident Fund Organisation (EPFO) within the 15th of the following month" data-for='toolTip1' data-place='top'></i>
        <input type="text" class="form-control" id="dc3" value= {dc2} onChange={(e) => setDc2(e.target.value)} aria-describedby="emailHelp" value="Monthly" disabled/>
      </div>
      <br/>

      <div id="viewdet">
          <Button color="white" onClick={toggle} style={{ marginBottom: '1rem', color:'#0066ff'}}><i className="fa fa-caret-down">  Tax Slabs based on Monthly Gross Salary</i></Button>
          <Collapse isOpen={isOpen}>
            <Card>
              <CardBody id="samplecalc2">
              <div class="container2"> 

      <table class="table table-condensed">
        <thead>
          <tr>
            <th>START RANGE (₹)</th>
            <th>END RANGE (₹)</th>
            <th>MONTHLY TAX AMOUNT (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><div class="form-group col-md-5">
        <input type="number" class="form-control" id="ts1" value= {onenum} onChange={(e) => setOnenum(e.target.value)} value="1" disabled/>
      </div></td>
            <td><div class="form-group col-md-5">
        <input type="number" class="form-control" id="ts2" value= {twnum} onChange={(e) => setTwnum(e.target.value)} placeholder="15,000" />
      </div></td>
            <td><div class="form-group col-md-5">
        <input type="number" class="form-control" id="ts3" value= {thrnum} onChange={(e) => setThrnum(e.target.value)} placeholder="0" />
      </div></td>
          </tr>
          <tr>
            <td><div class="form-group col-md-5">
        <input type="number" class="form-control" id="ts4" value= {frnum} onChange={(e) => setFrnum(e.target.value)} placeholder="15,001"/>
      </div></td>
            <td><div class="form-group col-md-5">
        <input type="number" class="form-control" id="ts5" value= {finum} onChange={(e) => setFinum(e.target.value)} placeholder="20,000"/>
      </div></td>
            <td><div class="form-group col-md-5">
        <input type="number" class="form-control" id="ts6" value= {sinum} onChange={(e) => setSinum(e.target.value)} placeholder="150"/>
      </div></td>
          </tr>
          <tr>
            <td><div class="form-group col-md-5">
        <input type="number" class="form-control" id="ts7" value={senum} onChange={(e) => setSenum(e.target.value)} placeholder="20001"/>
      </div></td>
            <td><div class="form-group col-md-5">
        <input type="number" class="form-control" id="ts8" value= {einum} onChange={(e) => setEinum(e.target.value)} placeholder="999999999"/>
      </div></td>
            <td><div class="form-group col-md-5">
        <input type="number" class="form-control" id="ts9" value= {ninum} onChange={(e) => setNinum(e.target.value)} placeholder="200"/>
      </div></td>
          </tr>
        </tbody>
      </table>
    </div>

              </CardBody>
            </Card>
          </Collapse>
        </div>


      <br/>

    <button type="submit" class="btn btn-link"> <i className="fa fa-check"> Save</i></button>
    <button type="button" class="btn btn-link"> <i className="fa fa-times"> Cancel</i></button>
    </form>
    </CardBody><br/><br/>

    <h6 style={{marginLeft:"28%"}}>You can edit your statutory components anytime by navigating to Settings {'>'} Statutory Components.</h6>


        
        
  </div>
</div>

  );
}
export default Basic;
