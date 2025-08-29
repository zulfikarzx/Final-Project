import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { CartContext } from "../Cart/Cart";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../Common/Http";
import { Usertoken } from "../Common/Admintoken";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [payment, setPayment] = useState("COD");
const navigate = useNavigate();
  const { cartdata , subtotal , grandtotal, Shipping} = useContext(CartContext);

  // const subtotal = cartdata.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 

  const proccessorder = (data) => {
    console.log(data);
    if (payment == "COD") {
      
      saveOrder(data, "not paid");
    }
  };

  const saveOrder = (formData, paymentStatus) => {
    const newformdata ={
      user_id: JSON.parse(localStorage.getItem('userinfo')).id,
      ...formData,
      subtotal: subtotal,
      grand_total: grandtotal,
      shipping: Shipping,
      payment_status: paymentStatus,
      status: "pending",
      cart: cartdata,


    }
    fetch(`${API_URL}saveOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Usertoken()}`,
      },
      body: JSON.stringify(newformdata), 
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          toast.success(result.message);
          localStorage.removeItem("cart");
navigate(`/OrderConfirmation/${result.id}`);
          console.log(result);
        } else {
          console.error(result.error || result.message);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <form onSubmit={handleSubmit(proccessorder)}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Billing Form */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="Name"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  {errors.name && (
                    <span className="text-red-500 mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    {...register("email", { required: "email is required" })}
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  {errors.email && (
                    <span className="text-red-500 mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <textarea
                  {...register("address", { required: "address is required" })}
                  placeholder="Address"
                  rows="3"
                  className="input md:col-span-2 w-full border rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />

                {errors.address && (
                  <span className="text-red-500 w-full">
                    {errors.address.message}
                  </span>
                )}

                <div className="flex flex-col">
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    placeholder="City"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  {errors.city && (
                    <span className="text-red-500 mt-1">
                      {errors.city.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    {...register("state", { required: "State is required" })}
                    type="text"
                    placeholder="State"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  {errors.state && (
                    <span className="text-red-500 mt-1">
                      {errors.state.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    {...register("zip", { required: "zip is required" })}
                    type="text"
                    placeholder="Zip"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  {errors.zip && (
                    <span className="text-red-500 mt-1">
                      {errors.zip.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    {...register("mobile", { required: "Mobile is required" })}
                    type="text"
                    placeholder="Mobile"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  {errors.mobile && (
                    <span className="text-red-500 mt-1">
                      {errors.mobile.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Items</h2>
              {cartdata.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 border-b"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image_url}
                      alt="product"
                      className="rounded-md w-16 h-16 object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {" "}
                        • Size:{item.size} • Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold"> ৳{item.price}</span>
                </div>
              ))}

              {/* Summary */}
              <div className="text-right mt-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span> ৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span> ৳0</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Grand Total</span>
                  <span>
                     ৳
                    {grandtotal}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-2">Payment Method</h3>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                     
                      type="radio"
                      name="payment"
                      value="Stripe"
                      checked={payment === "COD"}
                      onChange={() => setPayment("COD")}
                      className="accent-teal-500"
                    />
                    <span className="ml-2">Stripe</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                 
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={payment === "COD"}
                      onChange={() => setPayment("COD")}
                      className="accent-teal-500"
                    />
                    <span className="ml-2">COD</span>
                  </label>
                </div>
              </div>

              <button className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition">
                Pay Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
