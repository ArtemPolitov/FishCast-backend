  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    regionId: {type:Number, required: false},
    cityId: {type:Number, required: false},
    favoriteLocations: { type: [String], required: false }    
  });

  const User = mongoose.model("User",userSchema);

  export default User;