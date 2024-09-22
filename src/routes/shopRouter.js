const router = require("express").Router();
const {
  buyProduct
} = require("../controllers/shopController");

router.post("/buy/:id", buyProduct);

module.exports = router;
