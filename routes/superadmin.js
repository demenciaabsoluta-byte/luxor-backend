import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";

import {
  getTexts,
  saveTexts,
  getAppearance,
  saveAppearance,
  getBanners,
  uploadBanner,
  deleteBanner,
  getSections,
  saveSections
} from "../controllers/superadminController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// ------- TEXTOS -------
router.get("/texts", auth("superadmin"), getTexts);
router.put("/texts", auth("superadmin"), saveTexts);

// ------- APARIENCIA -------
router.get("/appearance", auth("superadmin"), getAppearance);
router.put("/appearance", auth("superadmin"), upload.single("logo"), saveAppearance);

// ------- BANNERS -------
router.get("/banners", auth("superadmin"), getBanners);
router.post("/banners", auth("superadmin"), upload.single("banner"), uploadBanner);
router.delete("/banners/:id", auth("superadmin"), deleteBanner);

// ------- SECCIONES -------
router.get("/sections", auth("superadmin"), getSections);
router.put("/sections", auth("superadmin"), saveSections);

export default router;
