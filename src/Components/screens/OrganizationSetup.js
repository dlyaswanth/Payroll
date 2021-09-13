import React from 'react';
import { Button } from 'react-bootstrap';
import { Form,Row,Col,Container } from 'react-bootstrap';
// import {history} from './History';
import History from './History';
import SideBar from "./SideBar";
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
class OrganizationSetup extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {
          orgname:"",
          buisness:"India",
          industry:"",
          address:"",
          city:"",
          state:"",
          pincode:""

        },
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submitorganisationSetupForm= this.submitorganisationSetupForm.bind(this);

    }

    handleChange(e) {
    //   console.log(e.target.value)
    // //   let fields = this.state.fields;
    //   fields[e.target.name] = e.target.value;
      const {fields}=this.state;
      this.setState({
       
       fields:{...fields,[e.target.name]:e.target.value}
      });

    }

    submitorganisationSetupForm(e) {
      const companyid= localStorage.getItem('company_id');
      e.preventDefault();
      console.log(this.state.fields)
      if (this.validateForm()) {
        
        //api integration
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
                  location : this.state.fields.location,
                  address : this.state.fields.address+","+this.state.fields.city+","+this.state.fields.state+","+this.state.fields.pincode,
                  companyType : this.state.fields.industry
          })
      };
      fetch('https://payroll-fastify.herokuapp.com/api/company/'+localStorage.getItem('company_id'), requestOptions)
          .then(console.log(companyid))
          .then(response => response.json())
          .then(data=>{
            if (data.error)
              toast.error("Setup error! Contact admin!",{autoClose:2500})
            else
            {
                toast.success(data.message,{autoClose:2500})
                window.open("/taxinfo","_self")
                // history.push('/taxinfo');
            }
        })

          //api integration


          let fields = {};
          fields["orgname"] = "";
          fields["address"] = "";
          fields["city"] = "";
          fields["pincode"] = "";
          fields["industry"] = "";
          fields["state"] = "";
          this.setState({fields:fields});
          //alert("Form saved");
          
      }

    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["orgname"]) {
        formIsValid = false;
        errors["orgname"] = "*Please enter your location.";
      }
      if (typeof fields["orgname"] !== "undefined") {
        if (!fields["orgname"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["orgname"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["address"]) {
        formIsValid = false;
        errors["address"] = "*Please enter your address.";
      }

      if (!fields["city"]) {
        formIsValid = false;
        errors["city"] = "*Please enter your city.";
      }
      if (typeof fields["city"] !== "undefined") {
        if (!fields["city"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["city"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["pincode"]) {
        formIsValid = false;
        errors["pincode"] = "*Please enter your pincode.";
      }
      if (typeof fields["pincode"] !== "undefined") {
        if (!fields["pincode"].match(/^[1-9][0-9]{5}$/)) {
          formIsValid = false;
          errors["pincode"] = "*Please enter 6 digit pincode.";
        }
      }

      if (!fields["industry"]) {
        formIsValid = false;
        errors["industry"] = "*Please select valid field.";
      }

      if (!fields["state"]) {
        formIsValid = false;
        errors["state"] = "*Please select valid field.";
      }

      this.setState({
        errors: errors
      });
      return formIsValid;


    }
   


  render() {
    return (
      <>
       <SideBar />
       <ToastContainer />
       <History />
        <Container style={{marginLeft:"30%"}}>
            <div style={{ display: 'block', 
            maxWidth: 700, 
            width:"90%",
            padding: 30 }}>
                 <div className="mb-5">
                <h3>Let's get started</h3>
                <p className="text-muted">Tell us a bit about your organisation.</p>
            </div>
                  <Form method="post"  name="organisationSetupForm"  onSubmit= {this.submitorganisationSetupForm}>
                        <Form.Group className="mb-3" controlId="formOrgname">
                            <Form.Label>Organisation Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter organisation name" name="orgname"  onChange={this.handleChange}  />
                            <div className="errorMsg">{this.state.errors.orgname}</div>
                        </Form.Group>
           
                       <Row className="mb-3">

                           <Form.Group as={Col} controlId="formGridLocation">
                           <Form.Label>Buisness Location</Form.Label>
                           <Form.Control type="text" placeholder="Enter location" name="buisness" defaultValue="India" />
                           </Form.Group>

                            <Form.Group as={Col} controlId="formGridIndustry">
                            <Form.Label>Industry</Form.Label>
                               <Form.Select  name="industry" onChange={this.handleChange} placeholder="Select an Industry">
                               <option value='Select'>Select an industry type...</option>
                                   <option value="Agriculture">Agriculture</option>
                                   <option value="Aerospace">Aerospace</option>
                                   <option value="Art & Design">Art & Design</option>
                                   <option value="Automotive">Automotive</option>
                                   <option value="Construction">Construction</option>
                                   <option value="Consulting">Consulting</option>
                                   <option value="Computer Industry">Computer Industry</option>
                                   <option value="Education Industry">Education Industry</option>
                                   <option value="Entertainment Industry">Entertainment Industry</option>
                                   <option value="Energy Industry">Energy Industry</option>
                                   <option value="Electronics Industry">Electronics Industry</option>
                                   <option value="Food Industry">Food Industry</option>
                                   <option value=" Health care Industry"> Health care Industry</option>
                                   <option value="Food Industry">Food Industry</option>
                                   <option value="Manufacturing Industry">Manufacturing Industry</option>
                                   <option value="Music Industry">Music Industry</option>
                                   <option value="Mining Industry">Mining Industry</option>
                                   <option value="News Media Industry">News Media Industry</option>
                                   <option value="Networking Industy">Networking Industy</option>
                                   <option value="Pharmaceutical Industry">Pharmaceutical Industry</option>
                                   <option value="Telecommunication Industry">Telecommunication Industry</option>
                                   <option value="Transport Industry">Transport Industry</option>
                                   <option value="Worldwide web">Worldwide web</option>
                               </Form.Select> 
                              <div className="errorMsg">{this.state.errors.industry}</div> 
                           </Form.Group>
                       </Row> 
    
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Organisation Address
                            <p className="text-muted fw-lighter">This will be considered as the address of your primary location.</p>  
                            </Form.Label>
                            <Form.Control type="text" placeholder="Address" name="address"  onChange={this.handleChange}  />
                            <div className="errorMsg">{this.state.errors.address}</div>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" name="city"  onChange={this.handleChange}/>
                            <div className="errorMsg">{this.state.errors.city}</div>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                    <Form.Select  name="state"  onChange={this.handleChange}>
                                     <option value='Select'>Select a state...</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>   
                                        <option value="Maharastra">Maharastra</option>       
                                    </Form.Select>
                                    <div className="errorMsg">{this.state.errors.state}</div> 
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control type="text" placeholder="Pincode" name="pincode"  onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.pincode}</div>
                            </Form.Group>
                        </Row>     
                        <Button variant="primary" type="submit" >
                            Save & Continue →
                        </Button>
                    </Form>
            </div>         
        </Container>        
        </>
    );
  }


}


export {OrganizationSetup};