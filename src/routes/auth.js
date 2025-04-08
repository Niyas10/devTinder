const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const {
      password,
      firstName,
      lastName,
      emailId,
      photoUrl,
      about,
      skills,
      age,
      gender,
    } = req.body;
    const passwordHas = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHas,
      photoUrl,
      about,
      skills,
      age,
      gender,
    });
    await user.save();
    res.send("succesfully user added ");
  } catch (err) {
    res.status(400).send("error saving the user." + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
      
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Succesfull...!");
});

module.exports = authRouter;
