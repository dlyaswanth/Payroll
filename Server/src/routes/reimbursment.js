const {createReimbursment,viewAllReimbursment,viewCompanyReimbursment,viewCompanyReimbursmentList,viewEmployeeReimbursment,editReimbursment,deleteReimbursment} = require("../controllers/reimbursment")
module.exports = async function (fastify, opts, done) {


    fastify.post('/reimbursment',createReimbursment)

    fastify.get('/reimbursment',viewAllReimbursment)

    fastify.get('/companyReimbursment/:companyId',viewCompanyReimbursment)

    fastify.get('/employeeReimbursment/:employeeId',viewEmployeeReimbursment)

    fastify.get('/companyReimbursmentList/:companyId',viewCompanyReimbursmentList)

    fastify.put('/reimbursment/:id',editReimbursment)

    fastify.delete('/reimbursment/:id',deleteReimbursment)

    done()
}
