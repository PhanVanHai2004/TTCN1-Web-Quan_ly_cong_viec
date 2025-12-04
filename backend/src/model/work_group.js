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
        await client.query(
            `INSERT INTO group_members (group_id,user_id,role)
            VALUES ($1,$2,$3)`,
            [group_id, group.creator_id, "owner"]
        )
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
    JSON_AGG(
      DISTINCT JSONB_BUILD_OBJECT(
        'member_id', m.user_id, 
        'member_name', n.name
      )
    ) AS group_members
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
    const setClause = keys.map((key, index) => `${key}=$${index + 1}`).join(',')
    const value = Object.values(group)
    value.push(id)
    const query = `UPDATE work_groups SET ${setClause} WHERE id = $${value.length}`
    const data = await fastify.pg.query(query, value)
    if (data.rowCount === 0) {
        throw new Error(`Nhóm với id ${id} không tồn tại`)

    }
}
export const deleteGroup = async (fastify, id) => {
    const data = await fastify.pg.query('DELETE FROM work_groups WHERE id = $1', [id])
    return data.rowCount
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
    const data = await fastify.pg.query(
        `DELETE FROM group_members 
        WHERE group_id =$1 AND user_id=$2`,
        [groupId, userId.user_id]
    )
    return data.rowCount
}

export const getGroupById = async (fastify, id) => {
    const data = await fastify.pg.query(
        `
        SELECT 
            wg.id AS group_id,
            wg.name AS group_name,
            gm.role AS user_role,

            -- Lấy danh sách tất cả thành viên của group trả về dạng JSON
            (
                SELECT json_agg(json_build_object(
                    'user_id', gm2.user_id,
                    'role', gm2.role
                ))
                FROM group_members gm2
                WHERE gm2.group_id = wg.id
            ) AS members

        FROM group_members gm
        JOIN work_groups wg 
            ON gm.group_id = wg.id
        WHERE gm.user_id = $1
        `, 
        [id]
    );

    return data.rows;
};

