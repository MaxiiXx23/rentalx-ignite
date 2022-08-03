import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./listCategoriesUseCase";

class ListCategoriesController {
    constructor(private lisCategoriesUseCase: ListCategoriesUseCase) {}
    handle(request: Request, response: Response): Response {
        const allCategories = this.lisCategoriesUseCase.execute();
        return response.json(allCategories);
    }
}

export { ListCategoriesController };
