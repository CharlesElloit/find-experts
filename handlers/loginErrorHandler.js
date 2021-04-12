const Joi = require("joi");

// eslint-disable-next-line func-names
exports.validateUserLoginData = function (data) {
  const schema = Joi.Object({
    emai: Joi
      .string()
      .trim()
      .email()
      .required()
      .min(3)
      .max(255),
    password: Joi
      .string()
      .min(6)
      .max(30)
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  return schema.validate(data);
};
