import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  telephone: { type: String, required: true },
  profession: { type: String },
  introduction: { type: String },
  workExperience: [],
  education: [],
  language: [],
  pdf: { type: String },

  _id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const employeeDB = mongoose.model("employee", employeeSchema);

export default employeeDB;
