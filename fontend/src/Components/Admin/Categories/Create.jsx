import DashbordSidebar from "../../Common/DashbordSidebar";
import Navbar from "../../Navbar/Navbar";
import { useForm } from "react-hook-form";
import { API_URL } from "../../Common/Http";

import { token } from "../../Common/Admintoken";  
import { toast } from "react-toastify";

const Create = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 
  
const savedata = async(data) => {
  console.log(data);
   await fetch(`${API_URL}categories`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
              },
              body: JSON.stringify(data)
          }).then(res => res.json())
          .then(result => {
         
              if(result.status == 200){
                  window.location.href = '/categories';
                  toast.success(result.message);
                
                 
              }else{
                  console.log("Error");
              }   
          })
}

  return (
    <> 
    <Navbar/>
    <div className="min-h-screen flex bg-gray-100">
    <DashbordSidebar/>

    <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
         <h2 className="text-2xl font-semibold">Create New Category</h2>

<div className="p-6 bg-gray-50 flex justify-center items-center ">
      <div className="flex justify-between items-center mb-4">
    
    <div className="create-category w-96">
      
      <form onSubmit={handleSubmit(savedata)}>
        <div className="form-group">
          <label>Name:</label>
          <input
          {
            ...register("name", { required: 'name is required' })
          }
            type="text"
            name="name"
            placeholder="Enter category name"
           
          />
          {
            errors.name && <span className="text-red-500">{errors.name.message}</span>
          }
        </div>
        
        <div className="form-group border-b">
          <label>status</label>
          <select
          {
            ...register("status", { required: 'status is required' })
          }
           name="status">
            <option value=""> Set a status</option>
            <option value="1">Active</option>
            <option value="0">Block</option>
          </select>
          {
            errors.name && <span className="text-red-500">{errors.name.message}</span>
          }
        </div>
        <button type="submit">Create Category</button>
      </form>
    </div> 
    </div> 
    </div>
    </div>
    </div>
    </div>
    
     </>
  );
};

export default Create;