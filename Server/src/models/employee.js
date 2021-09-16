const mongoose = require('mongoose')
const employeeSchema =new mongoose.Schema({

    companyId : String,
    employeeName : String,
    employeeEmail : String,
    password : String,
    employeeAddress : String,
    salary : Number,
    basicPay : Number,
    approvedReimbursment : Number,
    deductions : Number,
    role : String,
    companyName : String,
    dateOfBirth : String,
    accNumber : String,
    workLocation : String
    
},{timestamps: true})
module.exports = mongoose.model('Employee', employeeSchema);
