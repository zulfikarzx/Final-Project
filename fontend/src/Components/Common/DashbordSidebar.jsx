import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashbordSidebar = () => {
  function logout() {
    localStorage.removeItem("Admininfo");
    navigate("/");
  }
   const navigate = useNavigate();
  return (
    <div>
      <div className="h-full flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-semibold mb-8">Dashboard</h2>
        <ul className="space-y-4">
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/categories")}>Categories</li>
          <li className="hover:text-blue-600 cursor-pointer"onClick={() => navigate("/brands")}>Brands</li>
          <li className="hover:text-blue-600 cursor-pointer"onClick={() => navigate("/products")}>Products</li>
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/Orders")}>Orders</li>
          <li>
            <button 
              onClick={logout} 
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Logout
            </button>
          </li>
          
        </ul>
      </div>
    </div>
    </div>
  )
}

export default DashbordSidebar
