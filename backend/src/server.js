import Fastify from 'fastify'
import ajvErrors from "ajv-errors"
import fastifyPostgres from '@fastify/postgres'
import { DBconfig } from './config/configDB.js'
import controllerUser from './controller/controllerUser.js'
import controllerTodo from './controller/controllerTodo.js'
import controllerGroup from './controller/controllerWork_group.js'
import controllerWork from './controller/controllerWork.js'


const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      allErrors: true,        // Báo nhiều lỗi cùng lúc
      strict: false,          // Một số bản Ajv mới cần bật để bỏ strict mode
      removeAdditional: false // Giữ lại field để hiển thị lỗi
    },
    plugins: [ajvErrors.default || ajvErrors], 
  },
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