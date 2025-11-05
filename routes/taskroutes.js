const express=require('express')
const router=express.Router()
const taskcontroller=require("../controller/taskcontroller")
const { authuser, authorizeRoles }=require('../middleware/auth')

router.post('/addtask',authuser,authorizeRoles('user'),taskcontroller.addtask)
router.get('/gettask',taskcontroller.gettask)
router.put('/updatetask/:id',taskcontroller.updatetask)
router.delete('/deletetask/:id',taskcontroller.deletetask)



module.exports=router