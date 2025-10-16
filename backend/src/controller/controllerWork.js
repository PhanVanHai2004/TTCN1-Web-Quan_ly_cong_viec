import {  detailTodosByType, getTodosByType, updateProgress, updateStatus } from "../model/work_management.js"

const controllerWork = async (fastify,options) => {
    fastify.patch('/updateStatus/:id',async (req,reply) => {
        const id = req.params.id
        const status = req.body
        await updateStatus(fastify,status,id)
        return {mes:'cap nhat thanh cong'}
    })
    fastify.patch('/updateProgress/:id',async (req,reply) => {
        const id = req.params.id
        const Progress = req.body
        await updateProgress(fastify,Progress,id)
        return {mes:'cap nhat thanh cong'}
    })
    fastify.get('/detailtodos/:id',async (req,rep) => {
        const id = req.params.id
        const data = await detailTodosByType(fastify,id)
        return data
        
    })
    fastify.get('/todos/:type/:id',async (req,rep) => {
        const {type,id}= req.params
        console.log(type,id);
        const data = await getTodosByType(fastify,id,type)
        return data
        
    })
}
export default controllerWork