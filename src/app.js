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
