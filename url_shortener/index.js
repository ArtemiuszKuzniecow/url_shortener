const express = require("express");
const chalk = require("chalk");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

const staticPath = path.resolve(__dirname, "client");

app.use("/", express.static(staticPath));

const indexPath = path.resolve(staticPath, "index.html");

app.get("*", (req, res) => {
  res.sendFile(indexPath);
});

const PORT = config.get("port") || 8080;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.cyanBright("MongoDB connected"));
  } catch (error) {
    console.log(chalk.red(`Server error ${error}`));
    process.exit();
  }
}

start();

module.exports = app;
