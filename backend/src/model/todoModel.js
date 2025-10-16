export const addTodo = async (fastify,todo) => {
    const data = await fastify.pg.query(`INSERT INTO todos (owner_id,assignee_id,reviewer_id,name,description
        ,status,progress,deadline,done_day,group_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
        [todo.owner_id,todo.assignee_id,todo.reviewer_id,todo.name,todo.description
        ,todo.status,todo.progress,todo.deadline,todo.done_day,todo.group_id])
    const todo_id = data.rows[0].id
    const {file_name,file_path} = todo.file
    await fastify.pg.query(`INSERT INTO todo_files (todo_id,file_name,file_path)
        VALUES ($1,$2,$3)`,
        [todo_id,file_name,file_path]
    )
}
export const getAllToDo = async (fastify) => {
    const data = await fastify.pg.query(`SELECT t.*,
        f.file_name as file
        FROM todos t
        LEFT JOIN todo_files f ON t.id = f.todo_id`
    )
    return data.rows
}
export const updateTodo = async (fastify,id,todo) => {
    const data = await getAllToDo(fastify)
    const owner_id = todo.owner_id ?? data.owner_id
    const assignee_id = todo.assignee_id ?? data.assignee_id
    const reviewer_id = todo.reviewer_id ?? data.reviewer_id
    const name = todo.name ?? data.name
    const description = todo.description ?? data.description
    const status = todo.status ?? data.status
    const progress = todo.progress ?? data.progress
    const deadline = todo.deadline ?? data.deadline
    const done_day = todo.done_day ?? data.done_day
    const group_id = todo.group_id ?? data.group_id
    await fastify.pg.query(`UPDATE todos SET owner_id=$1,assignee_id=$2,reviewer_id=$3,name=$4,description=$5,status=$6,progress=$7,
        deadline=$8,done_day=$9,group_id=$10 WHERE id=$11`,
        [owner_id,assignee_id,reviewer_id,name,description,status,progress,deadline,done_day,group_id,id])
    return {mes:'cap nhat thanh cong'}
}
export const deleteTodo = async (fastify,id) => {
    await fastify.pg.query(`DELETE FROM todos WHERE id =$1`,[id])
}