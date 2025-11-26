const mongoose = require("mongoose");

const textsSchema = new mongoose.Schema({
    aboutUs: String,
    welcomeMessage: String,
    footerText: String,
});

module.exports = mongoose.model("Texts", textsSchema);
