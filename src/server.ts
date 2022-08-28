import express from "express";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";

import { createConnection } from "./database";
import "./shared/container";
import { errorTokenTratament } from "./middlewares/errorTokenTratament";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

createConnection();
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(router);

app.use(errorTokenTratament);

app.listen(3333, () => console.log("Server is running with Docker!"));
