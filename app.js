const cluster = require("cluster");
const os = require("os");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const urlRoutes = require("./routes/urlRoutes");
const cors = require("cors");

dotenv.config();

const numCPUs = os.cpus().length;

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => console.log(`MongoDB connected by worker ${process.pid}`))
    .catch((err) => console.error(err));
}

if (cluster.isMaster) {
  console.log(`Master process running on PID: ${process.pid}`);

  // Fork workers based on the number of CPUs
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exits
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited. Starting a new one...`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(cors({ origin: "*" }));
  app.options("*", cors());
  app.use(express.json());

  connectDB();

  app.use("", urlRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}
