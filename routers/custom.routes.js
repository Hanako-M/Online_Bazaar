const {Router} = require("express")
const {checkUser}= require('../middlewares/auth.mid.js');
const controller = require('../controllers/custom.cont.js');
const router = Router()
router.post('/addToCart/:id', controller.addtoCart);       
router.delete('/removeFromCart/:id', controller.removefromCart); 
router.get('/viewCart', controller.viewCart);              
router.post('/makeOrder', controller.makeOrder);            
router.get('/viewOrders', controller.viewOrders);           
router.delete('/cancelOrder/:id', controller.cancelOrder);  
module.exports = router;