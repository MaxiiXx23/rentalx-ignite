import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "../../../modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "../../../modules/rentals/infra/typeorm/entities/Rental";
import { CreateCategories1661021164174 } from "./migrations/1661021164174-CreateCategories";
import { CreateSpecificion1661114048624 } from "./migrations/1661114048624-CreateSpecificion";
import { CreateUsers1661297100863 } from "./migrations/1661297100863-CreateUsers";
import { AlterUserDeleteUsername1661476515118 } from "./migrations/1661476515118-AlterUserDeleteUsername";
import { AlterUserAddAvatar1661710996679 } from "./migrations/1661710996679-AlterUserAddAvatar";
import { CreateCars1662495471014 } from "./migrations/1662495471014-CreateCars";
import { CreateSpecifitionsCars1662679403786 } from "./migrations/1662679403786-CreateSpecifitionsCars";
import { CreateCarImages1662842921078 } from "./migrations/1662842921078-CreateCarImages";
import { CreateNewRentalsTable1662918053980 } from "./migrations/1662918053980-CreateNewRentalsTable";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    entities: [Category, Specification, User, Car, CarImage, Rental],
    migrations: [
        CreateCategories1661021164174,
        CreateSpecificion1661114048624,
        CreateUsers1661297100863,
        AlterUserDeleteUsername1661476515118,
        AlterUserAddAvatar1661710996679,
        CreateCars1662495471014,
        CreateSpecifitionsCars1662679403786,
        CreateCarImages1662842921078,
        CreateNewRentalsTable1662918053980,
    ],
    migrationsTableName: "custom_migration_table",
});

export function createConnection(host = "database"): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
}
export { dataSource };
