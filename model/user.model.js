let mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: String,
    name: String,
    contact: Number,
    role: String,
  },
  {
    versionKey: false,
  }
);

let UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
