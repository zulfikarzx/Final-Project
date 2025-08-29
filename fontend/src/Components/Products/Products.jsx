import { FaStar } from "react-icons/fa6";
import { API_URL } from "../Common/Http";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {

  const [ProductsData, setProductsData] =useState([]);
  const navigate = useNavigate();

const fetchproducts = async() =>{
  await fetch(`${API_URL}showproducts`,{
      method:'GET',
      headers :{
          'Content-type': 'application/json',
      'Accept': 'Application/json',
      
      }
  }).then(res=> res.json())
  .then(result =>  {
      if(result.status == 200){
        console.log(result.products)
          setProductsData(result.products);
          
        
      }else{
          console.log("errosr")
      }
}) 
}

useEffect(() => {
  fetchproducts();
}, []);
  return (
    <div className="mt-14 mb-12">
      <div>
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
           Easy to wear , long lasting and comfortable products for you 
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* card section */}
            {ProductsData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3" 
                 onClick={() => navigate(`/ProductDetail/${data._id}`)}
              >
                <img
                  src={data.image_url
}
                  alt=""
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">Price : ৳ {data.price}</p>
                   <p className="text-sm text-gray-600">Discount Price : ৳ {data.compare_price}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              View All Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;