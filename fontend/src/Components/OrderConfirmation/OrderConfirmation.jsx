import React, { useEffect } from 'react';
import { useState } from 'react';
import { API_URL } from '../Common/Http';
import { Usertoken } from '../Common/Admintoken';
import { useParams } from 'react-router-dom';
import Loader from '../Common/Loader';
import { toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';


export default function OrderConfirmation() {
  const [ orders, setOrders ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

   const userId = JSON.parse(localStorage.getItem('userinfo')).id; // however you store it (from localStorage, context, etc.)
  const orderId = params.id;

  const fetchOrders = async () => {
    fetch(`${API_URL}getOderdetails/${orderId}?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${Usertoken()}`
      }
    }).then(res => res.json())
    .then(result => {
      if (result.status == 200) {
        console.log(result.data);
        // setOrders(result.data);
        // setItems(result.data.oderitems);
        setOrders(result.data);
setItems(result.data.order_items);
        console.log(orders);
        toast.success(result.message);
        setLoading(false);
      } else {
        console.log("error");
      }
    });
  
    
  } 
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      { 
        loading ?
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
         <Loader /> 
        </div> : ""
      }
     
    

    
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-green-600 text-center">🎉 Thank You!</h2>
        <p className="text-center text-gray-600 mt-2 mb-8">You have successfully placed your order.</p>

        {/* Order and Customer Details */}
        <div className="grid md:grid-cols-2 gap-6 border-b border-gray-200 pb-6 mb-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h4>
            <p><span className="font-medium">Order ID:</span> {orders._id}</p>
            <p><span className="font-medium">Order Date:</span> {orders.created_at}</p>
            <p><span className="font-medium">Status:</span> 
              <span className="ml-2 inline-block px-3 py-1 text-sm text-yellow-800 bg-yellow-100 rounded-full">{orders.status}</span>
            </p>
            <p><span className="font-medium">Payment:</span> {orders.payment_status == "paid" ? "Paid" : "Cash On Delivery"}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Customer</h4>
            <p><span className="font-medium">Name:</span> {orders.name}</p>
            <p><span className="font-medium">Address:</span> {orders.address}</p>
            <p><span className="font-medium">Contact:</span> {orders.mobile}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-medium text-gray-700">Item</th>
                <th className="px-4 py-2 font-medium text-gray-700">Quantity</th>
                <th className="px-4 py-2 font-medium text-gray-700">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              
                {
                  items.map((item) => (
                    <tr className="border-t" key={item._id}>

                       <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">${item.price}</td>
                      
                    </tr>
                  ))
                }
               
              
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td></td>
                <td className="px-4 py-2 font-semibold">Subtotal</td>
                <td className="px-4 py-2">{orders.subtotal}</td>
              </tr>
              <tr>
                <td></td>
                <td className="px-4 py-2 font-semibold">Shipping</td>
                <td className="px-4 py-2">${orders.shipping}</td>
              </tr>
              <tr>
                <td></td>
                <td className="px-4 py-2 font-bold text-lg">Grand Total</td>
                <td className="px-4 py-2 font-bold text-lg">{orders.grand_total}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow">
            View Order Details
          </button>
          <button onClick={() => navigate("/")} className="px-6 py-2 border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium rounded">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>

    </div>
  );
}
