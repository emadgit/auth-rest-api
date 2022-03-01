import express from "express";

import {
    getCurrentUserHandler,
} from "../controllers/user.controller";
import { logoutHandler } from "../controllers/auth.controller";

const router = express.Router();

router.post(
    "/me",
    getCurrentUserHandler
);

router.post(
    "/logout",
    logoutHandler
);

export default router;