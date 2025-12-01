import { getAllToDo } from "../model/todoModel.js";
import { comment, CV, detailtodos, /* getByStatus, getByTime, */ getComment, getCV, getTodos, /* getTodosByType, */ searchTodos, updateProgress, updateStatus } from "../model/work_management.js"
import { /* byTime, */ schemaCommentTodo, schemaDetailTodo, schemaGetCommentTodo,/*  schemaGetTodosByType, */ schemaProgress, schemaWork } from "../schema/schemaWork.js"
import { handleDatabaseError } from "../utils/dbErrorHandler.js"
import dayjs from 'dayjs';
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);

const controllerWork = async (fastify, options) => {
    //cập nhật trạng thái của công việc theo id
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
    //Cập nhật tiến độ của công việc theo id
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
    /* fastify.get('/todos/:type/:id', { schema: schemaGetTodosByType }, async (req, rep) => {
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

    }) */
   //Thêm comment
    fastify.post('/todos/comments/:userId/:todoId', { schema: schemaCommentTodo }, async (req, reply) => {
        const { userId, todoId } = req.params
        const content = req.body
        await comment(fastify, userId, todoId, content)
        return content
    })
    //xem comment
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
    /* fastify.get('/todo/:acction/:id',{schema:byTime}, async (req, reply) => {
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
        try {
            const data = await getByTime(fastify, acction, id, time)
            if(data.length===0){
                return reply.status(404).send({mes:'không có công việc nào'})
            }
            return data
        } catch (err) {
            console.log(err);
            
        }


    }) */

    fastify.get('/todos/search',async (req,reply) => {
        const qr = req.query
        console.log('query',qr);
        const key = Object.keys(qr)[0]
        console.log(key);
        let value = Object.values(qr)[0]
        if (key === 'deadline'){
            value = new Date()
        }
        console.log(value);
        try {
            const data = await searchTodos(fastify,key,value)
            return data
        } catch (err) {
            console.log(err);
            
        }
        
        
    })
    //Lấy ra các công việc theo các trạng thái new,working,pending,closed,done
    fastify.get('/kanban',async (req,reply) => {
        const data = await getTodos(fastify)
        const row = {
            new : [],
            done:[],
            pending:[],
            working:[],
            closed:[]
        }
        for ( let i = 0;i<data.length;i++){
            row[data[i].status].push(data[i])
            console.log(data[i]);
            
        }
        for(const keys in row){        
            if(row[keys].length===0){
                row[keys].push({message: "Không có công việc nào"})
            }
        }
        return row
    })
    //Lấy ra danh sách các công việc do mình giám sát, các công việc của mình đã tạo
    fastify.get('/todos/congviecc/:id',async (req,reply) => {
        const id = req.params.id
        console.log('id',id);
        
        const data = await getCV(fastify,id)
        console.log(data);
        
        const row = {
            owner:[],
            review:[]
        }
        console.log('length',data.length);
        for (let i = 0;i<data.length;i++){
            console.log(data[i].owner_id);
            console.log(data[i].review_id);
            
            if(data[i].owner_id===Number(id)){
                console.log('data',data[i]);
                row["owner"].push(data[i])
            }
            if(data[i].reviewer_id===Number(id)){
                row["review"].push(data[i])
            }
        }
        for(const keys in row){        
            if(row[keys].length===0){
                row[keys].push({message: "Không có công việc nào"})
            }
        }
        
        return row
    })
    fastify.get('/todos/chart/:id',async (req,reply) => {
        const id = req.params.id
        const data ={
            //['new', 'working', 'pending', 'closed', 'done'],
            sum:0,
            new:[],
            working:[],
            pending:[],
            closed:[],
            work_deadline:[],
            done:[],
            deadline:[]

        }
        
        const row = await getCV(fastify,id)
        
        for(let i = 0;i< row.length;i++){    
            data[row[i].status].push(row[i])
            console.log(row[i].status);
            data.sum++
        }
        for(const keys in data){        
            if(data[keys].length===0){
                data[keys].push({message: "Không có công việc nào"})
            }
        }
        return data

    })
    fastify.get('/todos/congviec/:id',async (req,reply) => {
        const id = req.params.id
        console.log('id',typeof(id));
        
        const now = new Date()
           console.log('time',now);
        const time_now = new Date(now.toDateString())
        console.log('time_now',time_now);
        
        
        const cv = {
            working:[],
            owner:[],
            done:[],
            deadline:[]
        }
        const data = await CV(fastify,id)
        /* data.map((d)=>{
            const DeadLine= new Date(d.deadline)
            console.log('deadline',DeadLine);
            const dead = new Date(DeadLine.toDateString())
            console.log('dead',dead);
            
            if(d.status==="new"||d.status==="working"){
                cv.working.push(d)
            }
            if(d.status==="done"){
                cv.done.push(d)
            }
            if(dead< time_now){
                cv.deadline.push(d)
            }
           
        }) */
        data.forEach((d)=>{
            console.log('owner_id',d.owner_id);
            const DeadLine= new Date(d.deadline)
            console.log('deadline',DeadLine);
            const dead = new Date(DeadLine.toDateString())
            console.log('dead',dead);
            
            if(d.status==="new"||d.status==="working"){
                cv.working.push(d)
            }
            if(d.status==="done"){
                cv.done.push(d)
            }
            if(dead< time_now&&d.status!="done"){
                cv.deadline.push(d)
            }
            if(Number(id) === d.owner_id){
                
                cv.owner.push(d)
            }
        })
        return cv
    })

}
export default controllerWork