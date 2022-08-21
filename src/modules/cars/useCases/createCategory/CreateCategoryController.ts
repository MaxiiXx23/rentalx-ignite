import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        try {
            await this.createCategoryUseCase.execute({ name, description });
        } catch (e) {
            const { message } = e;
            return response.status(400).json({ error: message });
        }

        return response.status(201).json({ msg: "Category create." });
    }
}

export { CreateCategoryController };
