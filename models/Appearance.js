const mongoose = require("mongoose");

const appearanceSchema = new mongoose.Schema({
    themeColor: String,
    logoUrl: String,
    bannerUrl: String,
});

module.exports = mongoose.model("Appearance", appearanceSchema);
