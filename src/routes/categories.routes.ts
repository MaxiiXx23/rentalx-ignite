import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createCategoryRepositories = new CreateCategoryService(
        categoriesRepository
    );

    createCategoryRepositories.execute({ name, description });

    return response.status(201).json({ msg: "Category create." });
});

categoriesRoutes.get("/", (request, response) => {
    const allCategories = categoriesRepository.list();
    return response.json(allCategories);
});

export { categoriesRoutes };
