const mongoose = require('mongoose')
const payslipSchema =new mongoose.Schema({
    employeeId: String,
    companyId: String,
    reimbursment: Array,
    payDate: String,
    employeeName: String
 
},{timestamps: true})
module.exports = mongoose.model('Payslip', payslipSchema);
