import express from "express";
import User from "../model/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  //get user data from data for registration
  const { userName, password } = req.body;

  // Check if userName is provided
  if (!userName && !password) {
    return res.status(400).send({
      err_code: "USERNAME & PASSWORD REQUIRED",
      message: "UserName & Password is required",
    });
  }

  //check if username already exists
  const isExists = await User.findOne({ userName: userName });

  //if exists then send errors message
  if (isExists) {
    return res.status(400).send({
      success: false,
      err_msg: "USERNAME ALREADY EXISTS !!!",
      msg: "UserName is already exists!!!",
    });
  }

  //generate Salt
  const genSalt = await bcrypt.genSalt(10);

  //create hash password
  const hashedPassword = await bcrypt.hash(password, genSalt);

  //create new user
  const newUser = new User({
    userName,
    password: hashedPassword,
  });

  //register & save new user
  const savedUser = await newUser.save();

  res.status(200).send({
    success: true,
    msg: "User Registered Successfully!",
    data: savedUser,
  });
});

export { router };
export default router;
