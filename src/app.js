const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors")

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
