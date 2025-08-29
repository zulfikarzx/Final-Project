import React from "react";
import Navbar from "../Navbar/Navbar";

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-600">About Fiker</h1>

        <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          Welcome to <strong>Fiker</strong> — where fashion meets freedom. We're more than just an online store.
          We’re your daily loop of style inspiration, curated products, and a community that celebrates individuality
          and confidence. Whether you're casual or classy, urban or chic, we’ve got the perfect loop for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To empower people to express themselves through fashion — offering trendy, affordable, and high-quality
              products for every style and season.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Why Choose Us</h3>
            <p className="text-gray-600">
              Handpicked collections, seamless shopping experience, fast delivery, and genuine customer care.
              With Style Loop, shopping becomes a joy — not just a task.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Our Story</h3>
            <p className="text-gray-600">
              Style Loop started with a simple belief: fashion should be fun, fearless, and for everyone. Today, we
              serve thousands of customers across the country — and we're just getting started.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Join the Loop Today</h2>
          <p className="text-gray-600 mb-4">Discover your style. Elevate your wardrobe. Loop in with Style Loop.</p>
          <a
            href="/"
            className="inline-block bg-green-600 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div></>
  );
};

export default AboutUs;
