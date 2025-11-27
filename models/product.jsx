import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
  image: { type: String },
  active: { type: Boolean, default: true }
});

export default mongoose.model("Product", productSchema);
