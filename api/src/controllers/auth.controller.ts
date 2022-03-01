import { Request, Response } from "express";
import { get, pick } from "lodash";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import {
    findSessionById,
    logoutSession,
} from "../services/auth.service";
import { signAccessToken, signTokens } from "../services/token.service";
import { createUser, findUserByEmail, findUserById, validatePassword } from "../services/user.service";
import { verifyJwt } from "../utils/jwt";

export async function loginHandler (
        req: Request<{}, {}, LoginInput>,
        res: Response
    ) {
    const message = "Invalid email or password";
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
        return res.status(401).send({ message });
    }

    const isValid = await validatePassword(user.password, password);

    if (!isValid) {
        return res.status(401).send({ message });
    }

    const result = await signTokens(user);
    // send the tokens

    return res.send({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        ...pick(user, "email", "firstname", "lastname"),
        message: "Login successful"
    });
};

export async function refreshAccessTokenHandler(req: Request, res: Response) {
    const refreshToken = get(req, "headers.x-refresh");

    const decoded = verifyJwt<{ session: string }>(
        refreshToken,
        "refreshTokenPublicKey"
    );

    if (!decoded) {
        return res.status(401).send({ message: "Could not refresh access token" });
    }

    const session = await findSessionById(Number(decoded.session));

    if (!session || !session.valid) {
        return res.status(401).send({ message: "Could not refresh access token" });
    }

    const user = await findUserById(session.ownerId);

    if (!user) {
        return res.status(401).send({ message: "Could not refresh access token" });
    }

    const accessToken = signAccessToken(user);

    return res.send({ accessToken });
};

export async function registerHandler(
        req: Request<{}, {}, RegisterInput>,
        res: Response
    ) {
    const { email, firstname, lastname, password } = req.body;

    const user = await findUserByEmail(email);

    if (user) {
        return res.status(403).send({ message: "The email address you have entered is already registered" });
    }

    const newUser = await createUser({ firstname, lastname, email, password });

    const result = await signTokens(newUser);

    // send the tokens

    return res.status(201).send({
        ...pick(result, ["accessToken", "refreshToken"]),
        ...pick(newUser, "email", "firstname", "lastname"),
        message: "Register successful"
    });
}


export async function logoutHandler(req: Request, res: Response) {
    await logoutSession(res.locals.user.session);
    return res.sendStatus(204);
}