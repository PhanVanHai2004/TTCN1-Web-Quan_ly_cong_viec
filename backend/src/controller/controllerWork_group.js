import { addGroup, addMembers, deleteGroup, deleteMembers, getAllGroup, updateGroup } from "../model/work_group.js"
import { deleteGroupSchema, deleteMemberSchema, schemaAddGroup, schemaAddMembers, schemaGetAllGroup, updateGroupSchema } from "../schema/schemaGroup.js"


const controllerGroup = async (fastify, options) => {
    fastify.post('/group/addGroup', { schema: schemaAddGroup }, async (req, reply) => {
        const group = req.body
        await addGroup(fastify, group)
        return { mes: 'tao group thanh cong' }
    })
    fastify.get('/group/getAllGroup', {schema:schemaGetAllGroup},async (req, reply) => {
        const data = await getAllGroup(fastify)
        return data
    })
    fastify.patch('/group/updateGroup/:id',{schema:updateGroupSchema}, async (req, reply) => {
        const id = req.params.id
        const group = req.body
        await updateGroup(fastify, id, group)
        return { mes: 'cap nhat thanh cong' }
    })
    fastify.delete('/group/deleteGroup/:id',{schema:deleteGroupSchema}, async (req, reply) => {
        const id = req.params.id
        await deleteGroup(fastify, id)
        return { mes: 'xoa group thanh cong' }
    })
    fastify.post('/group/addMembers/:id', { schema: schemaAddMembers }, async (req, reply) => {
        const id = req.params.id
        const members = req.body
        await addMembers(fastify, id, members)
        return { mes: ' them thanh members thanh cong' }
    })
    fastify.delete('/group/deleteMembers/:groupId',{schema:deleteMemberSchema} ,async (req, reply) => {
        const groupId = req.params.groupId
        const userId = req.body
        await deleteMembers(fastify, userId, groupId)
        return { mes: 'xoa thanh cong' }
    })

}
export default controllerGroup