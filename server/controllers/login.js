import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  res.status(200).send({
    success: true,
    msg: "User Login Successfully!",
    data: {
      userName,
      password,
    },
  });
});

export { router };
export default router;
