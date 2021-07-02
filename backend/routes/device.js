const express = require("express")
const router  = express.Router()
const device = require("../controllers/device.js");
  
router.post("/create", device.create);
  
router.get("/all", device.findAll);
  
router.get("/search/:id", device.findOne);
  
router.delete("/delete/:id", device.delete);
  
module.exports = router;