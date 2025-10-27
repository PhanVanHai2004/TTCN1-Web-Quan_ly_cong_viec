

export const addTodo = async (fastify, todo) => {
    const data = await fastify.pg.query(`INSERT INTO todos (owner_id,assignee_id,reviewer_id,name,description,
        deadline,group_id) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
        [todo.owner_id, todo.assignee_id, todo.reviewer_id, todo.name, todo.description,
        todo.deadline, todo.group_id])
    const todo_id = data.rows[0].id
    const { file_name, file_path } = todo.file
    await fastify.pg.query(`INSERT INTO todo_files (todo_id,file_name,file_path)
        VALUES ($1,$2,$3)`,
        [todo_id, file_name, file_path]
    )
}
export const getAllToDo = async (fastify) => {
    const data = await fastify.pg.query(` SELECT id ,name, status, deadline FROM todos`
    )
    return data.rows
}
export const updateTodo = async (fastify, id, keys,values) => {
    const setClause = keys.map((key, index) => `${key}=$${index + 1}`).join(',');
    values.push(id)
    const query = `UPDATE todos SET ${setClause} WHERE id = $${values.length}`
    await fastify.pg.query(query, values)
}
export const deleteTodo = async (fastify, id) => {
   const row =  await fastify.pg.query(`DELETE FROM todos WHERE id =$1`, [id])
   return row.rowCount 
}
