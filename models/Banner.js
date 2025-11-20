import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  url: String
});

export default mongoose.model("Banner", bannerSchema);
