import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
     lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type: String,
        default: "user",
    }
});
const UserModel=mongoose.model("users",UserSchema);
export default UserModel;

