require("dotenv").config({
  path: process.cwd() + "/.env",
});
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("FE/lib"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require("mongoose");
const url = process.env.MONGOURL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin",
});
const db = mongoose.connection;

db.once("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("open");
});

const router = require("./router/index");

app.use("/", router);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
