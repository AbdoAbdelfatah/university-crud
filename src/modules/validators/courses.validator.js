module.exports = {
    type: 'object',
    properties: {
        title: { type: 'string', minLength: 2 },
        code: { type: 'string', pattern: '^[A-Z0-9_-]{2,20}$' },
        description: { type: 'string' },
        credits: { type: 'integer', minimum: 1 },
        students: { type: 'array', items: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' } }
    },
    required: ['title', 'code', 'credits'],
    additionalProperties: false
};