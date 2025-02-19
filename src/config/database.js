

const mongoose = require("mongoose")

const connectDb = async ()=>{
    await mongoose.connect(
          "mongodb+srv://Niyas:URmAgomZ8HDoxgni@devtinder.hn5db.mongodb.net/DevTinder"
    )
}

module.exports = connectDb



