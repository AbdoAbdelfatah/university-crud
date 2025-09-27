const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();

addFormats(ajv);

module.exports = (schema) => {
  const validate = ajv.compile(schema); 

  return (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({ errors: validate.errors });
    }
    next();
  };
};
