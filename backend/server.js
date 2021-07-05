const express = require("express");
const app  = express();

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());

/** parse requests of content-type - application/json */
app.use(bodyParser.json());

/** parse requests of content-type - application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

/** Pra verificar se a api está em execução */
const index = require("./routes/index");
app.use(index);

const deviceRoutes = require("./routes/device.routes");
app.use("/api/v1/devices",deviceRoutes);

const categoryRoutes = require("./routes/category.routes");
app.use("/api/v1/categories",categoryRoutes);

module.exports = app;
