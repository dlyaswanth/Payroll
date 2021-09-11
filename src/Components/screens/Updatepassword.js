import React from 'react';

  

class Updatepassword extends React.Component {

    constructor() {

    super();

    this.state = {

      input: {
        oldpassword:"",
        password:"",
        confirm_password:""
      },

      errors: {}

    };

     

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

     

  handleChange(event) {

    let input = this.state.input;

    input[event.target.name] = event.target.value;

    this.setState({ input});
}

     

  handleSubmit(event) {

    event.preventDefault();

  

    if(this.validate()){

        console.log(this.state);

  

        let input = {};

        input["oldpassword"] = "";

        input["password"] = "";

        input["confirm_password"] = "";

        this.setState({input:input});

  

        alert('Updated Form is submited');

    }

  }

  

  validate(){

      let input = this.state.input;

      let errors = {};

      let isValid = true;

      if (!input["oldpassword"]) {

        isValid = false;

        errors["oldpassword"] = "Please enter your password.";

      }


      if (!input["password"]) {

        isValid = false;

        errors["password"] = "Please enter your new password.";

      }

  

      if (!input["confirm_password"]) {

        isValid = false;

        errors["confirm_password"] = "Please enter your confirm password.";

      }

  

      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

          

        if (input["password"] !== input["confirm_password"]) {

          isValid = false;

          errors["password"] = "Passwords don't match.";

          errors["confirm_password"] = "Passwords don't match.";

        }

      } 

  

      this.setState({

        errors: errors

      });

  

      return isValid;

  }

     

  render() {

    return (

        <div class="container">
        <div class="row justify-content-center align-items-center "  style={{ height:"100vh" }}>
            <div class="col-8 " style={{ marginLeft:"600px" }}>
                <div class="card">
                    <div class="card-body p-5 ">
                    <form onSubmit={this.handleSubmit}>

                            <div> 
                                <p className="fs-2 fw-light">Update Password</p>
                            </div>

                            <div class="form-group my-3">

                                <label for="oldpassword">Enter Your Password:</label>

                                <input 

                                type="password" 

                                name="oldpassword" 

                                value={this.state.input.oldpassword}

                                onChange={this.handleChange}

                                class="form-control" 

                                placeholder="Enter password" 

                                id="oldpassword" />

                                <div className="text-danger">{this.state.errors.oldpassword}</div>

                            </div>




                            <div class="form-group my-3">

                            <label for="password">Enter Your New Password:</label>

                            <input 

                            type="password" 

                            name="password" 

                            value={this.state.input.password}

                            onChange={this.handleChange}

                            class="form-control" 

                            placeholder="Enter new password" 

                            id="password" />



                            <div className="text-danger">{this.state.errors.password}</div>

                            </div>



                            <div class="form-group my-3">

                            <label for="password">Confirm Password:</label>

                            <input 

                            type="password" 

                            name="confirm_password" 

                            value={this.state.input.confirm_password}

                            onChange={this.handleChange}

                            class="form-control" 

                            placeholder="Enter confirm password" 

                            id="confirm_password" />



                            <div className="text-danger">{this.state.errors.confirm_password}</div>

                            </div>



                            <input type="submit" value="Submit" class="btn btn-success my-3" />

                            </form>

                    </div>
                </div>
            </div>
        </div>
    </div>

      
    );

  }

}

  

export default Updatepassword;

