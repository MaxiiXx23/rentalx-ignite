import { Category } from "../entities/Category";

/**
 *  DTO --> Data Transfer Object : é responsável por fazer abstração da tranferência de dados entre
    uma class e outra;
 */
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
