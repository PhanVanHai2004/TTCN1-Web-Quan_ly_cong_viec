import { addUser, getUser, updateUser, deleteUser, getByidUser, getByUsername } from "../model/userModel.js"
import { schemaDeleteUser, schemaGetById, schemaGetByUsername, schemaGetUser, schemaUpdateUser, schemaUser } from "../schema/schemaUser.js";
import { handleDatabaseError } from "../utils/dbErrorHandler.js";

const controllerUser = async (fastify, options) => {
    fastify.post('/user/addUser', { schema: schemaUser }, async (req, reply) => {
        const user = req.body
        console.log('user', user);
        try {
            await addUser(fastify, user)
            return'abc'
        } catch (err) {
            console.log(err);
            return handleDatabaseError(err, reply)
        }
    })
    fastify.get('/user/getAllUser', { schema: schemaGetUser }, async (req, reply) => {
        try {
            const row = await getUser(fastify)
            return row
        } catch (err) {
            handleDatabaseError(err,reply)
        }
    })
    fastify.patch('/user/updateUser/:id', { schema: schemaUpdateUser }, async (req, reply) => {
        const id = req.params.id
        const user = req.body
        try {
            await updateUser(fastify, id, user)
            return { mes: 'update thanh cong' }
        } catch (err) {
            console.log(err);
            return handleDatabaseError(err, reply)

        }
    })
    fastify.delete('/user/deleteUser/:id', { schema: schemaDeleteUser }, async (req, reply) => {
        const id = req.params.id
        try {
            await deleteUser(fastify, id)
            return { mes: 'xoa thanh cong' }
        } catch (err) {
            console.log(err);
            
            return reply.code(404).send({ error: err.message })
        }
    })
    fastify.get('/user/getByidUser/:id', { schema: schemaGetById }, async (req, reply) => {
        const id = req.params.id
        try {
            const row = await getByidUser(fastify, id)
            return row
        } catch (err) {
            return reply.code(404).send({ error: err.message })
        }
    })
    fastify.get('/user/getByUsername', { schema: schemaGetByUsername }, async (req, reply) => {
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