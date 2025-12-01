export const schemaAddGroup = {
    tags: ['Group'],
    description: 'Thêm mới 1 group',
    summary: 'AddGroup',
    security: [{ apiKey: [] }],
    body: {
        type: 'object',
        required: ['name', 'description', 'owner_id', 'creator_id', 'files'],
        properties: {
            name: {
                type: 'string', minLength: 5, maxLength: 100,
                errorMessage: {
                    type: 'Tên phải là chuỗi',
                    minLength: 'Tên phải có ít nhất 5 ký tự ',
                    maxLength: 'Tên có độ dài tối đa 100 kí tự',

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
    },
    response: {
        200: {
            type: 'object',
            properties: {
                mes: { type: 'string' },
            },
        },
    },
}
export const schemaAddMembers = {
    tags: ['Group'],
    description: 'Thêm thành viên vào nhóm',
    summary: 'thêm thành viên',
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
    },
    response: {
        200: {
            type: 'object',
            properties: {
                mes: { type: 'string' },
            },
        },
    },
}
export const schemaDeleteGroup = {
    tags: ['Group'],
    description: 'Xóa group',
    summary: 'deleteGroup',
    security: [{ apiKey: [] }],
    response: {
        200: {
            type: 'object',
            properties: {
                mes: { type: 'string' },
            },
        },
    },
}
export const schemaGetAllGroup = {
  description: 'Lấy danh sách tất cả nhóm cùng thông tin file và thành viên',
  tags: ['Group'],
  summary: 'Lấy tất cả group',
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Nhóm phát triển backend' },
          description: { type: 'string', example: 'Nhóm chịu trách nhiệm phần backend của dự án' },
          created_at: { type: 'string', format: 'date-time', example: '2025-10-25T08:00:00Z' },
          updated_at: { type: 'string', format: 'date-time', nullable: true, example: '2025-10-26T12:30:00Z' },

          // Mảng file URL
          files: {
            type: 'array',
            items: { type: 'string', example: 'https://example.com/uploads/design_doc.pdf' }
          },

          // Mảng thành viên (object)
          group_members: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                member_id: { type: 'integer', example: 12 },
                member_name: { type: 'string', example: 'Nguyễn Văn A' }
              }
            }
          }
        }
      }
    }
  }
};
export const updateGroupSchema = {
  description: 'Cập nhật thông tin nhóm theo ID',
  tags: ['Group'],
  summary: 'Cập nhật group',
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer', description: 'ID của nhóm cần cập nhật', example: 1 }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    description: 'Các trường cần cập nhật (ít nhất 1 trường)',
    properties: {
      name: { type: 'string', example: 'Nhóm lập trình Frontend' },
      description: { type: 'string', example: 'Nhóm đảm nhận phần giao diện người dùng' },
    },
    minProperties: 1,
    errorMessage:{
      minProperties:'Không có dữ liệu để cập nhật'
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        mes: { type: 'string', example: 'cap nhat thanh cong' }
      }
    }
  }
};
export const deleteGroupSchema = {
  description: 'Xóa group theo ID',
  tags: ['Group'],
  summary: 'Xóa group',
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer', description: 'ID của group cần xóa', example: 1 }
    },
    required: ['id']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        mes: { type: 'string', example: 'xoa group thanh cong' }
      }
    }
  }
};
export const deleteMemberSchema = {
  description: 'Xóa một thành viên khỏi group',
  tags: ['Group'],
  summary: 'Xóa thành viên khỏi group',
  params: {
    type: 'object',
    properties: {
      groupId: {
        type: 'integer',
        description: 'ID của group',
        example: 2
      }
    },
    required: ['groupId']
  },
  body: {
    type: 'object',
    properties: {
      user_id: {
        type: 'integer',
        description: 'ID của người dùng cần xóa khỏi group',
        example: 5
      }
    },
    required: ['user_id']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        mes: { type: 'string', example: 'xoa thanh cong' }
      }
    }
  }
};



