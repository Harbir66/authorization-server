const validateSchema = (schema, data) => (req, res, next) => {
  if (data === 'headers') {
    const object = { authorization: req.headers['authorization'] };
    const { error } = schema.validate(object);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  } else {
    const { error } = schema.validate(req[data]);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  }
};

module.exports = {
  validateSchema,
};
