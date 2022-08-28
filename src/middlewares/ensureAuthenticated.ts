import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementions/UserRepository";

interface IPayload {
    sub: string;
}

async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error("Token missing.");
    }

    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(
            token,
            process.env.SECRET_KEY_JWT
        ) as IPayload;
        const userRepository = new UserRepository();
        const user = await userRepository.findById(user_id);
        if (!user) {
            throw new AppError("User does not exists.", 401);
        }
        request.user = {
            id: user_id,
        };
        next();
    } catch {
        throw new AppError("Invalid token.", 401);
    }
}
export { ensureAuthenticated };
