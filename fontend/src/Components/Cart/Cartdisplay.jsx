import { useContext } from "react";
import { Trash2 } from "lucide-react";
import { CartContext} from "./Cart";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Cartdisplay = () => {
  const navigate = useNavigate();
    const { cartdata , updatecartItem , deletecartItem} = useContext(CartContext);
    const [qty , setqty] = useState([]);


  const subtotal = cartdata.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleqty = (e,itemId) =>{
    const newqty = e.target.value;
    setqty(prev => ({...prev, [itemId] : newqty}));
    updatecartItem(itemId , newqty);

  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        <div className="space-y-4">
          {cartdata.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <div className="text-lg font-semibold">{item.title}</div>
                <div className="text-sm text-gray-600"> ৳{item.price}</div>
                <div className="text-sm text-gray-600">Size: {item.size}</div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Qty</span>
                <input
                  type="number"
                  min="1"
                  value={ qty[item.id]||item.quantity}
                  className="w-16 rounded border px-2 py-1 text-sm"
                  onChange={(e) => handleqty(e , item.id)}
                />
              </div>
              <button className="ml-4 text-red-500 hover:text-red-700">
                <Trash2 size={18} onClick={()=> deletecartItem(item.id) }  />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm">
          <div className="flex justify-between text-lg font-medium mb-2">
            <span>Subtotal</span>
            <span> ৳{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping</span>
            <span> ৳0</span>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <span>Grand Total</span>
            <span> ৳{subtotal}</span>
          </div>
          <button onClick={()=> navigate("/checkout")} className="mt-6 w-full bg-teal-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-teal-600 transition">
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Cartdisplay;
