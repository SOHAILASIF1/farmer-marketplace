import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
       
        type:String,
        required:true
    
    },
    password:{
        type:String,
        required:true,
        minLenght:8
    },
    role:{
        type:String,
        enum:["farmer","buyer","admin"],
        default:"buyer"
    },
    phone:{
        type:String,
        trim:true
    },
    city:{
        type:String

    },
    district:{
        type:String
    },
    isApproved:{
        type:Boolean,
        default:true
    },
    isBlocked:{
        type:Boolean,
        default:false

    }

},{timestamps:true})
export default mongoose.model("User", userSchema);