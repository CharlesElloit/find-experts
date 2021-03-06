import bcrypt from "bcrypt";
import collection from "../../models";
import { Request, Response } from "express";

const register = async (req: Request, res: Response): Promise<any> => {
  // validation
  // check if email exist
  const isUserExist = await collection.User.findOne({ email: req.body.email });
  if (isUserExist) {
    return res.status(400).json({
      email: "Email already in use.",
    });
  }
  // encrypt the password
  const salt = 12;
  const encryptedPassword = await bcrypt.hash(req.body.password, salt);
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

export default register;
