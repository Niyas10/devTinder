const express = require('express')
const userRouter = express()
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")


 
userRouter.get("/user/requests/received",userAuth, async (req,res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"])


        res.json({message: "Data Fetched successfully",data: connectionRequest})
        

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

userRouter.get("/user/connections",userAuth, async (req,res)=>{
 try{
    let loggedUser = req.user
    const connectionRequest = await ConnectionRequest.find({
       $or : [
           {toUserId:loggedUser._id,status:"accepted"},
           {fromUserId:loggedUser._id , status:"accepted"}
       ] 
    }).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","LastName"])

    const data = connectionRequest.map((row) => {
        if(loggedUser._id.toString() === row.fromUserId._id.toString()){
               return toUserId
        }
        return row.fromUserId
    })

    res.json({data});

 }catch(err){
    res.status(400).send("ERROR "+ err.message)
 }
     
})

  
 
module.exports = userRouter;