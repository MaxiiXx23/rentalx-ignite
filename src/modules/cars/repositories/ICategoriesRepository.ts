import { Category } from "../model/Category";

/**
 *  DTO --> Data Transfer Object : é responsável por fazer abstração da tranferência de dados entre
    uma class e outra;
 */
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
