const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");

//env config
dotenv.config();

const requiredEnv = ["PORT", "MONGO_URL_CLOUD", "JWT_SECRET"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// DB connection

connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// routes
app.use("/api/v1/user", require("./routes/user.routes"));
app.use("/api/v1/todo", require("./routes/todo.routes"));

// global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send({ success: false, message: "Internal server error" });
});

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
