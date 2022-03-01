import express from "express";

import {
    loginHandler,
    registerHandler,
    refreshAccessTokenHandler,
} from "../controllers/auth.controller";
import validateResource from "../middlewares/validateResource";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post(
    "/login",
    validateResource(loginSchema),
    loginHandler
);

router.post(
    "/register",
    validateResource(registerSchema),
    registerHandler
);

router.post("/refresh-token", refreshAccessTokenHandler);

export default router;