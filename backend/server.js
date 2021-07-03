const express = require("express");
const app  = express();
const db   = require("./models");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

/** parse requests of content-type - application/json */
app.use(bodyParser.json());

/** parse requests of content-type - application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const deviceRoutes = require("./routes/device");
app.use("/api/v1/devices",deviceRoutes);

const categoryRoutes = require("./routes/category");
app.use("/api/v1/categories",categoryRoutes);

db.sequelize.sync({ force: true }).then(() => {

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

});
