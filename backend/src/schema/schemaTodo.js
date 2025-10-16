export const schemaTodo = {
    body:{
        type:'object',
        required:['owner_id','assignee_id','reviewer_id','name','description',
        'deadline','group_id'],
        properties:{
            name:{type:'string',minLength:5,maxLength:50,
                errorMessage:{
                    type: 'Tên phải là chuỗi',
                    minLength: 'Tên nhóm phải có ít nhất 5 ký tự ',
                    maxLength:'Tên nhóm có độ dài tối đa 50 kí tự',                   
        },},
            description:{type:'string',minLength:10,
                errorMessage:{
                    minLength:'Mô tả quá ngắn, ít nhất 10 kí tự'
                },
            },
            deadline:{type:'string',format:'date',
                errorMessage:{
                    format:'Ngày sinh phải đúng địng dạng MMMM-NN-YY'
                },
            },
        }
    }
}
export const schemaUpdateTodo = {
    body:{
        type:'object',
        properties:{
            name:{type:'string',minLength:5,maxLength:50,
                errorMessage:{
                    type: 'Tên phải là chuỗi',
                    minLength: 'Tên nhóm phải có ít nhất 5 ký tự ',
                    maxLength:'Tên nhóm có độ dài tối đa 50 kí tự',                   
        },},
            description:{type:'string',minLength:10,
                errorMessage:{
                    minLength:'Mô tả quá ngắn, ít nhất 10 kí tự'
                },
            },
            deadline:{type:'string',format:'date',
                errorMessage:{
                    format:'Ngày sinh phải đúng địng dạng MMMM-NN-YY'
                },
            },
        }
    }
}