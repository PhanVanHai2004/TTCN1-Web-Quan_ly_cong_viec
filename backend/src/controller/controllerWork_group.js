import { addGroup, addMembers, deleteGroup, deleteMembers, getAllGroup, updateGroup } from "../model/work_group.js"
import { deleteGroupSchema, deleteMemberSchema, schemaAddGroup, schemaAddMembers, schemaGetAllGroup, updateGroupSchema } from "../schema/schemaGroup.js"
import { handleDatabaseError } from "../utils/dbErrorHandler.js"


const controllerGroup = async (fastify, options) => {
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

}
export default controllerGroup