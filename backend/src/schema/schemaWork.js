export const schemaWork = {
    tags: ['Todos'],
    description: 'Cập nhật trạng thái công việc',
    ssummary: 'updateStatus',
    security: [{ apiKey: [] }],
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'number',
                description: 'todo_id'
            }
        }
    },
    body:{
        type:'object',
        required:['status'],
        properties:{
            status:{type:'string',enum:['new','working','pending','closed','done'],
                errorMessage:{
                    enum:'Trạng thái không hợp lệ(new,working,pending,closed,done)'
                },
            },
        },
        errorMessage:{
            required:{
                status:'trạng thái không được bỏ trống'
            }
        },
    }
}
export const schemaProgress = {
    tags: ['Todos'],
    description: 'Cập nhật tiến độ công việc',
    ssummary: 'updateProgress',
    security: [{ apiKey: [] }],
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'number',
                description: 'todo_id'
            }
        }
    },
    body:{
        type:'object',
        required:['progress'],
        properties:{
            progress:{type:'number',minimum:0,maximum:100,
                errorMessage:{
                    type:'Giá trị phải là số',
                    minimum:'giá trị tối thiểu 0%',
                    maximum:'giá trị tối đa 100%'
                }
            },

        },
        additionalProperties: false, // Chặn field ngoài schema
        errorMessage:{
            required:{
                progress:"progress không được bỏ trống"
            },
            additionalProperties: 'Không được gửi thêm trường không hợp lệ!',
        }
    }
}
export const schemaGetTodosByType = {
     tags: ['Todos'],
    description: 'Xem công việc theo vai trò',
    ssummary: 'updateProgress',
    security: [{ apiKey: [] }],
    
  params: {
    type: 'object',
    required: ['type', 'id'],
    properties: {
      type: {
        type: 'string',
        enum: ['owner', 'assignee', 'reviewer'],
        errorMessage: {
          type: 'type phải là chuỗi',
          enum: 'type chỉ được là "owner", "assignee" hoặc "reviewer"'
        }
      },
      id: {
        type: 'integer',
        minimum: 1,
        description: 'user_id',
        errorMessage: {
          type: 'userId phải là số nguyên',
          minimum: 'userId phải >= 1'
        }
      }
    },
    
  }
}
export const addComment = {
    tags: ['Todos'],
    description: 'Thêm comments công việc',
    ssummary: 'addComment',
    security: [{ apiKey: [] }],
    body:{
        type:'object',
        required:['comment'],
        properties:{
            comment:{type:'string'}
        },
        additionalProperties: false,
        errorMessage:{
            required:{
                comment:'nội dung không được để trống'
            },
        },
    }
}
export const schemaDetailTodo = {
  tags: ['Todos'],
  summary: 'Xem chi tiết công việc',
  description: 'Lấy thông tin chi tiết của một công việc (todo) theo ID, bao gồm người tạo, người được giao, người duyệt và file đính kèm.',
  security: [{ apiKey: [] }], 
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
        description: 'ID của công việc cần xem chi tiết',
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
      description: 'Thông tin chi tiết của công việc',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Hoàn thành báo cáo tuần' },
          description: { type: 'string', example: 'Viết báo cáo công việc tuần này' },
          status: { type: 'string', example: 'in_progress' },
          progress: { type: 'integer', example: 60 },
          deadline: { type: 'string', format: 'date-time', example: '2025-10-30T17:00:00Z' },
          done_day: { type: 'string', format: 'date-time', nullable: true },
          owner: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              username: { type: 'string', example: 'admin' }
            }
          },
          assignee: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 2 },
              username: { type: 'string', example: 'nhanvien1' }
            }
          },
          reviewer: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 3 },
              username: { type: 'string', example: 'truongphong' }
            }
          },
          file_name: { type: 'string', example: 'baocao.docx' },
          file_path: { type: 'string', example: '/uploads/todos/baocao.docx' }
        }
      }
    },
    404: {
      description: 'Không tìm thấy công việc',
      type: 'object',
      properties: {
        error: { type: 'integer', example: 404 },
        mes: { type: 'string', example: 'Không tồn tại công việc với ID này' }
      }
    }
  }
}
export const schemaCommentTodo = {
  tags: ['Todos'],
  summary: 'Thêm bình luận vào công việc (Todo)',
  description: 'API cho phép người dùng thêm bình luận vào một Todo cụ thể.',
  params: {
    type: 'object',
    required: ['userId', 'todoId'],
    properties: {
      userId: {
        type: 'integer',
        minimum: 1,
        description: 'ID của người dùng bình luận',
        example: 5
      },
      todoId: {
        type: 'integer',
        minimum: 1,
        description: 'ID của công việc cần bình luận',
        example: 12
      }
    },
    errorMessage: {
      required: {
        userId: 'Thiếu userId trong URL',
        todoId: 'Thiếu todoId trong URL'
      }
    }
  },
  body: {
    type: 'object',
    required: ['comment'],
    properties: {
      comment: {
        type: 'string',
        minLength: 1,
        maxLength: 500,
        description: 'Nội dung bình luận của người dùng',
        example: 'Công việc này đã hoàn thành xong phần báo cáo.'
      }
    },
    errorMessage: {
      required: {
        comment: 'Thiếu nội dung bình luận'
      },
      properties: {
        comment: 'Nội dung bình luận không hợp lệ (phải là chuỗi)'
      }
    }
  },
  response: {
    200: {
      description: 'Bình luận đã được thêm thành công',
      type: 'object',
      properties: {
        comment: { type: 'string', example: 'Công việc này đã hoàn thành xong phần báo cáo.' }
      }
    }
  }
}
export const schemaGetCommentTodo = {
  tags: ['Todos'],
  summary: 'Lấy danh sách bình luận của một công việc',
  description: 'Trả về toàn bộ bình luận thuộc về một Todo, bao gồm tên người bình luận, nội dung và thời gian tạo.',
  params: {
    type: 'object',
    required: ['todoId'],
    properties: {
      todoId: {
        type: 'integer',
        minimum: 1,
        description: 'ID của công việc cần lấy bình luận',
        example: 10
      }
    },
    errorMessage: {
      required: {
        todoId: 'Thiếu todoId trong URL'
      }
    }
  },
  response: {
    200: {
      description: 'Danh sách bình luận của công việc',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Tên người bình luận',
            example: 'Nguyễn Văn A'
          },
          content: {
            type: 'string',
            description: 'Nội dung bình luận',
            example: 'Công việc này nên hoàn thành trước ngày mai.'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Thời gian bình luận được tạo',
            example: '2025-10-25T09:30:00Z'
          }
        }
      }
    },
    404: {
      description: 'Không tìm thấy bình luận cho Todo này',
      type: 'object',
      properties: {
        error: { type: 'integer', example: 404 },
        mes: { type: 'string', example: 'Không có bình luận nào cho công việc này' }
      }
    }
  }
}


