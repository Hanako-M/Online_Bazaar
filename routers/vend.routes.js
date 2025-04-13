const {Router} = require("express")
const {checkUser}= require('../middlewares/auth.mid.js');
const controller = require('../controllers/vend.cont.js');
const router = Router()
router.put('/updateProduct', controller.updateProduct);       
router.delete('/removeProduct', controller.removeProduct); 
router.get('/viewProducts', controller.viewProducts);              
router.post('/postProduct', controller.postProducts);     
router.post('/addQuantity', controller.addQuantity);
router.get('/viewInfo', controller.viewInfo);
router.put('/discount', controller.discount);
router.post('/editInfo', controller.editInfo);
     
      
module.exports = router;