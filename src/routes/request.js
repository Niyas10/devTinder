const express =  require("express")
const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


 requestRouter.post("/request/send/:status/:toUserId",
 userAuth,
 async (req,res)=>{
 
  try{

    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status

    const connectionRequests = new connectionRequest({
       fromUserId,
       toUserId,
       status 
    })

    const allowedStatus = ["ignored", "interested"];
    if(!allowedStatus.includes(status)){
           return res.status(400).json ({
            message: "Invalid status type : " + status
           })
    }

    const toUser = await User.findById(toUserId)

    if(!toUser){
      return res.status(404).json({
        message : 'User not found'
      })
    }

    const existingConnectionRequest =  await connectionRequest.findOne({
      $or: [
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ],
    })

    if(existingConnectionRequest){
       return res.status(400).json({
        message: "Connection Request Alredy Exists...!"
       })
    }

    const data = await connectionRequests.save()

    res.json({
      message : req.user.firstName+" is "+status+" in "+toUser.firstName,
      data
    })

  }catch(err){
    res.status(400).send("ERROR " + err.message)
  }
 })
  

module.exports = requestRouter ;