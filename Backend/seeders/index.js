// seeders/index.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import Size from "../Models/Size.js";
// later you can import Category, Brand, Product, etc.

// MongoDB connect
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/shop");
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

// Seed Users
const seedUsers = async () => {
  await User.deleteMany();
  const users = [
    {
      name: "Admin User",
      email: "admin@email.com",
      password: await bcrypt.hash("123456", 10),
      role: "admin",
    },
    {
      name: "Demo User",
      email: "demo@email.com",
      password: await bcrypt.hash("123456", 10),
      role: "customer",
    },
  ];
  await User.insertMany(users);
  console.log("✅ Users Seeded");
};

// Seed Sizes
const seedSizes = async () => {
  await Size.deleteMany();
  const sizes = [
    { name: "S" },
    { name: "M" },
    { name: "L" },
    { name: "XL" },
    { name: "XXL" },
  ];
  await Size.insertMany(sizes);
  console.log("✅ Sizes Seeded");
};

// Master Seeder
const seedAll = async () => {
  await connectDB();
  await seedUsers();
  await seedSizes();
  // here later add seedCategories(), seedBrands(), seedProducts(), etc.
  console.log("🎉 All Data Seeded Successfully!");
  process.exit();
};

seedAll();
