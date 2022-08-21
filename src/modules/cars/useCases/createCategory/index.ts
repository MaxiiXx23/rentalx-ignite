// instâncias do meu useCase createCategory

/*
import { CategoriesRepository } from "../../repositories/implementions/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// forma "manual de instânciar a entidade e retornar o controler para a rota"

export default (): CreateCategoryController => {
    const categoriesRepository = new CategoriesRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(
        categoriesRepository
    );
    const createCategoryController = new CreateCategoryController(
        createCategoryUseCase
    );

    return createCategoryController;
};

*/
