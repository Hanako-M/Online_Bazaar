const {Router} = require("express")
const {checkUser}= require('../middlewares/auth.mid.js');
const controller = require('../controllers/vend.cont.js');
const router = Router()
router.post('/updateProduct/:id', controller.updateProduct);       
router.delete('/removeProduct/:id', controller.removeProduct); 
router.get('/viewProducts', controller.viewProducts);              
router.post('/postProducts', controller.postProducts);            
      
module.exports = router;