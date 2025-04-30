// routes/prod_router.js

const { Router } = require("express");
const controller = require("../controllers/prod.cont.js");

const router = Router();

router.get("/search", controller.searchProducts);

module.exports = router;  // This should export the router itself
