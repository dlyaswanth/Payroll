
const fastify = require('fastify')({
    logger: true
  })
  // routers
  fastify.register(require('./src/routes/company'), { prefix: '/api' })
  fastify.register(require('./src/routes/employee'), { prefix: '/api' })
  fastify.register(require('./src/routes/reimbursment'), { prefix: '/api' })
  fastify.register(require('./src/routes/payslip'), { prefix: '/api' })

  // database connection
  const mongoose = require('mongoose');

  fastify.register(require('fastify-cors'), {})
  mongoose.connect('mongodb+srv://gokul:gokul@cluster0.xo1l9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => console.log("Mongo is ready !"))
.catch(err=> console.log(err))
 
  
  // Declare a route
  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })
  
  const start = async () => {
    try{
      fastify.listen(process.env.PORT, '0.0.0.0', err => {
        if (err) throw err
        console.log(`server listening on ${fastify.server.address().port}`)
      })
       // await fastify.listen(8080,'0.0.0.0')
       // fastify.log.info(`Server is running at ${address}`)
    }catch (error){
  
    }
  }
  
  start()
