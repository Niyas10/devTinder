const mongoose = require('mongoose');

const connectionRequestScehma = new mongoose.Schema({
       fromUserId : {
        type:mongoose.Schema.ObjectId,
        ref:"User", // reference to the user collection
        required:true
       },
       toUserId : {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
       },
       status: {
        type:String,
        required:true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
          }
       }
},{
    timestamps:true,
});

connectionRequestScehma.index({fromUserId:1,toUserId:1})


connectionRequestScehma.pre("save",function(next){
  const   connectionRequests = this ;
  if(connectionRequests.fromUserId.equals(connectionRequests.toUserId)){
    throw new Error("Cannot Send Connection request to yourSelf")
  }
  next()
})

const connectionRequestModel =  mongoose.model("ConnectionRequest",connectionRequestScehma)

module.exports = connectionRequestModel