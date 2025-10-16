export const schemaUser = {
    body:{
        type:'object',
        required:['name','phone','address','email','birth_day','username','password'],
        properties:{
            name:{type:'string',minLength:2,maxLength:20,
                errorMessage:{
                    type: 'Tên phải là chuỗi',
                    minLength: 'Tên phải có ít nhất 2 ký tự ',
                    maxLength:'Tên có độ dài tối đa 20 kí tự',
                   
        },},
            phone:{type:'string',pattern: '^[0-9]{9,11}$',
                errorMessage: {
                    pattern: 'Số điện thoại không đúng định dạng phải có 9-11 chữ số',
                },
            },
            address:{type:'string',minLength:5,
                errorMessage:{
                    minLength:'Độ dài địa chỉ tối thiểu 5 ký tự'
                },
            },
            email:{type:'string',format:'email',
                errorMessage:{
                   format:'email không đúng định dạng'
                },},
            birth_day:{type:'string',format:'date',
                errorMessage:{
                    format:'Ngày sinh phải đúng địng dạng MMMM-NN-YY'
                },
            },
            username :{type:'string',minLength:2,maxLength:20,
                errorMessage:{
                    minLength:'username tối thiểu 2 kí tư',
                    maxLength:'username tối đa 20 kí tự'
                },
            },
            password:{type:'string',minLength:8,maxLength:20,
                errorMessage:{
                    minLength:'username tối thiểu 8 kí tư',
                    maxLength:'username tối đa 20 kí tự'
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
    }
}
export const schemaUpdateUser ={
    body:{
        type:'object',
        required:['name','phone','address','email','birth_day','password'],
        properties:{
            name:{type:'string',minLength:2,maxLength:20,
                errorMessage:{
                    type: 'Tên phải là chuỗi',
                    minLength: 'Tên phải có ít nhất 2 ký tự ',
                    maxLength:'Tên có độ dài tối đa 20 kí tự'
        },
            },
            phone:{type:'string',pattern: '^[0-9]{9,11}$',
                errorMessage: {
                    pattern: 'Số điện thoại không đúng định dạng phải có 9-11 chữ số',
                },
            },
            address:{type:'string',minLength:5,
                errorMessage:{
                    minLength:'Độ dài địa chỉ tối thiểu 5 ký tự'
                },
            },
            email:{type:'string',format:'email',
                errorMessage:{
                   format:'email không đúng định dạng'
                },
            },
            birth_day:{type:'string',format:'date',
                errorMessage:{
                    format:'Ngày sinh phải đúng địng dạng MMMM-NN-YY'
                },
            },
            password:{type:'string',minLength:8,maxLength:20,
                errorMessage:{
                    minLength:'username tối thiểu 8 kí tư',
                    maxLength:'username tối đa 20 kí tự'
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
    }
}
export const schemaDeleteUser = {
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
