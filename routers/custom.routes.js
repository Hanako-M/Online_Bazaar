const {Router} = require("express")
const {checkUser}= require('../middlewares/auth.mid.js');
const controller = require('../controllers/custom.cont.js');
const router = Router()
router.post('/addToCart', controller.addtoCart);       
router.delete('/removeFromCart', controller.removefromCart); 
router.get('/viewCart', controller.viewCart);              
router.post('/makeOrder', controller.makeOrder);            
router.get('/viewOrders', controller.viewOrders);           
router.delete('/cancelOrder', controller.cancelOrder);  
router.post('/addReview', controller.addReview);  
router.delete('/deleteReview', controller.deleteReview);
router.put('/editInfo', controller.editInfo);
router.get('/viewInfo', controller.viewInfo);
module.exports = router;