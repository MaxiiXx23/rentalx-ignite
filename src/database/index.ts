import { DataSource } from "typeorm";

import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1661021164174 } from "./migrations/1661021164174-CreateCategories";
import { CreateSpecificion1661114048624 } from "./migrations/1661114048624-CreateSpecificion";
import { CreateUsers1661297100863 } from "./migrations/1661297100863-CreateUsers";
import { AlterUserDeleteUsername1661476515118 } from "./migrations/1661476515118-AlterUserDeleteUsername";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    entities: [Category, Specification, User],
    migrations: [
        CreateCategories1661021164174,
        CreateSpecificion1661114048624,
        CreateUsers1661297100863,
        AlterUserDeleteUsername1661476515118,
    ],
    migrationsTableName: "custom_migration_table",
});

export function createConnection(host = "database"): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
}
export { dataSource };
