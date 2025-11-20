import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import {
  addProduct,
  updateProduct,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", getProducts);
router.post("/", auth("owner"), upload.single("image"), addProduct);
router.put("/:id", auth("owner"), upload.single("image"), updateProduct);

export default router;
