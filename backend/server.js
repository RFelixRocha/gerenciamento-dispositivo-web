const express = require("express");
const app  = express();
const db   = require("./models");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3000;

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

db.sequelize.sync({ force: true }).then(() => {

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

});
