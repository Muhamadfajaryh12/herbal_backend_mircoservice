const express = require("express");
require("dotenv").config();
const errorMiddleware = require("./middlewares/error.middleware");
const users = require("./routes/users.routes");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT_SERVICE;
const version = "/auth";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const test = async (req, res) => {
  res.status(200).json({
    message: "test",
  });
};
// app.use(version, test);
app.use(version, users);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Running at localhost ${port}`);
});
