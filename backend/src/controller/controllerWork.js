import { comment, detailtodos, getComment, getTodosByType, updateProgress, updateStatus } from "../model/work_management.js"
import { schemaCommentTodo, schemaDetailTodo, schemaGetCommentTodo, schemaGetTodosByType, schemaProgress, schemaWork } from "../schema/schemaWork.js"

const controllerWork = async (fastify, options) => {
    fastify.patch('/todos/updateStatus/:id', { schema: schemaWork }, async (req, reply) => {
        const id = req.params.id
        const status = req.body
        await updateStatus(fastify, status, id)
        return { mes: 'cap nhat thanh cong' }
    })
    fastify.patch('/todos/updateProgress/:id', { schema: schemaProgress }, async (req, reply) => {
        const id = req.params.id
        const Progress = req.body
        await updateProgress(fastify, Progress, id)
        return { mes: 'cap nhat thanh cong' }
    })
    fastify.get('/todos/detailtodos/:id',{schema:schemaDetailTodo}, async (req, rep) => {
        const id = req.params.id
        const data = await detailtodos(fastify, id)
        return data

    })
    fastify.get('/todos/:type/:id', { schema: schemaGetTodosByType }, async (req, rep) => {
        console.log(req.params);

        const { type, id } = req.params
        console.log(type, id);
        const data = await getTodosByType(fastify, id, type)
        return data

    })
    fastify.post('/todos/comments/:userId/:todoId',{schema:schemaCommentTodo}, async (req, reply) => {
        const { userId, todoId } = req.params
        const content = req.body
        await comment(fastify, userId, todoId, content)
        return content
    })
    fastify.get('/todos/getComment/:todoId',{schema:schemaGetCommentTodo}, async (req, reply) => {
        const todoId = req.params.todoId
        const data = getComment(fastify, todoId)
        return data
    })
    /* fastify.get('/todos/:action/:id',async (req,reply) => {
       console.log(req.params);
       
   }) */
}
export default controllerWork