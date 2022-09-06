import { Request, Response, NextFunction } from "express";

import { AppError } from "../../../errors/AppError";

function errorTokenTratament(
    err: Error,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
): Response {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ error: err.message });
    }
    return response.status(500).json({
        status: "error",
        error: `Internal server error - ${err.message}`,
    });
}

export { errorTokenTratament };
