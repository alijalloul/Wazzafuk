import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import employeeDB from "./schema/employeeSchema.js";
import employerDB from "./schema/employerSchema.js";
import userDB from "./schema/userSchema.js";

import auth from "./middleware/middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb+srv://Zoheir:nm6VVMqGmWwBw8gZ@wazzef.r14oag3.mongodb.net/Wazzafuk")
  .then(() => app.listen(PORT, () => console.log(`Successfully connected to port ${PORT}`)))
  .catch((error) => console.log("There was an error: ", error));

app.get("/", async (req, res) => {
  res.status(500).send("Server is RUNNING");
});

app.post("/users/signup", async (req, res) => {
  const { name, telephone, password, type } = req.body;

  try {
    const existingUser = await userDB.findOne({ telephone });

    if (existingUser) {
      console.log("same User");
      return res.status(400).json({ message: "Account already exists." });
    }

    const hashedPass = await bcrypt.hash(password, 12);

    const result = await userDB.create({ name, telephone, password: hashedPass, type });
    const token = jwt.sign({ telephone: result.telephone, id: result._id }, "sk");

    if (type === "employee") {
      await employeeDB.create({ name, telephone, profession: "", introduction: "", _id: result._id });
    } else {
      await employerDB.create({ name, telephone, _id: result._id });
    }

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/users/login", async (req, res) => {
  const { telephone, password } = req.body;

  try {
    const existingUser = await userDB.findOne({ telephone });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ telephone: existingUser.telephone, id: existingUser._id }, "sk");

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/user", auth, async (req, res) => {
  const body = req.body;
  console.log(body);

  try {
    await userDB.findByIdAndUpdate(body._id, { name: body.name }, { isNew: true });

    let newUser = -1;
    if (body.type === "employee") {
      newUser = await employeeDB.findByIdAndUpdate(body._id, body, { new: true, lean: true }).exec();
    } else {
      newUser = await employerDB.findByIdAndUpdate(body._id, body, { new: true, lean: true }).exec();
    }

    res.status(200).json({ ...newUser, type: body.type });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

import {
  getJobPostsForEmployer,
  getJobPostsForEmployee,
  getAppliedEmployees,
  hireEmployee,
  createJobPost,
  updateJobPost,
  deleteJobPost,
  getJobPosts,
  applyForJob,
} from "./controller/userController.js";

// Retrieve job posts for a specific employer
app.get("/employer/:employerId/:page/posts", getJobPostsForEmployer);

// Retrieve job posts for a specific employee
app.get("/employee/:employeeId/:page/posts", getJobPostsForEmployee);

// Retrieve data of employyes that applied for a specific job
app.get("/job/:jobId/employees", getAppliedEmployees);

// Hire an employee for a specific job post
app.get("/job/:jobId/employee/:employeeId", hireEmployee);

// Create a new job post
app.post("/post", createJobPost);

// Create a new job post
app.patch("/post", auth, updateJobPost);

// Apply for a job
app.post("/application", applyForJob);

// Delete a specific job post
app.delete("/post/:id", deleteJobPost);

// Retrieve job posts
app.get("/posts/:page", getJobPosts);
