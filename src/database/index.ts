import { DataSource } from "typeorm";

const dataSourse = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    entities: [],
    migrations: [],
});

export function createConnection(host = "database"): Promise<DataSource> {
    return dataSourse.setOptions({ host }).initialize();
}
export { dataSourse };
