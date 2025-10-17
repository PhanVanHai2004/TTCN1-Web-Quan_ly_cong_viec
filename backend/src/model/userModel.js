export const addUser = async (fastify,user) => {
    const client =await fastify.pg.connect()
    await client.query('INSERT INTO users (name,phone,address,birth_day,email,username,password) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [user.name,user.phone,user.address,user.birth_day,user.email,user.username,user.password]
    )
    client.release()
    /*await fastify.pg.query(
    'INSERT INTO users (name, email) VALUES ($1, $2)',
    [user.name, user.email]
  )*/
}
export const getUser = async (fastify) => {
    const data = await fastify.pg.query('SELECT * FROM users')
    return data.rows
}
export const updateUser = async (fastify,id,user) => {
    const keys = Object.keys(user)
    if(keys.length===0){
        return{mes:'không có giá trị để cập nhật'}
    }
    const setClause = keys.map((key,index)=>`${key}=$${index+1}`).join(',')
    const value = Object.values(user)
    value.push(id)
    const query = `UPDATE users SET ${setClause} WHERE id = $${value.length}`
    await fastify.pg.query(query,value)
}
export const deleteUser = async (fastify,id) => {
    await fastify.pg.query(`DELETE FROM users WHERE id = $1`,[id])
}
export const getByidUser = async (fastify,id) => {
    const data =await fastify.pg.query(`SElECT * FROM users WHERE id = $1`,[id])
    return data.rows
}
export const getByUsername = async (fastify,username) => {
    const data= await fastify.pg.query(`SELECT * FROM users WHERE username LIKE $1
`,[`%${username}%`])
    return data.rows
}