const { createCompany,viewAllCompany,viewCompany,editCompany,deleteCompany, viewCompanyEmail} = require("../controllers/company")
module.exports = async function (fastify, opts, done) {


    fastify.post('/company',createCompany)

    fastify.get('/company',viewAllCompany)

    fastify.get('/company/:id',viewCompany)


    fastify.get('/companyEmail/:email',viewCompanyEmail)

    fastify.put('/company/:id',editCompany)

    fastify.delete('/company/:id',deleteCompany)

    done()
}