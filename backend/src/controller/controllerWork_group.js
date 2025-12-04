import { addGroup, addMembers, deleteGroup, deleteMembers, getAllGroup, getGroupById,  updateGroup } from "../model/work_group.js"
import { deleteGroupSchema, deleteMemberSchema, schemaAddGroup, schemaAddMembers, schemaGetAllGroup, updateGroupSchema } from "../schema/schemaGroup.js"
import { handleDatabaseError } from "../utils/dbErrorHandler.js"


const controllerGroup = async (fastify, options) => {
    //Thêm nhóm
    fastify.post('/group/addGroup', { schema: schemaAddGroup }, async (req, reply) => {
        const group = req.body
        try {
            await addGroup(fastify, group)
            return { mes: 'tao group thanh cong' }
        } catch (err) {
            handleDatabaseError(err,reply)
        }
    })
    
    fastify.get('/group/getAllGroup', { schema: schemaGetAllGroup }, async (req, reply) => {
        try {
            const data = await getAllGroup(fastify)
            return data
        } catch (err) {
            handleDatabaseError(err,reply)
        }
    })
    //Cập nhật nhóm
    fastify.patch('/group/updateGroup/:id', { schema: updateGroupSchema }, async (req, reply) => {
        const id = req.params.id
        const group = req.body
        try {
            await updateGroup(fastify, id, group)
            return { mes: 'cap nhat thanh cong' }
        } catch (err) {
            handleDatabaseError(err,reply)
            
        }
    })
    //Xóa nhóm
    fastify.delete('/group/deleteGroup/:id', { schema: deleteGroupSchema }, async (req, reply) => {
        const id = req.params.id
        try {
            const data = await deleteGroup(fastify, id)
            if(data===0){
                return reply.code(404).send({'code':404,'mes':'Nhóm không tồn tại'})
            }
            return { mes: 'xoa group thanh cong' }
        } catch (err) {
            console.log(err);
            handleDatabaseError(err,reply)
        }
    })
    //Thêm thành viên
    fastify.post('/group/addMembers/:id', { schema: schemaAddMembers }, async (req, reply) => {
        const id = req.params.id
        const members = req.body
        try {
            await addMembers(fastify, id, members)
            return { mes: ' them thanh vien thanh cong' }
        } catch (err) {
            console.log(err);
            handleDatabaseError(err,reply)

        }
    })
    //Xóa thành viên
    fastify.delete('/group/deleteMembers/:groupId', { schema: deleteMemberSchema }, async (req, reply) => {
        const groupId = req.params.groupId
        const userId = req.body
        try {
            const data= await deleteMembers(fastify, userId, groupId)
            if(data===0){
                return reply.code(404).send({'code':404,'mes':'Người dùng không tồn tại trong nhóm'})
            }
            return { mes: 'xoa thanh cong' }
        } catch (err) {
            handleDatabaseError(err,reply)
        }
    })
    fastify.get('/group/getGroup/:id',async (req,reply) => {
        const id = req.params.id
        const row = await getGroupById(fastify,id)
        const data = {
            creator:[],
            members:[]
        }
        row.map(r=>{
            if(row.user_role==="owner"){
                data[creator].push(r)
            }
            data.members.push(r)
        })
        return data
    })
    

}
export default controllerGroup