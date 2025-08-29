import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { API_URL } from "../Common/Http";
import { useContext } from "react";
import { CartContext } from "../Cart/Cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Products from '../Products/Products'
import TopProducts from '../TopProducts/TopProducts'
import Banner from '../Banner/Banner'
import Subscribe from '../Subscribe/Subscribe'
import Footer from '../Footer/Footer'



export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [productimages, setproductimages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [size, setsize] = useState([]);
  const params = useParams();
  const { addtocart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();

  const fetchproducts = () => {
    fetch(`${API_URL}getproductdetail/${params.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          
          setProduct(result.data);
          setproductimages(result.data.product_images);
          setsize(result.data.product_sizes);
          // console.log(size.size.id);
         
        
        } else {
          console.log("Error");
        }
      });
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? productimages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === productimages.length - 1 ? 0 : prev + 1
    );
  };
  const handleaddtocart = () => {
    const user = localStorage.getItem("userinfo","Admininfo");
    if( user == null)      
      { navigate("/login");
        toast.error("Please login first")

      }else{
        
 if(size.length > 0){
      if(selectedSize == null){
        toast.error("Please select a size");
      }else{
        addtocart(product, selectedSize); 
        toast.success(" Successfully Product added to cart");
        // console.log(selectedSize);
        // console.log(size);
    }
  } else {
    addtocart(product,null);
  }


      }

  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Side - Product Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {productimages.map((img, index) => (
              <img
                key={index}
                src={img.image_url}
                alt="Thumb"
                onClick={() => setSelectedIndex(index)}
                className={`w-16 h-20 object-cover rounded cursor-pointer border ${
                  selectedIndex === index
                    ? "border-teal-500"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="relative">
            {productimages.length > 0 && (
              <img
                src={productimages[selectedIndex].image_url}
                alt="Main"
                className="w-80 h-[420px] object-cover rounded-lg"
              />
            )}

            {productimages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-0 -translate-y-1/2 p-2 bg-white rounded-full shadow"
                >
                  <span className="text-lg">‹</span>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-0 -translate-y-1/2 p-2 bg-white rounded-full shadow"
                >
                  <span className="text-lg">›</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{product.title}</h2>

          <div className="flex items-center gap-2">
            <div className="text-yellow-500">
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}
            </div>
            <span className="text-sm text-gray-600">{product.reviews} Reviews</span>
          </div>

          <div className="flex items-center gap-2 text-lg">
            <span className="font-bold text-gray-900"> ৳{product.price}</span>
            <span className="line-through text-gray-400"> ৳{product.compare_price}</span>
          </div>
 <div 
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
          <ul className="text-sm text-gray-700 list-disc pl-5">
          
            <li>100% Original Products</li>
            <li>Pay on delivery might be available</li>
            <li>Easy 15 days returns and exchanges</li>
          </ul>

          <div>
            <p className="mb-2">Select Size</p>
           <div className="flex gap-3">
               { size.map((size) => (
                <button
                onClick={() => setSelectedSize(size.size_id.name)  }
                  key={size.size_id._id}
                  value={size.size_id._id}
                  className={`px-4 py-1 text-sm border border-gray-400 rounded hover:bg-gray-100 
                    ${selectedSize == size.size_id.name ? "bg-teal-400 text-white hover:bg-teal-500" : ""}

                  }`}
                >
                  {size.size_id.name} 
                 
                </button>
              ))}
            </div> 
          </div>

          <button onClick={() => handleaddtocart()} className="bg-teal-400 hover:bg-teal-500 text-white font-semibold px-6 py-2 rounded">
            ADD TO CART
          </button>

          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
        </div>
      </div>
     <Subscribe/> 
    <Banner/>
    
    <Footer/>
    </div>

    
  );
}
