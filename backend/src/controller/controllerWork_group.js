import { addGroup, addMembers, deleteGroup, deleteMembers, getAllGroup, updateGroup } from "../model/work_group.js"
import { schemaAddGroup, schemaAddMembers } from "../schema/schemaGroup.js"


const controllerGroup = async (fastify, options) => {
    fastify.post('/addGroup', { schema: schemaAddGroup }, async (req, reply) => {
        const group = req.body
        await addGroup(fastify, group)
        return { mes: 'tao group thanh cong' }
    })
    fastify.get('/getAllGroup', async (req, reply) => {
        const data = await getAllGroup(fastify)
        return data
    })
    fastify.patch('/updateGroup/:id', async (req, reply) => {
        const id = req.params.id
        const group = req.body
        await updateGroup(fastify, id, group)
        return { mes: 'cap nhat thanh cong' }
    })
    fastify.delete('/deleteGroup/:id', async (req, reply) => {
        const id = req.params.id
        await deleteGroup(fastify, id)
        return { mes: 'xoa group thanh cong' }
    })
    fastify.post('/addMembers/:id', { schema: schemaAddMembers }, async (req, reply) => {
        const id = req.params.id
        const members = req.body
        await addMembers(fastify, id, members)
        return { mes: ' them thanh members thanh cong' }
    })
    fastify.delete('/deleteMembers/:groupId', async (req, reply) => {
        const groupId = req.params.groupId
        const userId = req.body
        await deleteMembers(fastify, userId, groupId)
        return { mes: 'xoa thanh cong' }
    })

}
export default controllerGroup