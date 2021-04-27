const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const dotenv = require("dotenv");
const appRoutes = require("./src/routes");
const DBConnection = require("./config/db.config");
const errorHandlers = require("./handlers/errorHandler");

dotenv.config();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use("/", appRoutes);

// connect to db
DBConnection(process.env.DB_CONNECTION);

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || "localhost";

// Not found error handler
app.use(errorHandlers.notFoundErrorHandler);

// handler for development errors
if (app.get("env" === "development")) {
  app.use(errorHandlers.developmentErrorsHandler);
}

// lets handle the production error  in w
app.use(errorHandlers.productionErrorsHandler);

app.listen(PORT, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
