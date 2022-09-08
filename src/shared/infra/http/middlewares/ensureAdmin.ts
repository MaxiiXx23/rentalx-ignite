import { Request, Response, NextFunction } from "express";

import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "../../../errors/AppError";

async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const userRespository = new UserRepository();
    const user = await userRespository.findById(id);
    if (!user.isAdmin) {
        throw new AppError("User isn't admin.", 401);
    }
    next();
}

export { ensureAdmin };
