import express from "express";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = express.Router();

//middleware for env file
dotenv.config();

router.post("/login", async (req, res) => {
  //receive username & password from request body
  const { userName, password } = req.body;

  // Check if userName is provided
  if (!userName && !password) {
    return res.status(400).send({
      err_code: "USERNAME & PASSWORD REQUIRED",
      message: "UserName & Password is required",
    });
  }

  //check if user exists or not
  const userIsExists = await User.findOne({ userName: userName });

  //if not exists then throw error message
  if (!userIsExists) {
    return res.status(400).send({
      success: false,
      err_msg: "USER NOT EXISTS !!!",
      msg: "User not exists !!!",
    });
  }

  //get password from the user database & assign in variable
  const userPassword = await userIsExists.password;

  //check if user password match or not
  const IsPasswordMatch = await bcrypt.compare(password, userPassword);

  //if user password not match then throw error message
  if (!IsPasswordMatch) {
    return res.status(400).send({
      success: false,
      err_msg: "USER USERNAME & PASSWORD NOT MATCH !!!",
      msg: "Username & Password not match !!!",
    });
  }

  //assign user data in jwt token
  const token = jwt.sign(
    {
      userName: User.userName,
      password: User.password,
    },
    process.env.USER_JWT_TOKEN,
    { expiresIn: "2h" }
  );

  res.status(200).send({
    success: true,
    msg: "User Login Successfully!",
    data: {
      userName: userIsExists.userName,
      password: userIsExists.password,
    },
    token,
  });
});

export { router };
export default router;
