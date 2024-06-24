import express from "express";
import loginController from "../controllers/login.js";
import registerController from "../controllers/register.js";
import updateController from "../controllers/update.js";

const router = express.Router();

router.use("/auth", loginController);
router.use("/auth", registerController);
router.use("/auth", updateController);

export { router };
export default router;
