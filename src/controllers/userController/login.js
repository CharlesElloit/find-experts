const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const collection = require("../../models");

function validateUserloginData(data) {
  const schema = Joi.object({
    email: Joi.string().max(255)
      .required()
      .email()
      .trim()
      .strip()
      .required(),
    password: Joi.string().min(6)
      .max(30)
      .required()
      .trim()
      .strip()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  return schema.validate(data);
}

const login = async (req, res) => {
  const { error } = validateUserloginData(req.body);

  if (error) {
    return res.status(400).json({
      field: error.details[0].context.label,
      error: error.details[0].message,
    });
  }

  const userInfo = await collection.User.findOne({ email: req.body.email });
  if (!userInfo) {
    return res.status(400).send({
      field: "email",
      error: "Email or Password was incorrect",
    });
  }

  const valid = await bcrypt.compare(req.body.password, userInfo.password);
  if (!valid) {
    return res.status(400).send({
      field: "password",
      error: "Incorrect password",
    });
  }

  // This function is defind in user model
  // const token = collection.User.generateAuthToken();

  const payload = { userId: userInfo._id, email: userInfo.email };
  const token = await jwt.sign(payload, process.env.SECRET_KEY);

  res.status(200).json({ token });

  req.headers.authorization = token;
};

module.exports = login;
