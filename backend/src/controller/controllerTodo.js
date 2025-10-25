import { addTodo, deleteTodo, getAllToDo, updateTodo } from "../model/todoModel.js"
import { schemaDeleteTodo, schemagetAllTodos, schemaTodo, schemaUpdateTodo } from "../schema/schemaTodo.js"
import { handleDatabaseError } from "../utils/dbErrorHandler.js"

const controllerTodo = async (fastify, options) => {
    fastify.post('/todos/addTodo', { schema: schemaTodo }, async (req, reply) => {
        const todo = req.body
        try {
            await addTodo(fastify, todo)
        return { mes: 'them cong viec thanh cong' }
        } catch (err) {
            console.log(err);
            handleDatabaseError(err,reply)
            
        }
    })
    fastify.get('/todos/getAllTodo',{schema:schemagetAllTodos}, async (req, reply) => {
        console.log(req.params);

        const data = await getAllToDo(fastify)
        return data
    })
    fastify.patch('/todos/updateTodo/:id', { schema: schemaUpdateTodo }, async (req, reply) => {
        const id = req.params.id
        const todo = req.body
        await updateTodo(fastify, id, todo)
        return { mes: 'cap nhat thanh cong' }
    })
    fastify.delete('/todos/deleteTodo/:id', {schema:schemaDeleteTodo},async (req, reply) => {
        const id = req.params.id
        await deleteTodo(fastify, id)
        return { mes: 'xoa thanh cong' }
    })
}
export default controllerTodo