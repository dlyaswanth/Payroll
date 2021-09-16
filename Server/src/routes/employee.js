const {createEmployee,viewAllEmployee,viewEmployee,viewEmployeeEmail,editEmployee,deleteEmployee,viewEmployeeByCompany} = require("../controllers/employee")
module.exports = async function (fastify, opts, done) {


    fastify.post('/employee',createEmployee)

    fastify.get('/employee',viewAllEmployee)

    fastify.get('/employee/:id',viewEmployee)

    fastify.get('/companyEmployee/:companyId',viewEmployeeByCompany)

    fastify.get('/employeeEmail/:email',viewEmployeeEmail)

    fastify.put('/employee/:id',editEmployee)

    fastify.delete('/employee/:id',deleteEmployee)

    done()
}