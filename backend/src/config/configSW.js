export const configSW =  {

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
    security: [           // thêm phần này để swagger hiểu là tất cả API đều có thể dùng apiKey
      {
        apiKey: []
      }
    ],
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    }
  }
}
export const configSWUI = {
  routePrefix: '/docs', // URL truy cập Swagger UI
  uiConfig: {
    docExpansion: 'none',
    deepLinking: false
  },

}
