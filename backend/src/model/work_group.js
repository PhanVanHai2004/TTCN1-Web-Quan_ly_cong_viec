export const addGroup = async (fastify, group) => {
    const client = await fastify.pg.connect()
    try {
        await client.query('BEGIN')//bắt đầu transaction
        const group_data = await client.query(
            `INSERT INTO work_groups (name, description, owner_id, creator_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [group.name, group.description, group.owner_id, group.creator_id]
        )
        const group_id = group_data.rows[0].id
        if (group.files) {
            const { name, url } = group.files;
            await client.query(
                `INSERT INTO group_files (group_id,file_name,file_url)
            VALUES ($1,$2,$3)`,
                [group_id, name, url]
            );
        }
        await client.query('COMMIT')
    } catch (err) {
        await client.query('ROLLBACK'); //có lỗi thì rollback
        console.log(err);
        throw err;
    }
    finally {
        client.release()
    }
}
export const getAllGroup = async (fastify) => {
    const data = await fastify.pg.query(`
    SELECT 
      g.*,  
      ARRAY_AGG(DISTINCT f.file_url) AS files,          
      ARRAY_AGG(DISTINCT n.name) AS member_names,      
      ARRAY_AGG(DISTINCT m.user_id) AS member_id    
    FROM work_groups g
    LEFT JOIN group_files f ON g.id = f.group_id
    LEFT JOIN group_members m ON g.id = m.group_id
    LEFT JOIN users n ON m.user_id = n.id
    GROUP BY g.id
    ORDER BY g.id;
  `);
    return data.rows;
};

export const getByIdGroup = async (fastify, id) => {
    const data = await fastify.pg.query(`SELECT * FROM work_groups WHERE id =$1`, [id])
    return data.rows
}
export const updateGroup = async (fastify, id, group) => {
    const keys = Object.keys(group)
    if (keys.length === 0) {
        return { mes: 'không có giá trị để cập nhật' }
    }
    const setClause = keys.map((key, index) => `${key}=$${index + 1}`).join(',')
    const value = Object.values(group)
    value.push(id)
    const query = `UPDATE work_groups SET ${setClause} WHERE id = $${value.length}`
    await fastify.pg.query(query, value)
    /* const dataold= await getByIdGroup(fastify,id)
    const name = group.name ?? dataold.name
    const description  = group.description ?? dataold.description
    const owner_id = group.owner_id ?? dataold.owner_id
    await fastify.pg.query(`UPDATE work_groups SET name = $1,description = $2,owner_id= $3 WHERE id = $4`,
        [name,description,owner_id,id]
    ) */
}
export const deleteGroup = async (fastify, id) => {
    await fastify.pg.query('DELETE FROM work_groups WHERE id = $1`', [id])
}
export const addMembers = async (fastify, id, members) => {
    // Nếu là chuỗi -> parse thành JSON
    if (typeof members === 'string') {
        members = JSON.parse(members);
    }
    const client = await fastify.pg.connect();
    if (members.user_id && members.user_id.length > 0) {
        for (const m of members.user_id) {
            await client.query(
                `INSERT INTO group_members (group_id, user_id)
                 VALUES ($1, $2)`,
                [id, m]
            );
        }
    }

    client.release();
};
export const deleteMembers = async (fastify, userId, groupId) => {
    await fastify.pg.query(
        `DELETE FROM group_members 
        WHERE group_id =$1 AND user_id=$2`,
        [groupId, userId.user_id]
    )
}
