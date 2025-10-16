import { addTodo, deleteTodo, getAllToDo, updateTodo } from "../model/todoModel.js"
import { schemaTodo, schemaUpdateTodo } from "../schema/schemaTodo.js"

const controllerTodo = async (fastify,options) => {
    fastify.post('/addTodo',{schema:schemaTodo},async (req,reply) => {
        const todo = req.body
        await addTodo(fastify,todo)
        return {mes:'them cong viec thanh cong'}
    })
    fastify.get('/getAllTodo',async (req,reply) => {
        const data = await getAllToDo(fastify)
        return data
    })
    fastify.patch('/updateTodo/:id',{schema:schemaUpdateTodo},async (req,reply) => {
        const id = req.params.id
        const todo = req.body
        console.log(todo);
        const keys = Object.keys(todo)
        console.log(keys);
        const setClause = keys.map((key,index)=>`${key}=$${index+1}`).join(',');
        console.log(setClause);
        const value = Object.values(todo)
        value.push(id)
        console.log(value);
        const query = `
    UPDATE todos SET
    ${setClause}`
    console.log(query);
    
        
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