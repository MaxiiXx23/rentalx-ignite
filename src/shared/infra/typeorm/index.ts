import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    entities: ["./src/modules/**/entities/*.ts"],
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    migrationsTableName: "custom_migration_table",
});

export function createConnection(
    host = "database_ignite"
): Promise<DataSource> {
    // quando uso o script test, eu 'seto' a NODE_ENV para usar o BD de teste para os teste
    if (process.env.NODE_ENV === "test") {
        return dataSource
            .setOptions({ host, database: "rentx_test" })
            .initialize();
    }
    return dataSource.setOptions({ host }).initialize();
}

export { dataSource };
