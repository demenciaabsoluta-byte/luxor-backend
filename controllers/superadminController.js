import Texts from "../models/Texts.js";
import Appearance from "../models/Appearance.js";
import Banner from "../models/Banner.js";
import Section from "../models/Section.js";
import fs from "fs";

// -------- TEXTOS --------
export const getTexts = async (req, res) => {
  let data = await Texts.findOne();
  if (!data) data = await Texts.create({});
  res.json(data);
};

export const saveTexts = async (req, res) => {
  const updated = await Texts.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(updated);
};


// -------- APARIENCIA --------
export const getAppearance = async (req, res) => {
  let data = await Appearance.findOne();
  if (!data) data = await Appearance.create({});
  res.json({
    primaryColor: data.primaryColor,
    secondaryColor: data.secondaryColor,
    logoUrl: data.logo ? `/uploads/${data.logo}` : null
  });
};

export const saveAppearance = async (req, res) => {
  const update = {
    primaryColor: req.body.primaryColor,
    secondaryColor: req.body.secondaryColor
  };

  if (req.file) update.logo = req.file.filename;

  const updated = await Appearance.findOneAndUpdate({}, update, { new: true, upsert: true });
  res.json(updated);
};


// -------- BANNERS --------
export const getBanners = async (req, res) => {
  const banners = await Banner.find();
  res.json(banners.map(b => ({
    _id: b._id,
    url: `/uploads/${b.url}`
  })));
};

export const uploadBanner = async (req, res) => {
  const file = req.file;
  await Banner.create({ url: file.filename });
  res.json({ msg: "Banner subido" });
};

export const deleteBanner = async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) return res.status(404).json({ msg: "No encontrado" });

  fs.unlink(`uploads/${banner.url}`, () => {});
  await banner.deleteOne();

  res.json({ msg: "Banner eliminado" });
};


// -------- SECCIONES --------
export const getSections = async (req, res) => {
  const sections = await Section.find();
  res.json(sections);
};

export const saveSections = async (req, res) => {
  await Section.deleteMany({});
  await Section.insertMany(req.body);
  res.json({ msg: "Secciones actualizadas" });
};
