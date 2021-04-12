const bcrypt = require("bcrypt");
const collection = require("../../models");

const register = async (req, res) => {
  // validation
  // check if email exist
  const isUserExist = await collection.User.findOne({ email: req.body.email });
  if (isUserExist) {
    return res.status(400).json({
      email: "Email already in use.",
    });
  }
  // encrypt the password
  const salt = 13;
  const encryptedPassword = await bcrypt.hashSync(req.body.password, salt);
  if (!encryptedPassword) {
    return res.status(500).json({
      passwordError: "something went wrong please try again.",
    });
  }
  // create new user
  const newUser = new collection.User({
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword,
    isContractor: req.body.isContractor,
  });

  await newUser.save();

  res.status(200).json({
    successMessage: "User Created Successfully!",
    userId: newUser._id,
  });
};

module.exports = register;
