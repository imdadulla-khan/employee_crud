const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (v) {
        // Regex to validate email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [1, "Age must be a positive number"],
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  designation: {
    type: String,
    enum: ["HR", "Manager", "Sales"],
    default: "HR",
    required: [true, "Designation is required"],
  },
  gender: {
    type: String,
    enum: ["M", "F"],
    default: "M",
    required: [true, "Gender is required"],
  },
  course: {
    type: [String],
    required: [true, "At least one course is required"],
    enum: ["MCA", "BCA", "BSC"], // Ensures that only these values are allowed
  },
  createdate: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "", // You can change this based on how you want to handle image uploads
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
