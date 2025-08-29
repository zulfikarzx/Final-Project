import DashbordSidebar from "../Common/DashbordSidebar";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import { API_URL } from "../Common/Http";
import { useEffect } from "react";
import Loader from "../Common/Loader";
import { useNavigate } from "react-router-dom";
import { token } from "../Common/Admintoken";

const statusColors = {
  Shipped: "bg-green-100 text-yellow-700",
  pending: "bg-yellow-100 text-red-700",
  Delivared: "bg-red-100 text-green-700",
};

const paymentColors = {
  "not paid": "bg-pink-100 text-pink-700",
  "paid": "bg-green-100 text-green-700",
};

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}Allorders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token()}`
        }
      });

      const result = await response.json();

      if (response.status === 200 && result.status === '200') {
        setOrders(result.orders || result.oders);
        setLoading(false);
      } else {
        console.error("❌ API responded with an error:", result.message || 'Unknown error');
      }
    } catch (err) {
      console.error("🚨 Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <DashbordSidebar />
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="p-6 bg-gray-50 min-h-screen">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">All Orders</h2>
              </div>

              <div className="bg-white shadow rounded overflow-x-auto">
                {loading && <Loader />}
                
                {orders && orders.length > 0 ? (
                  <table className="min-w-full text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Payment</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr 
                          key={order._id} 
                          className="border-t hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate(`/order/${order._id}`)}
                        >
                          <td className="py-3 px-4 font-medium text-blue-600">{order._id}</td>
                          <td className="py-3 px-4">{order.name}</td>
                          <td className="py-3 px-4">{order.email}</td>
                          <td className="py-3 px-4">{order.grand_total}</td>
                          <td className="py-3 px-4">{order.created_at}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentColors[order.payment_status]}`}>
                              {order.payment_status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  !loading && <div className="p-6 text-center">No orders found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}