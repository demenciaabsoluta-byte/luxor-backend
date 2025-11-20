import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  name: String,
  active: Boolean
});

export default mongoose.model("Section", sectionSchema);
