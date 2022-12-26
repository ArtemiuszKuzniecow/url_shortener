const express = require("express");
const chalk = require("chalk");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use("/api/auth", require("./routes/auth.routes"));

const PORT = config.get("port") || 8080;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.cyanBright("MongoDB connected"));
    app.listen(PORT, () => {
      console.log(chalk.cyanBright(`App has been started on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(`Server error ${error}`));
    process.exit();
  }
}

start();
