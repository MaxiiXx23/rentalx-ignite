import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import { createConnection } from "../../../../shared/infra/typeorm";

let connection: DataSource;
// Conflito para realizar os teste com o através do Typeorm e Docker
// Aparece essa nova versão do Typeorm está tendo algum problema com Docker
// link para possivel resolução https://stackoverflow.com/questions/71527426/error-getaddrinfo-eai-again-database-at-getaddrinforeqwrap-onlookup-as-oncompl
describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const id = uuidV4();
        const password = await hash("admin", 8);
        await connection.query(
            `INSERT INTO users(id, name, email, password, driver_license, isAdmin, created_at) 
            values('${id}', 'admin', 'admin@rentx.com.br', '${password}','215478964', true, 'now()' )`
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category SuperTest",
                description: "Category SuperTest Description",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });

    it("Should not be to create a new category with same name", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category SuperTest",
                description: "Category SuperTest Description",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
