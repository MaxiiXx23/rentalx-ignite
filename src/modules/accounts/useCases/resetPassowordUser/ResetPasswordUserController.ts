import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPassowordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPassowordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPassowordUserUseCase = container.resolve(
            ResetPassowordUserUseCase
        );

        await resetPassowordUserUseCase.execute({
            token: String(token),
            password,
        });

        return response.send();
    }
}

export { ResetPassowordUserController };
