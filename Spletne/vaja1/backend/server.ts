import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";

import appRouter from "./routes";

dotenv.config();

const app = express();
app.use(helmet());
app.use(bodyParser.json({ limit: "100mb" }));
app.disable("x-powered-by");

export default app;
