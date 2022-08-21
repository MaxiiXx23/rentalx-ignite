import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1661021164174 } from "./migrations/1661021164174-CreateCategories";
import { CreateSpecificion1661114048624 } from "./migrations/1661114048624-CreateSpecificion";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    entities: [Category, Specification],
    migrations: [CreateCategories1661021164174, CreateSpecificion1661114048624],
    migrationsTableName: "custom_migration_table",
});

export function createConnection(host = "database"): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
}
export { dataSource };
