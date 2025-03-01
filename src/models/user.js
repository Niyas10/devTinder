const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength:2,
    maxLength:50
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    lowercase:true,
    unique: true,
    trim:true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min:18
  },
  gender: {
    type: String,
    validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender data is not valid")
        }
    }
  },
  photoUrl : {
    type: String,
    default:"https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
  },
  about : {
    type:String,
    default : "This is a defulat about of the user ..!"
  },
  skills : {
      type:[String],
  }
},{
    timestamps:true,
});

module.exports = mongoose.model("User", userSchema);
