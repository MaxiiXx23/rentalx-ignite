import express from "express";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";

import { createConnection } from "./database";
import "./shared/container";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

createConnection();
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(router);

app.listen(3333, () => console.log("Server is running with Docker!"));
