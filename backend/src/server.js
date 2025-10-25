import Fastify from 'fastify'
import ajvErrors from "ajv-errors"
import fastifyPostgres from '@fastify/postgres'
import cors from '@fastify/cors'
import { DBconfig } from './config/configDB.js'
import controllerUser from './controller/controllerUser.js'
import controllerTodo from './controller/controllerTodo.js'
import controllerGroup from './controller/controllerWork_group.js'
import controllerWork from './controller/controllerWork.js'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { configSW, configSWUI } from './config/configSW.js'



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
await fastify.register(cors, {
  origin: '*', // Cho phép mọi domain (hoặc ghi cụ thể http://localhost:3000)
})
await fastify.register(fastifyPostgres, DBconfig)
await fastify.register(swagger, configSW)
await fastify.register(swaggerUI, configSWUI)
await fastify.register(controllerUser)
await fastify.register(controllerTodo)
await fastify.register(controllerGroup)
await fastify.register(controllerWork)
fastify.get('/', async (req, reply) => {
  return { mes: 'xin chao' }
})
fastify.get('/docs-json', async (req, reply) => {
  return fastify.swagger();
});
try {
  // fastify.listen({port:3000}) 
  await fastify.ready()
  fastify.swagger()
  await fastify.listen({port:3000}) 
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}