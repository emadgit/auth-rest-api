import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { findSessionById } from "../services/auth.service";
import { verifyJwt } from "../utils/jwt";

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = get(req, "headers.x-access-token");

    if (!accessToken) {
        return next();
    }

    const decoded: any = verifyJwt(accessToken, "accessTokenPublicKey");

    if (decoded) {
        const session: any = await findSessionById(Number(decoded.session));
        if(session && session.valid)
            res.locals.user = decoded;
    }

    return next();
};

export default deserializeUser;