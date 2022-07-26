import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        const createSpecificationUseCase = container.resolve(
            CreateSpecificationUseCase
        );
        try {
            await createSpecificationUseCase.execute({ name, description });
        } catch (e) {
            const { message } = e;
            return response.status(400).json({ error: message });
        }
        return response.status(201).json({ msg: "Specification created." });
    }
}

export { CreateSpecificationController };
