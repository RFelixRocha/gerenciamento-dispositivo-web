const express = require("express");
const app  = express();
const db   = require("./backend/models");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const deviceRoutes = require("./backend/routes/device");
app.use("/api/v1/devices",deviceRoutes);

const categoryRoutes = require("./backend/routes/category");
app.use("/api/v1/categories",categoryRoutes);

db.sequelize.sync({ force: true }).then(() => {

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

});