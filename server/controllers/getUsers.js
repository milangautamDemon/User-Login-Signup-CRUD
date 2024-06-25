import express from "express";
import User from "../model/user.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  //check if user exists or not
  const users = await User.find();
  console.log(users);

  //if not exists then throw error message
  if (users.length === 0) {
    return res.status(400).send({
      success: false,
      err_msg: "USER NOT FOUND !!!",
      msg: "User not found !!!",
    });
  }

  const userData = users.map((user) => ({
    id: user._id,
    userName: user.userName,
  }));

  res.status(200).send({
    success: true,
    msg: "Users data fetch successfully !",
    data: userData,
  });
});

export { router };
export default router;
