import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required:true, // only user allow from 1 email
        unique:true 
    },
    phone: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    answer: {
        type: String,
        required:true,
    },
    address: {
        type: {},
        required:true,
    },
    role: {
        type:Number,
        default:0
    },
   
}, {timestamps: true}
);
  //new user created time
// we write model("collection_name", schema )
const userModel = mongoose.model("users", userSchema);

export default userModel