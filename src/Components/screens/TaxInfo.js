import React from 'react';
import { Button} from 'react-bootstrap';
import { Form,Row,Col,Container } from 'react-bootstrap';
import SideBar from "./SideBar";
// import {history} from './History';
import History from './History';
import {ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
class Taxinfo extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {
          pan:"",
          tan:"",
          aocode:"",
          paymentfreq:"Monthly"
        },
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submitTaxinfoForm= this.submitTaxinfoForm.bind(this);

    }

    handleChange(e) {
      // let fields = this.state.fields;
      // fields[e.target.name] = e.target.value;
      // this.setState({
      //   fields
      // });

      // // console.log(e.target.value)
      // // let fields = this.state.fields;
      // // fields[e.target.name] = e.target.value;
      
      const {fields}=this.state;
      this.setState({
       
       fields:{...fields,[e.target.name]:e.target.value}
      });


    }

    submitTaxinfoForm(e) {
      e.preventDefault();
      console.log(this.state.fields)

      if (this.validateForm()) {
        const companyid= localStorage.getItem('company_id');
        e.preventDefault();
        console.log(this.state.fields)
        if (this.validateForm()) {
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              pan : this.state.fields.pan,
              tan : this.state.fields.tan,
              aocode : this.state.fields.aocode,
              taxpaymentfrequency : this.state.fields.paymentfreq
            })
        };
        fetch('https://payroll-fastify.herokuapp.com/api/company/'+companyid, requestOptions)
            .then(console.log(companyid))
            .then(response => response.json())
            .then(data=>{
              if (!data)
                toast.error(data.error,{autoClose:2500})
              else
              {
                  toast.success(data.message,{autoClose:2500})
                  window.open("/payschedule","_self")

                  // history.push('/payschedule')
              }
          })


          let fields = {};
          fields["pan"] = "";
          fields["tan"] = "";
          fields["aocode"] = "";
          this.setState({fields:fields});
          //alert("Form saved");
          
      }
      
    }
  }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["pan"]) {
        formIsValid = false;
        errors["pan"] = "*Please enter pan number.";
      }
      if (typeof fields["pan"] !== "undefined") {
        if (!fields["pan"].match(/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/)) {
          formIsValid = false;
          errors["pan"] = "*Please enter valid pan number.";
        }
      }

      if (!fields["tan"]) {
        formIsValid = false;
        errors["tan"] = "*Please enter tan number.";
      }
      if (typeof fields["tan"] !== "undefined") {
        if (!fields["tan"].match(/^([A-Z]){4}([0-9]){5}([A-Z]){1}?$/)) {
          formIsValid = false;
          errors["tan"] = "*Please enter valid tan number.";
        }
      }

      if (!fields["aocode"]) {
        formIsValid = false;
        errors["aocode"] = "*Please enter tds circle/ao code.";
      }
      if (typeof fields["aocode"] !== "undefined") {
        if (!fields["aocode"].match(/^([A-Z]){3}[/]{1}[A-Z]{2}[/]{1}([0-9]){3}[/]{1}([0-9]){1}?$/)) {
          formIsValid = false;
          errors["aocode"] = "*Format: Area Code / AO Type / Range Code/ AO Number. ";
        }
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
            width: 700, 
            padding: 30 }}>
                 <div className="mb-5">
                <h3>Provide your organisation's tax information </h3>
                <p className="text-muted">These tax details will be displayed in your employees' Form 16.</p>
            </div>
                  <Form method="post"  name="TaxinfoForm"  onSubmit= {this.submitTaxinfoForm}>
                        <Row className="mb-3">

                            <Form.Group as={Col} controlId="formGridLocation">
                            <Form.Label>PAN</Form.Label>
                            <Form.Control type="text" placeholder="AAAAA0000A" name="pan" value={this.state.fields.pan} onChange={this.handleChange}   />
                            <div className="errorMsg">{this.state.errors.pan}</div>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridIndustry">
                             <Form.Label>TAN</Form.Label>
                             <Form.Control type="text" placeholder="AAAA00000A" name="tan" value={this.state.fields.tan} onChange={this.handleChange}   />
                             <div className="errorMsg">{this.state.errors.tan}</div>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridLocation">
                            <Form.Label>TDS circle/AO code</Form.Label>
                            <Form.Control type="text" placeholder="AAA/AA/000/0" name="aocode" value={this.state.fields.aocode} onChange={this.handleChange}   />
                            <div className="errorMsg">{this.state.errors.aocode}</div>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridIndustry">
                            <Form.Label>Tax Payment Frequency</Form.Label>
                            <Form.Control type="text" value="Monthly" name="paymentfreq"  />
                            </Form.Group>
                        </Row>
                      
                        <Row>
                            <Col xs={6}>
                            <Button variant="primary" type="submit" >
                                Save & Continue →
                            </Button>   
                            </Col>
                        </Row>
                    </Form>
            </div>         
        </Container>        
  </>
    );
  }


}


export default Taxinfo;