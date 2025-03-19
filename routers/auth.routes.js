const {Router} = require("express")
const controller = require("../controllers/auth.cont.js")
const router = Router()
router.post("/customer/signup", controller.customerSignUp);
router.post("/vendor/signup", controller.vendorSignUp);
router.post("/signin", controller.signIn);
router.get("/signout", controller.signOut);

module.exports = router;