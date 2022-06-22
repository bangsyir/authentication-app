import express from "express";
import { getUsers, login, logout, register } from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/login", login);
router.post("/users", register);
router.get("/refresh", refreshToken);
router.delete("/logout", logout);

export default router;
