export const updateStatus = async (fastify, status, id) => {
    const client = await fastify.pg.connect()
    const data = await client.query(
        `UPDATE todos SET status =$1 WHERE id =$2`,
        [status.status, id]
    )
    if (status.status === 'done') {
        await client.query(
            `UPDATE todos SET done_day = NOW() WHERE id =$1`,
            [id]
        )
    }
    client.release()
    return data.rowCount
}
export const updateProgress = async (fastify, Progress, id) => {
    const data = await fastify.pg.query(
        `UPDATE todos SET progress =$1 WHERE id =$2`,
        [Progress.progress, id]
    )
    return data.rowCount
}
export const detailtodos = async (fastify, id) => {
    const data = await fastify.pg.query(`
    SELECT t.*,
      json_build_object('id', u1.id, 'username', u1.username) AS owner,
      json_build_object('id', u2.id, 'username', u2.username) AS assignee,
      json_build_object('id', u3.id, 'username', u3.username) AS reviewer,
      f.file_name,
      f.file_path
    FROM todos t
    LEFT JOIN users u1 ON t.owner_id = u1.id
    LEFT JOIN users u2 ON t.assignee_id = u2.id
    LEFT JOIN users u3 ON t.reviewer_id = u3.id
    LEFT JOIN todo_files f ON t.id = f.todo_id
    WHERE t.id = $1
    ORDER BY t.deadline ASC;
    `, [id])
    return data.rows
}
export const getTodosByType = async (fastify, userId, type) => {
    const columnMap = {
        owner: 'owner_id',
        assignee: 'assignee_id',
        reviewer: 'reviewer_id',
    }
    const column = columnMap[type]
    const data = await fastify.pg.query(`
        SELECT id ,name, status, deadline FROM todos
        WHERE ${column} = $1
        ORDER BY deadline ASC
    `, [userId])
    return data.rows
}
export const comment = async (fastify, user_id, todo_id, comment) => {
    await fastify.pg.query(
        `INSERT INTO todo_comments (user_id,todo_id,content) 
        VALUES ($1,$2,$3)`,
        [user_id, todo_id, comment.comment]
    )
}
export const getComment = async (fastify, todo_id) => {
    const data = await fastify.pg.query(
        `SELECT 
        u1.name AS name,
        c.content,c.created_at
        FROM todo_comments c
        LEFT JOIN users u1 ON c.user_id = u1.id
        WHERE todo_id = $1`,
        [todo_id]
    )
    return data.rows
}
export const getByStatus = async (fastify, type) => {
    const data = await fastify.pg.query(
        `SELECT id ,name, status, deadline FROM todos WHERE status= $1`,
        [type]
    )
    return data.rows
}
export const getByTime = async (fastify,acction,id, date) => {
    const data = await fastify.pg.query(
        `SELECT *
        FROM todos	
        --WHERE EXTRACT(MONTH FROM deadline) = $1--EXTRACT là hàm để trích xuất một phần của ngày giờ.
        WHERE $1 BETWEEN EXTRACT(${acction} FROM created_at) AND EXTRACT(${acction} FROM deadline)
        AND EXTRACT(YEAR FROM deadline) = EXTRACT(YEAR FROM CURRENT_DATE)
        AND assignee_id = $2
        ORDER BY deadline ASC;`,
        [date,id]
    )
    return data.rows
}


