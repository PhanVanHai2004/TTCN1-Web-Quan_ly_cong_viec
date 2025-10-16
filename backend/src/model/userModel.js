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
export const updateUser = async (fastify,id) => {
    await fastify.pg.query(`UPDATE users SET name = $1,phone = $2,address = $3,email = $4,birth_day = $5,password = $6 WHERE id = $7`,
        [user.name,user.phone,user.address,user.email,user.birth_day,user.password,id]
    )
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