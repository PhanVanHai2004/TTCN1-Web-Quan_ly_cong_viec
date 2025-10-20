import { addUser, getUser, updateUser, deleteUser, getByidUser, getByUsername } from "../model/userModel.js"
import { schemaDeleteUser, schemaUpdateUser, schemaUser } from "../schema/schemaUser.js";

const controllerUser = async (fastify, options) => {
    fastify.post('/addUser', { schema: schemaUser }, async (req, reply) => {
        const user = req.body
        console.log('user', user);

        await addUser(fastify, user)
        return { mes: "them user thanh cong" }
    })
    fastify.get('/getAllUser', async (req, reply) => {
        const row = await getUser(fastify)
        return row
    })
    fastify.patch('/updateUser/:id', { schema: schemaUpdateUser }, async (req, reply) => {
        const id = req.params.id
        const user = req.body
        await updateUser(fastify, id, user)
        return { mes: 'update thanh cong' }
    })
    fastify.delete('/deleteUser/:id', { schema: schemaDeleteUser }, async (req, reply) => {
        const id = req.params.id
        await deleteUser(fastify, id)
        return { mes: 'xoa thanh cong' }
    })
    fastify.get('/getByidUser/:id', async (req, reply) => {
        const id = req.params.id
        const row = await getByidUser(fastify, id)
        return row
    })
    fastify.get('/getByUsername', async (req, reply) => {
        const { username } = req.query
        if (!username) {
            return reply.code(404).send({
                error: 400,
                mes: 'vui lòng nhập tên hoặc ký tự cần tìm!'
            })
        }
        const data = await getByUsername(fastify, username)
        if (data.length === 0) {
            return reply.code(404).send({
                error: 404, mes: 'người dùng không tồn tại'
            })
        }
        return data

    })
}
export default controllerUser