import { omit, pick } from "lodash";
import { signJwt } from "../utils/jwt";
import { createSession } from "./auth.service";
import { PRIVATE_FIELDS } from "./user.service";

export const signTokens = async (user: any) => {
    const session = await createSession({ ownerId: Number(user.id) });

    // sign a access token
    const accessToken = signAccessToken({ ...pick(user, ["id", "email", "firstname", "lastname"]), session: session.id });

    // sign a refresh token
    const refreshToken = signRefreshToken(session.id);

    return {
      session,
      accessToken,
      refreshToken
    }
}

export function signRefreshToken(session: any) {
    const payload = { session };
    const refreshToken = signJwt(payload, "refreshTokenPrivateKey",
        {
            expiresIn: "7d",
        }
    );

    return refreshToken;
}

export function signAccessToken(user: any) { 
    const payload = omit(JSON.parse(JSON.stringify(user)), PRIVATE_FIELDS);

    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
        expiresIn: "2d",
    });

    return accessToken;
}
