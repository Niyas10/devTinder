const express =  require("express")
const reqestRouter = express.Router()
const {userAuth} = require("../middlewares/auth")


reqestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user = req.user
      console.log("Sending a connection request");
      res.send(user.firstName + "  sent the conection request...!!")  ;  
    })
  

module.exports = reqestRouter ;