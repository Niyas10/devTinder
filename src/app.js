// const express = require("express");
// const connectDB = require("./config/database");
// const app = express();
// const User = require("./models/user")


// app.post("/signup",async (req,res)=>{
//     const user = new User({
//         firstName:'Niyas',
//         lastName:"P",
//         emailId:'niyas@gmail.com',
//         password:"niyas123"
//     })

//     await user.save()
//     res.send("user added succesfully")
// })







const express = require("express")
const app = express()
const connectDb = require("./config/database")
const User = require("./models/user")

app.post("/signup",async(req,res)=>{
    const user =  new User (
      {
        firstName:"Niyas",
        lastName:"p",
        emailId:"test@gmail.com",
        password:"123456789"
      }
    )


    try{
      await user.save()
      res.send("succesfully user added ")
    }catch(err){
   res.status(400).send("error saving the user."+err.message)
    }
 
})




connectDb().then(()=>{
  console.log("Database Connected Successfully")
  app.listen(3000,()=>{
    console.log("server running successfully")
  })

}).catch((err)=>{
  console.log("Database not connected")
})


