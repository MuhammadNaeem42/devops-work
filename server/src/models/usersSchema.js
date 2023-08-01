const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    userName:{
        type : String
    },
    email:{
        type : String
    },
    phoneNumber:{
        type : Number
    },
    profession:{
        type : String
    },
    address:{
        type : String
    }
})

const usersModel = new mongoose.model("users", usersSchema);

module.exports = usersModel;