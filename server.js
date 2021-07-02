const express = require("express");
const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}))
app.use(express.json())



db.sequelize.sync({ force: true }).then(() => {

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

});