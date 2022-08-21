import { Repository } from "typeorm";

import { dataSource } from "../../../../database/index";
import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";
/** 
    * Repositories simulam a manipulção de uma tabela em um banco de dados relacional,
    assim tirando a resposabilidade da ROTA fazer isso.
    * DTO --> Data Transfer Object : é responsável por fazer tranferência de dados entre
        uma class e outra;
*/

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;
    constructor() {
        this.repository = dataSource.getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description,
        });
        await this.repository.save(category);
    }
    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }
    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOneBy({ name });
        return category;
    }
}

export { CategoriesRepository };
