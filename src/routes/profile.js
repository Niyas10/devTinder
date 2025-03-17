const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("invalid edit request ");
    }

    const loggedUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
    await loggedUser.save();

    res.json({
      messge: `${loggedUser.firstName}, your profile updated succesfully`,
      data: loggedUser,
    });
  } catch (err) {
    res.status(400).send("error edit the user" + err.message);
  }
});

profileRouter.patch("/profile/editPassword",userAuth , async (req,res)=>{
    try{
      const {oldPassword,newPassword} = req.body;
      const user = req.user
      const isPasswordValid = await user.validatePassword(oldPassword);
      if(!isPasswordValid){
         throw new Error("Incorrect old Password")
      }
     
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save()
      
      res.status(200).json({message:"Password Update Succesfully"})

    }catch(err){
      res.status(400).send("Somthing went wrong" + err.message)
    }
})



module.exports = profileRouter;
