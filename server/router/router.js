import express from "express";
import loginController from "../controllers/login.js";
import registerController from "../controllers/register.js";
import updateController from "../controllers/update.js";
import getUsersController from "../controllers/getUsers.js";

const router = express.Router();

router.use("/auth", loginController);
router.use("/auth", registerController);
router.use("/auth", updateController);
router.use("/auth", getUsersController);

export { router };
export default router;
