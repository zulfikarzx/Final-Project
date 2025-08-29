
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { API_URL } from "../../Common/Http";
import NotFound from "../../Common/NotFound";
import Navbar from "../../Navbar/Navbar";
import Loader from "../../Common/Loader";
import { useNavigate } from "react-router-dom";

import DashbordSidebar from "../../Common/DashbordSidebar";
import { token } from "../../Common/Admintoken";
import { toast } from "react-toastify";



const Categories = () => {
 
const navigate = useNavigate();
    const [categories,setcategories] = useState([]);
    const [loading,setloading] = useState(true);
    

const deleteCategory = async(id) => {
  if(window.confirm("Are you sure you want to delete this category?")){
   await fetch(`${API_URL}categories/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token()}`
        }
    }).then(res => res.json())
    .then(result => {
        if(result.status == 200){
            fetchCategories();
            toast.success(result.message);
        }else{
            console.log("Error");
        }   
    })
  }
}
  
   

    const fetchCategories = async() => {
      
      setloading(true);
       await fetch(`${API_URL}categories`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token()}`
            }
        }).then(res => res.json())
        .then(result => {
        setloading(false);
            if(result.status == 200){
               setcategories(result.categories); 
              
               
            }else{
                console.log("Error");
            }   
        })
    }

    useEffect(() => {
        fetchCategories();
    }, []);

  return (
<>
    <Navbar/>
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
     <DashbordSidebar/>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
         

<div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Categories</h2>
    <button className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded"  onClick={() => navigate("/categories/create")} >
          Create
        </button>
      </div>
      

      <div className="bg-white shadow rounded overflow-x-auto">
        {
          loading == true && <Loader/>
        }
        {
          categories.length == 0 && !loading && <NotFound/>
        }

        {
          categories && categories.length > 0 &&
          <table className="min-w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody>
          {   categories.map(cat => 
              <tr className="border-t">
                <td className="py-3 px-4">{cat._id}</td>
                <td className="py-3 px-4">{cat.name}</td>
                <td className="py-3 px-4">

                {
                  cat.status == 1 ? (
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                  ) : (
                    <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm">
                   Block
                  </span>
                  )
                }
                  
                </td>
                <td className="py-3 px-4 space-x-3">
                  <button    
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => navigate(`/categories/edit/${cat._id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteCategory(cat._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        }
      
      </div>
    </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Categories;
