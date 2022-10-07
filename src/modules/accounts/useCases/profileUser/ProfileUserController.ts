import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

// arquivo onde será possível capturar o usuário e gerar a url para visualizar o profile

class ProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const profileUserUseCase = container.resolve(ProfileUserUseCase);

        const user = await profileUserUseCase.execute(id);

        return response.json(user);
    }
}

export { ProfileUserController };
