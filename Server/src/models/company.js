const mongoose = require('mongoose')
const companySchema =new mongoose.Schema({

    //company details
    company : String,
    companyEmail : String,
    password : String,
    location : String,
    address : String,
    companyType : String,
    workLocation : Array,

    //pay schedule
    payDate : String,
    payRollStartFrom : String,
    workdays  : Array,
    workHours  : Number,
    
    //tax details
    pan : String,
    tan : String,
    aocode : String,
    taxpaymentfrequency : String,

    //Statutory
    epfnumber : String,
    empcontributionrate : String,
    empstateinsurance : String,
    proftax : String,

    //earnings and reimbursment
    earningsDocArray : Array,
    reimbursmentArray : Array,
    employeeNetPay : Number,
    employeeCount : Number,
    logArray : Array,

    //payment
    paidArray : Array

},{timestamps: true})
module.exports = mongoose.model('Company', companySchema);



