/* export const getByOwner_id = async (fastify,id) => {
    const data = await fastify.pg.query(`SELECT t.*,
        f.file_name as file
        FROM todos t
        LEFT JOIN todo_files f ON t.id = f.todo_id
        WHERE owner_id =$1`,
        [id]
    )
    return data.rows
}
export const getAssignee_id = async (fastify,id) => {
    const data = await fastify.pg.query(`SELECT t.*,
        f.file_name as file
        FROM todos t
        LEFT JOIN todo_files f ON t.id = f.todo_id
        WHERE assignee_id =$1`,
        [id]
    )
    return data.rows
}
export const getReviewer_id = async (fastify,id) => {
    const data = await fastify.pg.query(`SELECT t.*,
        f.file_name as file
        FROM todos t
        LEFT JOIN todo_files f ON t.id = f.todo_id
        WHERE reviewer_id =$1`,
        [id]
    )
    return data.rows
} */
export const updateStatus = async (fastify,status,id) => {
    await fastify.pg.query(
        `UPDATE todos SET status =$1 WHERE id =$2`,
        [status.status,id]
    )
}
export const updateProgress = async (fastify,Progress,id) => {
    await fastify.pg.query(
        `UPDATE todos SET progress =$1 WHERE id =$2`,
        [Progress.progress,id]
    )
}
export const detailTodosByType = async (fastify,id) => {
    const data = await fastify.pg.query(`
        SELECT t.*, 
               u1.username AS owner_name, 
               u2.username AS assignee_name,
               u3.username AS reviewer_name,
               f1.file_name AS file_name,
               f2.file_path AS file_path
        FROM todos t
        LEFT JOIN users u1 ON t.owner_id = u1.id
        LEFT JOIN users u2 ON t.assignee_id = u2.id
        LEFT JOIN users u3 ON t.reviewer_id = u3.id
        LEFT JOIN todo_files f1 ON t.id = f1.todo_id
        LEFT JOIN todo_files f2 ON t.id = f1.todo_id
        WHERE t.id = $1
        ORDER BY t.deadline ASC
    `, [id])
    return data.rows
}
export const getTodosByType = async (fastify,userId,type) => {
    const data = await fastify.pg.query(`
        SELECT name, status, deadline FROM todos
        WHERE ${type} = $1
        ORDER BY deadline ASC
    `, [userId])
    return data.rows
}

