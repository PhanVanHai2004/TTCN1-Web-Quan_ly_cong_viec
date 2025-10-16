import { addTodo, deleteTodo, getAllToDo, updateTodo } from "../model/todoModel.js"

const controllerTodo = async (fastify,options) => {
    fastify.post('/addTodo',async (req,reply) => {
        const todo = req.body
        await addTodo(fastify,todo)
        return {mes:'them cong viec thanh cong'}
    })
    fastify.get('/getAllTodo',async (req,reply) => {
        const data = await getAllToDo(fastify)
        return data
    })
    fastify.patch('/updateTodo/:id',async (req,reply) => {
        const id = req.params.id
        const todo = req.body
        await updateTodo(fastify,id,todo)
        return{mes:'cap nhat thanh cong'}
    })
    fastify.delete('/deleteTodo/:id',async (req,reply) => {
        const id = req.params.id
        await deleteTodo(fastify,id)
        return{mes:'xoa thanh cong'}
    })
}
export default controllerTodo