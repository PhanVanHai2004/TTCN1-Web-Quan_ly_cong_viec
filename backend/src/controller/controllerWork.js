import { comment, detailtodos, getByStatus, getComment, getTodosByType, updateProgress, updateStatus } from "../model/work_management.js"
import { schemaCommentTodo, schemaDetailTodo, schemaGetCommentTodo, schemaGetTodosByType, schemaProgress, schemaWork } from "../schema/schemaWork.js"
import { handleDatabaseError } from "../utils/dbErrorHandler.js"

const controllerWork = async (fastify, options) => {
    fastify.patch('/todos/updateStatus/:id', { schema: schemaWork }, async (req, reply) => {
        const id = req.params.id
        const status = req.body
        try {
            const data = await updateStatus(fastify, status, id)
            if(data===0){
                return reply.code(404).send({'code':404,'mes':'Công việc không tồn tại'})
            }
            return { mes: 'cap nhat thanh cong' }
        } catch (err) {
            handleDatabaseError(err,reply)
        }
    })
    fastify.patch('/todos/updateProgress/:id', { schema: schemaProgress }, async (req, reply) => {
        const id = req.params.id
        const Progress = req.body
        try {
            const data = await updateProgress(fastify, Progress, id)
            if(data===0){
                return reply.code(404).send({'code':404,'mes':'Công việc không tồn tại'})
            }
            return { mes: 'cap nhat thanh cong' }
        } catch (err) {
            handleDatabaseError(err,reply)
        }
    })
    fastify.get('/todos/detailtodos/:id', { schema: schemaDetailTodo }, async (req, reply) => {
        const id = req.params.id
        try {
            const data = await detailtodos(fastify, id)
            if(data.length===0){
                return reply.status(404).send({mes:'Công việc không tồn tại'})
            }
            return data
        } catch (error) {

        }

    })
    fastify.get('/todos/:type/:id', { schema: schemaGetTodosByType }, async (req, rep) => {
        console.log(req.params);

        const { type, id } = req.params
        console.log(type, id);
        try {
            const data = await getTodosByType(fastify, id, type)
            if(data.length===0){
                return({mes:"Không có công việc nào"})
            }
            return data
        } catch (err) {
            
        }

    })
    fastify.post('/todos/comments/:userId/:todoId', { schema: schemaCommentTodo }, async (req, reply) => {
        const { userId, todoId } = req.params
        const content = req.body
        await comment(fastify, userId, todoId, content)
        return content
    })
    fastify.get('/todos/getComment/:todoId', { schema: schemaGetCommentTodo }, async (req, reply) => {
        const todoId = req.params.todoId
        const data = getComment(fastify, todoId)
        return data
    })
    fastify.get('/todos',async (req,reply) => {
        console.log(req.query);
        const status = req.query.status
        const data = await getByStatus(fastify,status)
        return data
        
    })
}
export default controllerWork