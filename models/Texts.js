import mongoose from "mongoose";

const textsSchema = new mongoose.Schema({
  about: String,
  welcome: String
});

export default mongoose.model("Texts", textsSchema);
