
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "../Common/Http";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { token } from "../Common/Admintoken";
import Loader from "../Common/Loader";
import DashbordSidebar from "../Common/DashbordSidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useForm } from "react-hook-form";


export default function OdersDetails() {
  const [order,setorder] = useState({});
  const [items,setitems] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 

  const statusBadge = {
    delivered: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    shipped: "bg-red-100 text-red-700",
    canceled: "bg-pink-100 text-pink-700",
  };

  const paymentBadge = {
    paid: "bg-green-100 text-green-700",
    "not paid": "bg-red-100 text-red-700",
  };

  const fetchOrder = async () => {
    fetch(`${API_URL}Allorders/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token()}`
      }
    }).then(res => res.json())
    .then(result => {
      if (result.status == 200) {
        
        setorder(result.order);
        console.log(result.order);
        setitems(result.order.order_items);
        toast.success(result.message);
        setLoading(false);
      } else {
        console.log("error");
      }
    });
  } 


const updateOders = async (data) => {
  await fetch(`${API_URL}uporders/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token()}`
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
  .then(result => {
    if (result.status == 200) {
      toast.success(result.message);
    } else {
      console.log("error");
    }
  });
  
}



  useEffect(() => {
    fetchOrder();
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

    <div className="min-h-screen bg-gray-100 p-6 flex gap-6">
      {/* Sidebar */}
      <DashbordSidebar/>

      {/* Order Details */}
      <div className="flex-1 space-y-4">
        {
          loading && <Loader/>
        }
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Order: <span className="text-blue-600">#{order._id}</span>
              <span className={`ml-3 px-2 py-1 text-sm rounded-full ${statusBadge[order.status]}`}>
                {order.status}
              </span>
            </h3>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-4 py-2 rounded" onClick={() => navigate(-1)}>Back</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-600">Customer</h4>
              <p className="text-gray-800">{order.name}</p>
              <p className="text-gray-600">{order.address}</p>
              <p className="text-gray-600">{order.mobile}</p>
            </div>
            <div>
              <p><strong className="text-gray-600">Date:</strong> {order.created_at}</p>
              <p><strong className="text-gray-600">Payment Method:</strong> "COD"</p>
              <p>
                <strong className="text-gray-600">Payment Status:</strong>{" "}
                <span className={`ml-1 px-2 py-1 text-sm rounded-full ${paymentBadge[order.payment_status]}`}>
                  {order.payment_status}
                </span>
              </p>
            </div>
          </div>

          {/* Items */}
          <h4 className="text-md font-semibold mb-2 text-gray-700">Items</h4>
          <div className="border rounded-lg overflow-hidden">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border-b last:border-b-0">
                <img src={item.image_url} alt={item.name} className="w-16 h-20 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                </div>
                <div className="text-sm text-gray-700">x{item.quantity}</div>
                <div className="font-semibold text-gray-800">${item.unit_price}</div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-4 text-right space-y-1 text-sm text-gray-600">
            <p>Subtotal: <span className="ml-2 text-gray-800 font-semibold">${order.subtotal}</span></p>
            <p>Shipping: <span className="ml-2 text-gray-800 font-semibold">${order.shipping}</span></p>
            <p className="text-lg font-bold text-gray-900">Grand Total: <span className="ml-2">${order.grand_total}</span></p>
          </div>
        </div>
      </div>

      {/* Update Form */}
      
      <form onSubmit={handleSubmit(updateOders)} className="w-64 bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
          {
            ...register("status")
          } className="w-full rounded border-gray-300 shadow-sm"
          >
            <option value={"delivered"}>Delivered</option>
            <option value={"pending"}>Pending</option>
            <option value={"canceled"} >Cancelled</option>
            <option value={"shipped"}>shipped</option>
           
          </select>
          {
            errors.status && <span className="text-red-500">{errors.status.message}</span>
          }
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
          <select
          {
            ...register("payment_status")
          } className="w-full rounded border-gray-300 shadow-sm">
            <option value={"paid"}>Paid</option>
            <option value={"not paid"}>Not Paid</option>
          </select>
          {
            errors.payment_status && <span className="text-red-500">{errors.payment_status.message}</span>
          }
        </div>
        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded transition">
          Update
        </button>
      </form>
    </div>
    </div>
  );
}
