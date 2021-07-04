const express = require("express")
const router  = express.Router()
const categoryRoutes = require("../controllers/category.controller");

router.post("/create", categoryRoutes.create);

router.get("/all", categoryRoutes.findAll);

router.get("/search/:id", categoryRoutes.findOne);

router.delete("/delete/:id", categoryRoutes.delete);

module.exports = router;
