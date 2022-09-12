import express from "express";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

import "dotenv/config";

import swaggerFile from "../../../swagger.json";
import "../../container";
import { errorTokenTratament } from "./middlewares/errorTokenTratament";
import { router } from "./routes";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(router);

app.use(errorTokenTratament);

export { app };
