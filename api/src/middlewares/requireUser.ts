import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user) {
        return res.status(401).send({message: "Token Expired!"});
    }

    return next();
};

export default requireUser;