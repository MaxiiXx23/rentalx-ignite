import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    // No injection
    // constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        // Here We can to use the dependency(instance) of UseCase and your function.
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

        try {
            await createCategoryUseCase.execute({ name, description });
            // No injection
            // await this.createCategoryUseCase.execute({ name, description });
        } catch (e) {
            const { message } = e;
            return response.status(400).json({ error: message });
        }

        return response.status(201).json({ msg: "Category create." });
    }
}

export { CreateCategoryController };
