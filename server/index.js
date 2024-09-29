const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid naming conflicts
  },
});

const upload = multer({ storage });

mongoose.connect(
  "mongodb+srv://gmimdadulla:iloveindia333@cluster0.ipee5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/createUser", upload.single("image"), async (req, res) => {
  try {
    const { name, email, age, designation, gender, course, createdate } =
      req.body;

    // Create a new user instance
    const newUser = new UserModel({
      name,
      email,
      age,
      designation,
      gender,
      course,
      createdate: createdate ? new Date(createdate) : undefined, // Convert createdate to Date object
      image: req.file ? req.file.path : undefined, // Store image path
    });

    // Save the user
    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate email error
      return res.status(400).json({ error: "Email already exists" });
    }
    // Validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      return res.status(400).json({ error: errors.join(", ") });
    }
    res.status(500).json({ error: "Server Error" });
  }
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const { name, email, age, designation, gender, course, createdate } =
    req.body;

  // Parse course if it's a string
  const parsedCourse = typeof course === "string" ? JSON.parse(course) : course;

  // Server-side validation
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!email || email.trim() === "" || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }
  if (!age || isNaN(age) || age <= 0) {
    return res.status(400).json({ error: "Valid age is required" });
  }
  if (!designation || !["HR", "Manager", "Sales"].includes(designation)) {
    return res.status(400).json({ error: "Valid designation is required" });
  }
  if (!gender || !["M", "F"].includes(gender)) {
    return res.status(400).json({ error: "Valid gender is required" });
  }
  if (
    !parsedCourse ||
    !Array.isArray(parsedCourse) ||
    parsedCourse.length === 0
  ) {
    return res.status(400).json({ error: "At least one course is required" });
  }

  // Log for debugging
  console.log(req.body);
  console.log(req.file);

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        age: parseInt(age, 10), // Ensure age is a number
        designation,
        gender,
        course: parsedCourse,
        createdate: createdate ? new Date(createdate) : undefined,
        image: req.file ? req.file.path : undefined, // Update image if uploaded
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.listen(3001, () => {
  console.log("Server is running");
});
