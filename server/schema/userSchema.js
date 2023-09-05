import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  telephone: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
});

const userDB = mongoose.model("user", userSchema);

export default userDB;
