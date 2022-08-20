import { DataSource } from "typeorm";

import { CreateCategories1661021164174 } from "./migrations/1661021164174-CreateCategories";

const dataSourse = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    entities: [],
    migrations: [CreateCategories1661021164174],
    migrationsTableName: "custom_migration_table",
});

export function createConnection(host = "database"): Promise<DataSource> {
    return dataSourse.setOptions({ host }).initialize();
}
export { dataSourse };
