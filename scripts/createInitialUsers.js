import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// MODELO DE USUARIO
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String
});

const User = mongoose.model("User", userSchema);

async function createUsers() {
  try {
    console.log("⏳ Conectando a MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // SUPERADMIN
    const superadminEmail = "superadmin@luxor.com";
    const superadminExists = await User.findOne({ email: superadminEmail });

    if (!superadminExists) {
      await User.create({
        name: "Miguel",
        email: superadminEmail,
        password: await bcrypt.hash("Luxor2025", 10),
        role: "superadmin"
      });
      console.log("🔥 SUPERADMIN creado → superadmin@luxor.com / Luxor2025");
    } else {
      console.log("✔️ SUPERADMIN ya existía");
    }

    // ADMIN
    const adminEmail = "admin@luxor.com";
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      await User.create({
        name: "Administrador Local",
        email: adminEmail,
        password: await bcrypt.hash("Admin2025", 10),
        role: "admin"
      });
      console.log("🔥 ADMIN creado → admin@luxor.com / Admin2025");
    } else {
      console.log("✔️ ADMIN ya existía");
    }

    console.log("🎉 Finalizado. Usuarios listos.");

    mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("❌ Error creando usuarios:", error);
    process.exit(1);
  }
}

createUsers();
