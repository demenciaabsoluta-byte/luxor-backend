import mongoose from "mongoose";

const appearanceSchema = new mongoose.Schema({
  primaryColor: String,
  secondaryColor: String,
  logo: String
});

export default mongoose.model("Appearance", appearanceSchema);
