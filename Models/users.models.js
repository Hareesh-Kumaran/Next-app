import { Schema,models,model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    unique: [true, "username already exists"],
    required: [true, "username is required"],
  },
  image:{
    type:String
  }
},{timestamps:true});

const User=models.user || model("user",userSchema);

export default User;