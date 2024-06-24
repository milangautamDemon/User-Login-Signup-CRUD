import express from "express";
import bcrypt from "bcrypt";
import User from "../model/user.js";

const router = express.Router();

router.put("/update", async (req, res) => {
  //receive the user data from the request body
  const { userName, password, newPassword } = req.body;

  //check if user data found or not
  if (!userName && !password) {
    return res.status(400).send({
      success: false,
      err_msg: "USER DETAILS NOT FOUND !!!",
      msg: "User details not found !!!",
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

  //if userName & password match then user can reset password
  //check if user newPassword provided or not
  if (!newPassword) {
    return res.status(400).send({
      success: false,
      err_msg: "USER NEW PASSWORD REQUIRED !!!",
      msg: "User new password is required !!!",
    });
  }
  //generate salt
  const salt = await bcrypt.genSalt(10);

  //create hash password
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  //update user
  const updatedUser = await User.updateOne(
    { userName },
    { password: hashedPassword }
  );

  //send the success message
  res.status(200).send({
    success: true,
    msg: "User Updated Successfully!",
    data: updatedUser,
  });
});

export { router };
export default router;
