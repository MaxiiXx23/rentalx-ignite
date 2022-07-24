import { Category } from "../model/Category";
/** 
    * Repositories simulam a manipulção de uma tabela em um banco de dados relacional,
    assim tirando a resposabilidade da ROTA fazer isso.
    * DTO --> Data Transfer Object : é responsável por fazer tranferência de dados entre
        uma class e outra;
*/

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository {
    private categories: Category[];
    constructor() {
        this.categories = [];
    }
    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();
        Object.assign(category, {
            name,
            description,
            create_at: new Date(),
        });
        this.categories.push(category);
    }
    list(): Category[] {
        return this.categories;
    }
    findByName(name: string): Category {
        const category = this.categories.find(
            (category) => category.name === name
        );
        return category;
    }
}

export { CategoriesRepository };
