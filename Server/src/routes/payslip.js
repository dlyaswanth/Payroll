const {createPayslip,viewAllPayslip,viewEmployeePayslip,editPayslip,deletePayslip} = require("../controllers/payslip")
module.exports = async function (fastify, opts, done) {


    fastify.post('/payslip',createPayslip)

    fastify.get('/payslip',viewAllPayslip)

    fastify.get('/employeePayslip/:employeeId/:date',viewEmployeePayslip)

    fastify.put('/payslip/:id',editPayslip)

    fastify.delete('/payslip/:id',deletePayslip)

    done()
}
