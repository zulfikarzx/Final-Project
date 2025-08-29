import { FaStar } from "react-icons/fa";
import { API_URL } from "../Common/Http";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Cart/Cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TopProducts = () => {
  const [ProductsData, setProductsData] = useState([]);
  const { addtocart } = useContext(CartContext); // ✅ use CartContext
  const navigate = useNavigate();

  const fetchproducts = async () => {
    await fetch(`${API_URL}bestproducts`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "Application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProductsData(result.products);
        } else {
          console.log("error");
        }
      });
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  // ✅ Same logic from ProductDetail
  const handleaddtocart = (product) => {
    const user = localStorage.getItem("userinfo");

    if (!user) {
      navigate("/login");
      toast.error("Please login first");
      return;
    }

    if (product.product_sizes && product.product_sizes.length > 0) {
      toast.error("Please select size in product detail page");
      navigate(`/product/${product._id}`); // redirect user to detail page
    } else {
      addtocart(product, null);
      toast.success("Successfully added to cart");
    }
  };

  return (
    <div>
      <div>
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
           
          </p>
        </div>

        {/* Body section */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-5 mb-50 place-items-center"
          style={{ marginTop: "150px" }}
        >
          {ProductsData.map((data) => (
            <div
              key={data._id}
              data-aos="zoom-in"
              className="rounded-2xl w-full bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.image_url}
                  alt={data.title}
                  className=" border-2 border-primary rounded-2xl max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>

              {/* details section */}
              <div className="p-4 text-center">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>

                <h1 className="text-xl font-bold text-white group-hover:text-white">
                  {data.title}
                </h1>
                <div className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />

                <button
                  onClick={() => handleaddtocart(data)} // ✅ add to cart
                  className="bg-primary bg-blue-500 hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary group-hover:text-black"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
