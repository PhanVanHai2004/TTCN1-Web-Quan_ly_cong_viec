export const schemaUser = {
    tags: ['User'],
    description: 'Thêm người dùng',
    summary: 'addUser',
    security: [{ apiKey: [] }],
    body: {
        type: 'object',
        required: ['name', 'phone', 'address', 'email', 'birth_day', 'username', 'password'],
        properties: {
            name: {
                type: 'string', minLength: 2, maxLength: 20,
                errorMessage: {
                    type: 'Tên phải là chuỗi',
                    minLength: 'Tên phải có ít nhất 2 ký tự ',
                    maxLength: 'Tên có độ dài tối đa 20 kí tự',

                },
            },
            phone: {
                type: 'string', pattern: '^[0-9]{9,11}$',
                errorMessage: {
                    pattern: 'Số điện thoại không đúng định dạng phải có 9-11 chữ số',
                },
            },
            address: {
                type: 'string', minLength: 5,
                errorMessage: {
                    minLength: 'Độ dài địa chỉ tối thiểu 5 ký tự'
                },
            },
            email: {
                type: 'string', format: 'email',
                errorMessage: {
                    format: 'email không đúng định dạng'
                },
            },
            birth_day: {
                type: 'string', format: 'date',
                errorMessage: {
                    format: 'Ngày sinh phải đúng địng dạng MMMM-NN-YY'
                },
            },
            username: {
                type: 'string', minLength: 2, maxLength: 20,
                errorMessage: {
                    minLength: 'username tối thiểu 2 kí tư',
                    maxLength: 'username tối đa 20 kí tự'
                },
            },
            password: {
                type: 'string', minLength: 8, maxLength: 20,
                errorMessage: {
                    minLength: 'username tối thiểu 8 kí tư',
                    maxLength: 'username tối đa 20 kí tự'
                },
            },

        },
        errorMessage: {
            required: {
                name: 'Thiếu tên người dùng',
                phone: 'Thiếu số điện thoại',
                address: 'Thiếu địa chỉ',
                email: 'Thiếu email',
                birth_day: 'Thiếu ngày sinh',
                username: 'Thiếu tên đăng nhập',
                password: 'Thiếu mật khẩu',
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
export const schemaUpdateUser = {
    tags: ['User'],
    description: 'Cập nhật thông tin người dùng',
    summary: 'updateUser',
    security: [{ apiKey: [] }],
    body: {
        type: 'object',
        required: ['name', 'phone', 'address', 'email', 'birth_day', 'password'],
        properties: {
            name: {
                type: 'string', minLength: 2, maxLength: 20,
                errorMessage: {
                    type: 'Tên phải là chuỗi',
                    minLength: 'Tên phải có ít nhất 2 ký tự ',
                    maxLength: 'Tên có độ dài tối đa 20 kí tự'
                },
            },
            phone: {
                type: 'string', pattern: '^[0-9]{9,11}$',
                errorMessage: {
                    pattern: 'Số điện thoại không đúng định dạng phải có 9-11 chữ số',
                },
            },
            address: {
                type: 'string', minLength: 5,
                errorMessage: {
                    minLength: 'Độ dài địa chỉ tối thiểu 5 ký tự'
                },
            },
            email: {
                type: 'string', format: 'email',
                errorMessage: {
                    format: 'email không đúng định dạng'
                },
            },
            birth_day: {
                type: 'string', format: 'date',
                errorMessage: {
                    format: 'Ngày sinh phải đúng địng dạng MMMM-NN-YY'
                },
            },
            password: {
                type: 'string', minLength: 8, maxLength: 20,
                errorMessage: {
                    minLength: 'username tối thiểu 8 kí tư',
                    maxLength: 'username tối đa 20 kí tự'
                },
            }
        },
        errorMessage: {
            required: {
                name: 'Thiếu tên người dùng',
                phone: 'Thiếu số điện thoại',
                address: 'Thiếu địa chỉ',
                email: 'Thiếu email',
                birth_day: 'Thiếu ngày sinh',
                password: 'Thiếu mật khẩu',
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
export const schemaDeleteUser = {
    tags: ['User'],
    description: 'Xóa người dùng',
    summary: 'deleteUser',
    security: [{ apiKey: [] }],
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'integer', minimum: 1, errorMessage: { type: 'ID phải là số nguyên dương' } },
        },
        errorMessage: {
            required: { id: 'Thiếu ID người dùng' },
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
};
export const schemaGetUser = {
  tags: ['User'],
  summary: 'getAllUser',
  description: 'Lấy danh sách tất cả người dùng',
  security: [{ apiKey: [] }],
  response: {
    200: {
      description: 'Danh sách Users',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          phone: { type: 'string', pattern: '^[0-9]{9,11}$' },
          address: { type: 'string' },
          birth_day: { type: 'string', format: 'date' },
          email: { type: 'string', format: 'email' },
          username: { type: 'string' },
          password: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
}
export const  schemaGetById = {
    summary: 'Lấy thông tin người dùng theo ID',
    description: 'Trả về thông tin chi tiết của người dùng dựa trên ID được cung cấp.',
    tags: ['User'],
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'integer', description: 'ID của người dùng' }
      }
    },
    response: {
      200: {
        description: 'Thông tin người dùng lấy thành công',
        type: 'object',
        properties: {
          id: { type: 'integer' },
          username: { type: 'string' },
          email: { type: 'string' },
          full_name: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' }
        }
      },
      404: {   
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
    }
}
export const schemaGetByUsername = {
    summary: 'Tìm kiếm người dùng theo tên đăng nhập (username)',
    description: 'Nhận danh sách người dùng có tên đăng nhập khớp hoặc chứa từ khóa được nhập.',
    tags: ['User'],
    querystring: {
      type: 'object',
      required: ['username'],
      properties: {
        username: { type: 'string', description: 'Tên đăng nhập hoặc ký tự cần tìm' }
      }
    },
    response: {
      200: {
        description: 'Danh sách người dùng tìm thấy',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            username: { type: 'string' },
            email: { type: 'string' },
            full_name: { type: 'string' }
          }
        }
      },
      400: {
        description: 'Thiếu tên hoặc ký tự cần tìm',
        type: 'object',
        properties: {
          error: { type: 'integer' },
          mes: { type: 'string' }
        }
      },
      404: {
        description: 'Không tìm thấy người dùng phù hợp',
        type: 'object',
        properties: {
          error: { type: 'integer' },
          mes: { type: 'string' }
        }
      }
    }
}


