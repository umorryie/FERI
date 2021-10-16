import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";

import { setRoutes } from "./routes";
import { standardErrorHandling } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(helmet());
app.use(bodyParser.json({ limit: "100mb" }));
app.disable("x-powered-by");

setRoutes(app);
standardErrorHandling(app);

export default app;
