import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import Navbar from '../Navbar/Navbar';
import DashbordSidebar from '../Common/DashbordSidebar';

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0 });

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/dashboard/stats')
      .then(res => res.json())
      .then(result => {
        if (result.status === 200) {
          setStats(result.data);
        }
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-gray-100">
        <DashbordSidebar />
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Users Card */}
            <div className="bg-white shadow-md rounded-md p-6 text-center">
              <div className="text-4xl font-bold text-blue-600">
                <CountUp end={stats.users} duration={2} />
              </div>
              <div className="text-gray-600">Users</div>
            </div>

            {/* Orders Card */}
            <div className="bg-white shadow-md rounded-md p-6 text-center">
              <div className="text-4xl font-bold text-green-600">
                <CountUp end={stats.orders} duration={2} />
              </div>
              <div className="text-gray-600">Orders</div>
            </div>

            {/* Products Card */}
            <div className="bg-white shadow-md rounded-md p-6 text-center">
              <div className="text-4xl font-bold text-purple-600">
                <CountUp end={stats.products} duration={2} />
              </div>
              <div className="text-gray-600">Products</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
