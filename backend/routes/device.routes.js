const express = require("express")
const router  = express.Router()
const deviceRoutes = require("../controllers/device.controller");

router.post("/create", deviceRoutes.create);

router.put("/update/:id", deviceRoutes.update);

router.get("/all", deviceRoutes.findAll);

router.get("/search/:id", deviceRoutes.findOne);

router.delete("/delete/:id", deviceRoutes.delete);

module.exports = router;
