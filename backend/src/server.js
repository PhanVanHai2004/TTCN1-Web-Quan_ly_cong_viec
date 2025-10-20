import Fastify from 'fastify'
import ajvErrors from "ajv-errors"
import fastifyPostgres from '@fastify/postgres'
import { DBconfig } from './config/configDB.js'
import controllerUser from './controller/controllerUser.js'
import controllerTodo from './controller/controllerTodo.js'
import controllerGroup from './controller/controllerWork_group.js'
import controllerWork from './controller/controllerWork.js'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'



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
await fastify.register(fastifyPostgres, DBconfig)


await fastify.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Danh sách các API',
      description: 'Danh sách tất cả API của dự án',
      version: '0.1.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    }
  }
})
await fastify.register(swaggerUI, {
  routePrefix: '/docs', // URL truy cập Swagger UI
  uiConfig: {
    docExpansion: 'none',
    deepLinking: false
  },
})
await fastify.register(controllerUser)
await fastify.register(controllerTodo)
await fastify.register(controllerGroup)
await fastify.register(controllerWork)
fastify.get('/', async (req, reply) => {
  return { mes: 'xin chao' }
})
try {
  // fastify.listen({port:3000}) 
  await fastify.ready()
  fastify.swagger()
  await fastify.listen({port:3000}) 
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}