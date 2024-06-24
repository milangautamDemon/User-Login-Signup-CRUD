import express from "express";
import loginController from "../controllers/login.js";
import registerController from "../controllers/register.js";

const router = express.Router();

router.use("/auth", loginController);
router.use("/auth", registerController);

export { router };
export default router;
