export const schemaWork = {
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
        errorMessage: {
          type: 'userId phải là số nguyên',
          minimum: 'userId phải >= 1'
        }
      }
    },
    
  }
}
export const addComment = {
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
