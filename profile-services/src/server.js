const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const profile = require("./routes/profile.routes");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT_SERVICE;
const version = "/profile";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(version, profile);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
