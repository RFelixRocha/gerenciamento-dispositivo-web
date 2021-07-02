const express = require("express")
const router  = express.Router()
const category = require("../controllers/category");
  
router.post("/create", category.create);
  
router.get("/all", category.findAll);
  
router.get("/search/:id", category.findOne);

router.delete("/delete/:id", category.delete);
  
module.exports = router;