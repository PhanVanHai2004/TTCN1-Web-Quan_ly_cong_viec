import Fastify from 'fastify'
import fastifyPostgres from '@fastify/postgres'
import { DBconfig } from './config/configDB.js'
import controllerUser from './controller/controllerUser.js'
import controllerTodo from './controller/controllerTodo.js'
import controllerGroup from './controller/controllerWork_group.js'
import controllerWork from './controller/controllerWork.js'


const fastify = Fastify({
    logger:true
})
fastify.register(fastifyPostgres,DBconfig)

fastify.register(controllerUser)
fastify.register(controllerTodo)
fastify.register(controllerGroup)
fastify.register(controllerWork)
fastify.get('/',async (req,reply) => {
    return {mes:'xin chao'}
})
try {
    fastify.listen({port:3000}) 
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}