import mongoose from "mongoose";

const textsSchema = new mongoose.Schema({
  about: String,
  history: String,
  homeSlogan: String,
  footerText: String
});

export default mongoose.model("Texts", textsSchema);
