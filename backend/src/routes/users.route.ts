import { Router } from "express";

import { requiresAuth } from "../middlewares/auth";

import * as UsersController from "../controllers/users.controller";

const router = Router();

router.post("/register", UsersController.register);

router.post("/login", UsersController.login);

router.get("/auth", requiresAuth, UsersController.getAuthenticatedUser);

router.post("/logout", UsersController.logout);

export default router;
