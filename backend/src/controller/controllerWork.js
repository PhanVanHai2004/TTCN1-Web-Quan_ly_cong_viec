import { comment, detailtodos, getByStatus, getByTime, getComment, getTodosByType, updateProgress, updateStatus } from "../model/work_management.js"
import { byTime, schemaCommentTodo, schemaDetailTodo, schemaGetCommentTodo, schemaGetTodosByType, schemaProgress, schemaWork } from "../schema/schemaWork.js"
import { handleDatabaseError } from "../utils/dbErrorHandler.js"
import dayjs from 'dayjs';
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);

const controllerWork = async (fastify, options) => {
    fastify.patch('/todos/updateStatus/:id', { schema: schemaWork }, async (req, reply) => {
        const id = req.params.id
        const status = req.body
        try {
            const data = await updateStatus(fastify, status, id)
            if (data === 0) {
                return reply.code(404).send({ 'code': 404, 'mes': 'Công việc không tồn tại' })
            }
            return { mes: 'cap nhat thanh cong' }
        } catch (err) {
            handleDatabaseError(err, reply)
        }
    })
    fastify.patch('/todos/updateProgress/:id', { schema: schemaProgress }, async (req, reply) => {
        const id = req.params.id
        const Progress = req.body
        try {
            const data = await updateProgress(fastify, Progress, id)
            if (data === 0) {
                return reply.code(404).send({ 'code': 404, 'mes': 'Công việc không tồn tại' })
            }
            return { mes: 'cap nhat thanh cong' }
        } catch (err) {
            handleDatabaseError(err, reply)
        }
    })
    fastify.get('/todos/detailtodos/:id', { schema: schemaDetailTodo }, async (req, reply) => {
        const id = req.params.id
        try {
            const data = await detailtodos(fastify, id)
            if (data.length === 0) {
                return reply.status(404).send({ mes: 'Công việc không tồn tại' })
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
            if (data.length === 0) {
                return ({ mes: "Không có công việc nào" })
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
    /* fastify.get('/todo/kanban/:id', async (req, reply) => {
        const id = req.params.id
        const keys = Object.keys(req.query)
        const date = Number(Object.values(req.query)) || new Date()
        console.log(keys, date);

        const data = await getByTime(fastify, keys, id, date)
        return data


    }) */
    fastify.get('/todo/kanban/:acction/:id',{schema:byTime}, async (req, reply) => {
        const id = req.params.id
        const date = req.query.date ? new Date(req.query.date) : new Date();
        console.log(date);
        const day = date.getDay()
        console.log('day',day);
        const month = date.getMonth()+1
        console.log('month',month);
        console.log('day',date.getDate());
        const dayYear = dayjs(date).dayOfYear()
        console.log('ngay trong nam',dayYear);
        const week = dayjs(date).week()
        console.log('tuan trong nam',week);
        const map = {
            doy: dayYear,
            week :week,
            month:month
        }
        const acction = req.params.acction
        console.log(acction);
        console.log('map req',map[acction]);
        const time = map[acction]
        console.log(time);
        const data = await getByTime(fastify, acction, id, time)
        return data


    })


}
export default controllerWork