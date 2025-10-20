export const schemaTodo = {
    tags: ['Todos'],
    description: 'Thêm công vịệc, dữ liệu đầu vào là 1 object{owner_id,assignee_id,reviewer_id,name,description,deadline,group_id,file{file_name,file_path}}',
    ssummary: 'thêm công việc',
    security: [{ apiKey: [] }],

    body: {
        type: 'object',
        required: ['owner_id', 'assignee_id', 'reviewer_id', 'name', 'description',
            'deadline', 'group_id', 'file'],
        properties: {
            owner_id: {
                type: 'number',
                errorMessage: {
                    type: 'owner_id không hợp lệ',
                },
            },
            assignee_id: {
                type: 'number',
                errorMessage: {
                    type: 'owner_id không hợp lệ',
                }
            },
            reviewer_id: {
                type: 'number',
                errorMessage: {
                    type: 'reviewer_id không hợp lệ',
                }
            },
            name: {
                type: 'string',
                minLength: 5,
                maxLength: 20,
                errorMessage: {
                    minLength: 'Tên có độ dài tối thiểu 5 ký tự',
                    maxLength: 'Tên có độ dài tối đa 20 ký tự'
                }
            },
            description: {
                type: 'string', minLength: 10,
                errorMessage: {
                    minLength: 'Mô tả quá ngắn, ít nhất 10 kí tự'
                },
            },
            deadline: {
                type: 'string', format: 'date',
                errorMessage: {
                    format: 'Ngày sinh phải đúng địng dạng MMMM-NN-YY'
                },
            },
            group_id: {},
            file: {
                type: 'object',
                required: ['file_name', 'file_url'],
                properties: {
                    file_name: {},
                    file_url: {}
                },
                errorMessage: {
                    type: 'file là 1 object {name,url}',
                    required: {
                        name: 'thiếu tên file',
                        url: 'thiêu đường dẫn file'
                    }
                },
            }
        }
    },
    response: {
        201: {
            description: 'Successful response',
            type: 'object',
            properties: {
                hello: { type: 'string' }
            },
        },
        default: {
            description: 'Default response',
            type: 'object',
            properties: {
                foo: { type: 'string' }
            }
        }
    }
}
export const schemaUpdateTodo = {
    description: 'post some data',
    tags: ['Todos'],
    ssummary: 'Lấy danh sách todos',
    security: [{ apiKey: [] }],
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'user id'
            }
        }
    },
    body: {
        type: 'object',
        properties: {
            name: {
                type: 'string', minLength: 5, maxLength: 50,
                errorMessage: {
                    type: 'Tên phải là chuỗi',
                    minLength: 'Tên nhóm phải có ít nhất 5 ký tự ',
                    maxLength: 'Tên nhóm có độ dài tối đa 50 kí tự',
                },
            },
            description: {
                type: 'string', minLength: 10,
                errorMessage: {
                    minLength: 'Mô tả quá ngắn, ít nhất 10 kí tự'
                },
            },
            deadline: {
                type: 'string', format: 'date',
                errorMessage: {
                    format: 'Ngày sinh phải đúng địng dạng MMMM-NN-YY'
                },
            },
        }
    }
}