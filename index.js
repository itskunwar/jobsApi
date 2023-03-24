require("dotenv").config();
const express = require("express");
const mongoConnect = require("./db/connect");
const {
  errorHandler: errorHandlerMiddleware,
  notFound: notFoundMiddleware,
} = require("./middlewares");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/jobs");

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
