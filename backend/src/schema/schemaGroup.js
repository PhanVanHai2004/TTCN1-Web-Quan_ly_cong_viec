export const schemaAddGroup = {
    tags: ['Group'],
    description: 'Thêm mới 1 group',
    ssummary: 'thêm group',
    security: [{ apiKey: [] }],
    body: {
        type: 'object',
        required: ['name', 'description', 'owner_id', 'creator_id', 'files'],
        properties: {
            name: {
                type: 'string', minLength: 5, maxLength: 30,
                errorMessage: {
                    type: 'Tên phải là chuỗi',
                    minLength: 'Tên phải có ít nhất 5 ký tự ',
                    maxLength: 'Tên có độ dài tối đa 30 kí tự',

                },
            },
            description: {
                type: 'string', minLength: 1,
                errorMessage: {
                    minLength: 'Mô tả không được bỏ trống ',
                },
            },
            owner_id: {
                type: 'number',
                errorMessage: {
                    type: ' owner_id không hợp lệ',
                },
            },
            creator_id: {
                type: 'number',
                errorMessage: {
                    type: ' creator_id không hợp lệ',
                },
            },
            files: {
                type: 'object',
                required: ['name', 'url'],
                properties: {
                    name: {},
                    url: {}
                },
                errorMessage: {
                    type: 'file là 1 object {name,url}',
                    required: {
                        name: 'thiếu tên file',
                        url: 'thiêu đường dẫn file'
                    }
                },
            },
        },
    }
}
export const schemaAddMembers = {
    tags: ['Group'],
    description: 'Thêm thành viên vào nhóm',
    ssummary: 'thêm thành viên',
    security: [{ apiKey: [] }],
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'number',
                description: 'group id'
            }
        }
    },
    body: {
        type: 'object',
        required: ['user_id'],
        properties: {
            user_id: {
                type: 'array',
                items: { type: 'integer' },
                uniqueItems: true, // ✅ Không cho phép trùng giá trị
                minItems: 1,
                errorMessage: {
                    type: 'user_id phải là một mảng số nguyên',
                    uniqueItems: 'Các user_id không được trùng nhau',
                    minItems: 'Phải có ít nhất 1 user_id'
                }
            }
        },
    }
}
