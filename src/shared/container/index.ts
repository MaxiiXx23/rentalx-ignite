import { container } from "tsyringe";

import { UserRepository } from "../../modules/accounts/repositories/implementions/UserRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementions/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementions/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
