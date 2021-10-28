const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    validate: [validator.isEmail, "Please Use Valid Email Address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
    unique: true,
  },
  balance: {
    type: Number,
    min: 0,
    default: 0,
  },
});
UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema, "users");
module.exports = User;
