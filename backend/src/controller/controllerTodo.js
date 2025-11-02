import { addTodo, deleteTodo, getAllToDo, updateTodo } from "../model/todoModel.js"
import { schemaDeleteTodo, schemagetAllTodos, schemaTodo, schemaUpdateTodo } from "../schema/schemaTodo.js"
import { handleDatabaseError } from "../utils/dbErrorHandler.js"

const controllerTodo = async (fastify, options) => {
    fastify.post('/todos/addTodo', { schema: schemaTodo }, async (req, reply) => {
        const todo = req.body
        const deadlineDate = new Date(todo.deadline)
        const date = new Date()
        try {
            if(deadlineDate< date){
                return reply.code(400).send({mes:'deadline phải lớn hơn ngày hiện tại'})
            }
            await addTodo(fastify, todo)
            return { mes: 'them cong viec thanh cong' }
        } catch (err) {
            console.log(err);
            handleDatabaseError(err, reply)

        }
    })
    fastify.get('/todos/getAllTodo', { schema: schemagetAllTodos }, async (req, reply) => {
        try {
            const data = await getAllToDo(fastify)
            return data
        } catch (err) {
            handleDatabaseError(err, reply)
        }
    })
    fastify.patch('/todos/updateTodo/:id', { schema: schemaUpdateTodo }, async (req, reply) => {
        const id = req.params.id
        const todo = req.body
        const keys = Object.keys(todo)
        const values = Object.values(todo)
        if (keys.length === 0) {
            return { mes: 'không có giá trị để cập nhật' }
        }
        try {
            await updateTodo(fastify, id, keys, values)
            return { mes: 'cap nhat thanh cong' }
        } catch (err) {
            console.log(err);
            handleDatabaseError(err, reply)

        }
    })
    fastify.delete('/todos/deleteTodo/:id', { schema: schemaDeleteTodo }, async (req, reply) => {
        const id = req.params.id
        try {
            const row = await deleteTodo(fastify, id)
            if (row === 0) {
                return reply.code(404).send({ error: 404, mes: "Công việc không tồn tại" })
            }
            return { mes: 'xoa thanh cong' }
        } catch (err) {
            handleDatabaseError(err,reply)
        }
    })
}
export default controllerTodo