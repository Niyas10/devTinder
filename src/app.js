const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");


app.use(express.json())

app.post("/signup", async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save();
    res.send("succesfully user added ");
  } catch (err) {
    res.status(400).send("error saving the user." + err.message);
  }
});

app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailId

  try{
    const users = await User.find({emailId:userEmail})
    if(users.length===0){
      res.status(400).send("User Not Found")
    }else{
      res.send(users)
    }

  }catch(err){
     res.status(400).send("Something went wrong")
  }
})

app.get("/feed", async (req,res)=>{
  try{
    const users = await User.find({})
    res.send(users)

  }catch(err){
    res.status(400).send("Something went wrong")
  }
})

app.delete("/user",async (req,res)=>{
  const userId = req.body.userId

  try{
    const user = await User.findByIdAndDelete(userId)
  
    res.send("user delete succesfully")


  }catch(err){
    res.status(400).send("Something went wrong")
  }
})

app.patch("/user",async (req,res)=>{
  const userId = req.body.userId
  const data = req.body

  try{

    await User.findByIdAndUpdate({_id:userId},data)
    res.send("user updated successfully")

  }catch(err){
    res.status(400).send("something went wrong")
  }

})















connectDb()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(3000, () => {
      console.log("server running successfully");
    });
  })
  .catch((err) => {
    console.log("Database not connected");
  });
