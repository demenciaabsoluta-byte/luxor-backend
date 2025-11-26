require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/User");
const Product = require("./models/Product");
const Section = require("./models/Section");
const Appearance = require("./models/Appearance");
const Texts = require("./models/Texts");

async function runSeed() {
    try {
        console.log("⏳ Conectando a MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB conectado.");

        // LIMPIAR COLECCIONES
        console.log("🧹 Limpiando colecciones...");
        await User.deleteMany({});
        await Product.deleteMany({});
        await Section.deleteMany({});
        await Appearance.deleteMany({});
        await Texts.deleteMany({});
        console.log("✔ Colecciones limpiadas.");

        // SUPERADMIN LUXOR
        const superadmin = await User.create({
            email: "superadmin@luxor.com",
            password: "Luxor2025",
            role: "superadmin",
        });

        // OWNER / ADMIN PRINCIPAL
        const owner = await User.create({
            email: "owner@luxor.com",
            password: "Owner2025",
            role: "owner",
        });

        console.log("🎉 Seed completado con éxito:");
        console.log("   - Superadmin:", superadmin.email);
        console.log("   - Owner:", owner.email);

        mongoose.disconnect();
        console.log("🔌 Conexión cerrada.");
        
    } catch (err) {
        console.error("❌ Error en el seed:", err);
        mongoose.disconnect();
    }
}

runSeed();
