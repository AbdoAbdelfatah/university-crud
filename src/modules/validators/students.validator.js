module.exports = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 16 },
    password: { type: 'string', minLength: 6 },
    enrolledCourses: {
      type: 'array',
      items: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' } 
    }
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false
};
