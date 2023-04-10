import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username cannot be blank"],
  },
  password: {
    type: String,
    required: [true, "password cannot be blank"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.statics.findAndValidate = async function (username, password) {
  const foundUser = await this.findOne({ username });
  if (!foundUser) {
    return false;
  }

  const isValid = await bcrypt.compare(password, foundUser.password);
  return isValid ? foundUser : false;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
