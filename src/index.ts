import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

const app = express();
import appRoutes from "./routes";
import DBConnection from "./config/db.config";
import {
  developmentErrorsHandler,
  notFoundErrorHandler,
  productionErrorsHandler,
} from "./handlers/errorHandler";

dotenv.config();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);
app.use("/", appRoutes);

// connect to db
DBConnection(process.env.DB_CONNECTION);

const PORT: string = process.env.PORT || "9000";
const HOST: string = process.env.HOST || "localhost";

// Not found error handler
app.use(notFoundErrorHandler);

// handler for development errors
if (process.env.NODE_ENV === "development") {
  app.use(developmentErrorsHandler);
}

// lets handle the production error  in w
app.use(productionErrorsHandler);

app.listen(PORT, (): void => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
