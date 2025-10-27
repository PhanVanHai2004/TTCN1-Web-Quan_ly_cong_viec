export function handleDatabaseError(err, reply) {
  const dbErrors = {
    '23505': 'Dữ liệu đã tồn tại (trùng khóa duy nhất)',
    '23503': 'Vi phạm khóa ngoại',
    '22003':'Giá trị id quá lớn',
  }

  if (dbErrors[err.code]) {
    return reply.code(400).send({ error: dbErrors[err.code] })
  }

  // nếu không phải lỗi DB đã biết, ném lại để Fastify xử lý
  throw err
}
