import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Common/Http";
import { token } from "../../Common/Admintoken";
import DashbordSidebar from "../../Common/DashbordSidebar";
import Navbar from "../../Navbar/Navbar";
import Loader from "../../Common/Loader";
import NotFound from "../../Common/NotFound";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Products = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
      if (result.status === 200) {
        setProducts(result.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_URL}products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      if (result.status === 200) {
        setProducts(products.filter((p) => p.id !== id));
        toast.success(result.message);
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-gray-100">
        <DashbordSidebar />
        <div className="flex-1 p-6">
          <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Products</h2>
              <button
                className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded"
                onClick={() => navigate("/products/create")}
              >
                Create
              </button>
            </div>

            <div className="bg-white shadow rounded overflow-x-auto">
              {loading ? (
                <Loader />
              ) : products.length === 0 ? (
                <NotFound />
              ) : (
                <table className="min-w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Quantity</th>
                     
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id} className="border-t">
                        <td className="py-3 px-4">{p._id}</td>
                        <td className="py-3 px-4">
                          <img src={p.image_url} alt={p.title} width={70} className="object-cover" />
                        </td>
                        <td className="py-3 px-4">{p.title}</td>
                        <td className="py-3 px-4">
                          {p.status === "1" ? (
                            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">Active</span>
                          ) : (
                            <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm">Inactive</span>
                          )}
                        </td>
                        <td className="py-3 px-4">{p.price}</td>
                        <td className="py-3 px-4">{p.quantity}</td>
                       
                        <td className="py-3 px-4 space-x-3">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => navigate(`/products/edit/${p.id}`)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteProduct(p.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
