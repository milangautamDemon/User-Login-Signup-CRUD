import express from "express";
import bcrypt from "bcrypt";
import User from "../model/user.js";

const router = express.Router();

router.put("/update", async (req, res) => {
  //receive the user data from the request body
  const { userName, oldPassword, newPassword } = req.body;

  //check if user data found or not
  if (!userName && !oldPassword) {
    return res.status(400).send({
      success: false,
      err_msg: "USER DETAILS NOT FOUND !!!",
      msg: "User details not found !!!",
    });
  }

  //check if user exists or not
  const userIsExists = await User.findOne({
    userName,
  });

  //if not exists then throw error message
  if (!userIsExists) {
    return res.status(400).send({
      success: false,
      err_msg: "USER NOT EXISTS !!!",
      msg: "User not exists !!!",
    });
  }

  console.log(userIsExists);

  //get password from the user database & assign in variable
  const userPassword = await userIsExists.password;
  console.log(userPassword);

  //check if user password match or not
  const isPasswordMatch = await bcrypt.compare(oldPassword, userPassword);
  console.log(isPasswordMatch);

  //if user password not match then throw error message
  if (!isPasswordMatch) {
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

  const id = userIsExists._id;
  //update user

  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    {
      userName: userName,
      $set: {
        password: hashedPassword,
      },
    },
    { new: true }
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
