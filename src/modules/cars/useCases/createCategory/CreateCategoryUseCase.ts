import { injectable, inject } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
// it's the service for controller CreateCategoryController
interface IRequest {
    name: string;
    description: string;
}
@injectable() // Decorator that possibility the injection on class;
class CreateCategoryUseCase {
    constructor(
        // Here a CategoriesRepository will to be instanced automatically for reference on the class.
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}
    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);
        if (categoryAlreadyExists) {
            throw new Error("Category already exists.");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
