const express = require('express')
const app = express()


app.use("/user",(req,res,next)=>{
    console.log("Handling the route user..")
    next()
},(req,res,next)=>{
    console.log("1st route")
    res.send('first route')
})


app.listen(3000,()=>{
    console.log("server running successfully");
})
