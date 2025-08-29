// seeders/userSeeder.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../Models/User.js"; // adjust path if needed

const seedUsers = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/shop");

    // Clear old users
    await User.deleteMany();

    // Insert sample users
    const users = [
      {
        name: "Admin",
        email: "admin@email.com",
        password: await bcrypt.hash("123456", 10),
        role: "admin",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("123456", 10),
        role: "customer",
      },
    
    ];

    await User.insertMany(users);
    console.log("✅ Users Seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
};

seedUsers();
