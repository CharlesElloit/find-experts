const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const collection = require("../../models");

const refreshTokens = [];

exports.refreshAccessToken = async (req, res, _next) => {
  const refreshToken = req.body.token;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      message: "Refresh access token not found, please login again!",
    });
  }
  // if the refresh token is valid the we gonna create new accessToken.
  const validRefreshToken = await jwt.verify(refreshToken, process.env.SECRET_KEY);
  if (!validRefreshToken) {
    return res.status(403).json({
      success: false,
      message: "Invalid refresh token",
    });
  }

  const payload = {
    userId: validRefreshToken.userId,
    name: validRefreshToken.name,
    email: validRefreshToken.email,
  };

  const accessToken = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "20s" });

  return res.status(200).json({
    success: true,
    accessToken,
  });
};

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

  const accessToken = collection.User.generateAccessToken();
  const refreshToken = collection.User.generateRefreshToken();

  refreshTokens.push(refreshToken);

  res.status(200).json({ accessToken, refreshToken });

  // req.headers.authorization = token;
};

module.exports = login;
