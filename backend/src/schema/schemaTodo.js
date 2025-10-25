export const schemaTodo = {
    tags: ['Todos'],
    description: 'Thêm công vịệc, dữ liệu đầu vào là 1 object{owner_id,assignee_id,reviewer_id,name,description,deadline,group_id,file{file_name,file_path}}',
    summary: 'thêm công việc',
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
            group_id: {type:'number'},
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
        200: {
            description: 'Thêm công việc thành công',
            type: 'object',
            properties: {
                mes: { type: 'string' },
            },
            required:['mes'],
        },
        
    },
}
export const schemaUpdateTodo = {
    description: 'Cập nhật thông tin của công việc',
    tags: ['Todos'],
    ssummary: 'updateTodo',
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
export const schemagetAllTodos = {
    summary: 'Lấy danh sách tất cả công việc (todos)',
    description: 'Trả về toàn bộ danh sách công việc trong hệ thống, bao gồm các thông tin cơ bản như tên, trạng thái và hạn chót.',
    tags: ['Todos'],
    response: {
      200: {
        description: 'Danh sách công việc lấy thành công',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID của công việc' },
            name: { type: 'string', description: 'Tên công việc' },
            status: { type: 'string', description: 'Trạng thái hiện tại của công việc (ví dụ: pending, done, in-progress)' },
            deadline: { type: 'string', format: 'date-time', description: 'Thời hạn hoàn thành công việc' }
          }
        }
      },
      500: {
        description: 'Lỗi máy chủ hoặc truy vấn cơ sở dữ liệu thất bại',
        type: 'object',
        properties: {
          error: { type: 'integer' },
          mes: { type: 'string' }
        }
      }
    }
}


export const schemaDeleteTodo = {
  tags: ['Todos'],
  summary: 'Xóa công việc theo ID',
  description: 'Xóa một công việc (todo) khỏi cơ sở dữ liệu dựa trên ID được cung cấp trong URL.',
  security: [{ apiKey: [] }], 
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
        description: 'ID của công việc cần xóa',
        errorMessage: {
          type: 'ID phải là số nguyên',
          minimum: 'ID phải lớn hơn hoặc bằng 1'
        }
      }
    },
    errorMessage: {
      required: {
        id: 'Thiếu ID công việc'
      }
    }
  },
  response: {
    200: {
      description: 'Xóa công việc thành công',
      type: 'object',
      properties: {
        mes: { type: 'string', example: 'xoa thanh cong' }
      }
    },
    404: {
      description: 'Không tìm thấy công việc cần xóa',
      type: 'object',
      properties: {
        error: { type: 'integer', example: 404 },
        mes: { type: 'string', example: 'Công việc không tồn tại' }
      }
    },
    500: {
      description: 'Lỗi máy chủ nội bộ',
      type: 'object',
      properties: {
        error: { type: 'integer', example: 500 },
        mes: { type: 'string', example: 'Lỗi khi xóa công việc' }
      }
    }
  }
}
