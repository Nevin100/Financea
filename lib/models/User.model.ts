import mongoose from "mongoose";

//Setting Schemna : 
const UserSchema = new mongoose.Schema({
  username:
  {
    type: String,
    required: true,
    min: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

//Model :
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
