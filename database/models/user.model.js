import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLenth: [9, "name to short"],
    maxLenth: [30, "name to long"],
    required: true,
  },
  password: {
    type: String,
    minLenth: [9, "password to short"],
    maxLenth: [30, "n to long"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 10,
    max: 80,
  },
  confirmedEmail: {
    type: Boolean,
    default: false,
  },
});

export const userModel = mongoose.model("user", userSchema);
