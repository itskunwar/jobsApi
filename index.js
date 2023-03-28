require("dotenv").config();
const express = require("express");
const mongoConnect = require("./db/connect");
const {
  errorHandler: errorHandlerMiddleware,
  notFound: notFoundMiddleware,
} = require("./middlewares");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const authorize = require("./middlewares/jwtAuth");

const PORT = process.env.PORT;
const app = express();

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>JOBS API</h1><a href="/api-docs">Documentation</a>');
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authorize, jobRoutes);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const startServer = async () => {
  try {
    await mongoConnect(process.env.MONGO_URI);
    app.listen(PORT, () => console.log("Server listening on ", PORT));
  } catch (err) {
    console.log(err);
  }
};

startServer();
