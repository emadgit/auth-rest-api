import { Request, Response } from "express";
import { pick } from "lodash";
import { findUserById } from "../services/user.service";

export async function getCurrentUserHandler(req: Request, res: Response) {
    const user = await findUserById(res.locals.user.id);
    return res.send(pick(user, ["email", "firstname", "lastname"]));
}