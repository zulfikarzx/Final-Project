import DashbordSidebar from "../../Common/DashbordSidebar";
import Navbar from "../../Navbar/Navbar";
import { useForm } from "react-hook-form";
import { API_URL } from "../../Common/Http";

import { token } from "../../Common/Admintoken";
import { toast } from "react-toastify";
import { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Common/Loader";

const Edit = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [productimages, setproductimages] = useState([]);
  const [categories, setcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setsize] = useState(null);
  const [checksizes, setchecksizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      product_id: "",
      content: "",
      price: "",
      category_id: "",
      brand_id: "",
      compare_price: "",
      short_description: "",
      quantity: "",
      gallary: "",
      sku: "",
      status: "",
      barcode: "",
      is_featured: "",
    },
  });

  useEffect(() => {
    Promise.all([fetchProduct(), fetchCategories(), fetchbrands(), fetchsizes()])
      .then(() => setLoading(false));
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(`${API_URL}products/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
setchecksizes(result.product_sizes);
    const product = result.product;
    
    setproductimages(product.product_images || []);
    console.log(product);
    console.log(product.product_images);
    
    setContent(product.description);
    reset({
      title: product.title,
      product_id: product._id,
      content: product.description,
      price: product.price,
      category_id: product.category_id,
      brand_id: product.brand_id,
      compare_price: product.compare_price,
      short_description: product.short_description,
      quantity: product.quantity,
      gallary: product.gallary,
      sku: product.sku,
      status: product.status,
      barcode: product.barcode,
      is_featured: product.is_featured ? "yes" : "no",
    });
  };

  const savedata = async (data) => {
    const formdata = {
      ...data,
      description: content,
    };
    console.log(formdata);
    await fetch(`${API_URL}products/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          navigate("/products");
          toast.success(result.message);
        } else {
          console.log(result.error);
        }
      });
  };

  const fetchCategories = async () => {
    const res = await fetch(`${API_URL}categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    if (result.status == 200) {
      setcategories(result.categories);
    }
  };

  const fetchbrands = async () => {
    const res = await fetch(`${API_URL}brands`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "Application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    if (result.status == 200) {
      setBrands(result.brands);
    }
  };

  const fetchsizes = async () => {
    const res = await fetch(`${API_URL}sizes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "Application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    if (result.status == 200) {
      setsize(result.sizes);
    }
  };

  const handlefile = async (e) => {
    const formdata = new FormData();
    const file = e.target.files[0];
    formdata.append("image", file);
    formdata.append("product_id", params.id);

    const res = await fetch(`${API_URL}saveproductimage`, {
      method: "POST",
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: formdata,
    });
    const result = await res.json();
    if (result.status == 200) {
      setproductimages((prev) => [...prev, result.data]);
    } else {
      toast.error("Error");
    }
    e.target.value = "";
  };

  const setdefault = async (image) => {
    const res = await fetch(`${API_URL}setproductdefaultimage?product_id=${params.id}&image=${image}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "Application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    if (result.status == 200) {
      toast.success(result.message);
    } else {
      toast.error("Error");
    }
  };

  const handleDeleteImage = async (id) => {
    if (confirm("Are you sure you want to delete this image?")) {
      const res = await fetch(`${API_URL}deleteproductimage/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "Application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      if (result.status == 200) {
        const newproductimages = productimages.filter((productimage) => productimage._id !== id);
        setproductimages(newproductimages);
        toast.success(result.message);
      }else{
        toast.error(errors.message);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex bg-gray-100">
          <DashbordSidebar />
          <div className="flex-1 p-6 flex justify-center items-center">
           <Loader/>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-gray-100">
        <DashbordSidebar />

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
           <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Edit product</h2>
 <button className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded"  onClick={() => navigate("/products")} >
          Back
        </button>
</div>

            <div className="p-6 bg-gray-50 flex justify-center items-center ">
              <div className="flex justify-between items-center mb-4">
                
                {/* product details */}
                <div className="w-150">
                  <form onSubmit={handleSubmit(savedata)}>
                    <div className="form-group ">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Name:
                      </label>
                      <input
                        {...register("title", {
                          required: "title is required",
                        })}
                        type="text"
                        placeholder="Enter product title"
                      />
                      {errors.title && (
                        <span className="text-red-500">
                          {errors.title.message}
                        </span>
                      )}
                    </div>

    {/* product catagory  and band */}
                    <div className="flex gap-5">
                      <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Category:
                        </label>
                        <select
                          className="border border-black p-1 rounded w-45"
                          {...register("category_id", {
                            required: "category is required",
                          })}
                        >
                          <option value=""> Select a Category </option>
                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {errors.category_id && (
                          <span className="text-red-500">
                            {errors.category_id.message}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Brand:
                        </label>
                        <select
                          className="border border-black p-1 rounded w-45"
                          {...register("brand_id", {
                            required: "brand is required",
                          })}
                        >
                          <option value=""> Select a Brand</option>
                          {brands.map((brand) => (
                            <option key={brand._id} value={brand._id}>
                              {brand.name}
                            </option>
                          ))}
                        </select>
                        {errors.brand_id && (
                          <span className="text-red-500">
                            {errors.brand_id.message}
                          </span>
                        )}
                      </div>
                    </div>

 {/* product short description */}
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Short description
                      </label>
                      <textarea
                        className="from-group border border-black p-1 rounded w-full"
                        {...register("short_description")}
                        placeholder="Enter short description"
                        rows={3}
                      ></textarea>
                    </div>

  {/* product description */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 mt-4">
                        Description
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      />
                    </div>

                    {/* product price */}
                    <span className="block mb-2 text-xl font-medium text-gray-900 mt-8">
                      Pricing
                    </span>
                    <div className="flex gap-40 mt-4">
                      <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Price:
                        </label>
                        <input
                          className="border border-black p-1 rounded w-45"
                          {...register("price", {
                            required: "price is required",
                          })}
                          type="number"
                          name="price"
                          placeholder="Enter price"
                        />
                        {errors.price && (
                          <span className="text-red-500">
                            {errors.price.message}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Discount Price:
                        </label>
                        <input
                          className="border border-black p-1 rounded w-45"
                          {...register("compare_price")}
                          type="number"
                          placeholder="Enter Discount Price"
                        />
                      </div>
                    </div>
 {/* product inventory */}

                    <span className="block mb-2 text-xl font-medium text-gray-900 mt-4">
                      Inventory
                    </span>
                    <div className="flex gap-5 mt-4 mb-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Quantity:
                        </label>
                        <input
                          className="border border-black p-1 rounded w-45"
                          {...register("quantity", {
                            required: "quantity is required",
                          })}
                          type="number"
                          name="quantity"
                          placeholder="Enter quantity"
                        />
                        {errors.quantity && (
                          <span className="text-red-500">
                            {errors.quantity.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Bracode
                        </label>
                        <input
                          className="border border-black p-1 rounded w-45"
                          {...register("barcode")}
                          type="text"
                          placeholder="Enter bracode"
                        />
                      </div>
                    </div>

                    <div className="flex gap-5 mt-4 mb-4">
                      <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Status:
                        </label>
                        <select
                          className="border border-black p-1 rounded w-45"
                          {...register("status", {
                            required: "status is required",
                          })}
                        >
                          <option value=""> Set a status</option>
                          <option value="1">Active</option>
                          <option value="0">Block</option>
                        </select>
                        {errors.status && (
                          <span className="text-red-500">
                            {errors.status.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor=""
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          SKU
                        </label>
                        <input
                          className="from-group border border-black p-1 rounded w-45"
                          {...register("sku", {
                            required: "sku is required",
                          })}
                          placeholder="Enter sku"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Featured:
                        </label>
                        <select
                          className="border border-black p-1 rounded w-45"
                          {...register("is_featured")}
                        >
                          <option value=""> Is featured?</option>
                          <option value="yes">YES</option>
                          <option value="no">NO</option>
                        </select>
                        {errors.status && (
                          <span className="text-red-500">
                            {errors.status.message}
                          </span>
                        )}
                      </div>

                  {/* product size  */}

<span className="block mb-2 text-xl font-medium text-gray-900 mt-4">
                      Size
                    </span>

<div className="flex gap-5 mt-4 mb-4">
  {sizes && sizes.map((size) => (
    <div key={`psize-${size._id}`}>
      <input
      {
        ...register("size")
      }
      checked = {checksizes.includes(size._id)}
      onChange={(e)=> {
        if (e.target.checked) {
          setchecksizes([...checksizes, size._id]);
        } else {
          setchecksizes(checksizes.filter((id) => id != size._id));
        }
      }}
        id={`size-${size._id}`}
        type="checkbox"
        value={size._id}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={`size-${size._id}`}
        className="ms-2 text-sm font-medium text-black-900 dark:text-black-300"
      >
        {size.name}
      </label>
    </div>
  ))}
</div>


                   
                    

     {/* {product imges} */}
     <span className="block mb-2 text-xl font-medium text-gray-900 mt-4">
                    Gallary
                    </span>

                    <div className="flex gap-5 mt-4 mb-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Product Image:
                        </label>
                        <input
                          onChange={handlefile}
                          type="file"
                          className="from-group border border-black p-1 rounded w-150"
                        />
                        {errors.image && (
                          <span className="text-red-500">
                            {errors.image.message}
                          </span>
                        )}
                      </div>
                    </div>

  {/* show selected images */}

<span>Selected Images:</span>
<div className="flex gap-5 mt-4 mb-4">
  
  {productimages &&
    productimages.map((productimage, index) => {
      
      return (
        <div key={`image-${index}`} className="flex flex-col items-center">
          <img
            className="w-50 h-50"
            src={productimage.image_url}
            alt=""
          />
          <div className="flex justify-between mb-4 gap-6">
         
          <button type="button" onClick={() => setdefault(productimage.image)} 
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 mt-2 self-end rounded-md ">
              Set as default
          </button>
           <button type="button"
            onClick={() => handleDeleteImage(productimage._id)}
             className="bg-red-500 hover:bg-red-700 text-white p-2 mt-2 self-end rounded-md"
          >
          Delete
          </button>
        </div>
        </div>
      );
    })}
</div>
                    <button type="submit">Update Product</button>
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

export default Edit;
