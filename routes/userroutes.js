const express=require('express')
const router=express.Router()
const usercontroller=require('../controller/usercontroller')

router.post('/adduser',usercontroller.adduser)
router.post('/login',usercontroller.loginUser)
router.post('/logoutuser', usercontroller.logoutuser);
router.get('/getuser',usercontroller.getuser)
router.put('/updateuser/:id',usercontroller.updateuser)
router.delete('/deleteuser/:id',usercontroller.deleteduser)



module.exports=router