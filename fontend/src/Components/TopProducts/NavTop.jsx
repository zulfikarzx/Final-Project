import React from "react";
import Navbar from "../Navbar/Navbar";
import { API_URL } from "../Common/Http";
import { useEffect, useState } from "react";


const NavTop = () => {
    
const [brands, setbrands] = useState([]);
const [products,setproducts] = useState([]);
const [categories, setcategories] = useState([]);

const [catChecked, setcatChecked] = useState([]);
const [brandChecked, setbrandChecked] = useState([]);


const fetchcategories = () => {
     fetch(`${API_URL}getcategories`,{
        method:'GET',
        headers :{
            'Content-type' : 'application/json',
     'Accept' : 'application/json',       
     }
    }).then(res => res.json())
    .then(result => {
        if(result.status == 200){
            setcategories(result.data)
            
        }else{
            console.log("Error")
        }
    })
}

const fetchbrands = () => {
     fetch(`${API_URL}getbrands`,{
        method:'GET',
        headers :{
            'Content-type' : 'application/json',
     'Accept' : 'application/json',       
     }
    }).then(res => res.json())
    .then(result => {
        if(result.status == 200){
            setbrands(result.data)
            
        }else{
            console.log("Error")
        }
    })
}

const fetchproducts = () => {
  // console.log(catChecked);
  let search = [];
  let params = '';
  

  if(catChecked.length > 0){
    search.push(['category', catChecked]);
  }

  if(brandChecked.length > 0){
    search.push(['brand', brandChecked]);
  }
  if(search.length > 0){

    params = new URLSearchParams(search);
  }
console.log( "search:", search);
  console.log(params.toString());


     fetch(`${API_URL}getproduct?${params}`,{
        method:'GET',
        headers :{
            'Content-type' : 'application/json',
     'Accept' : 'application/json',       
     }
    }).then(res => res.json())
    .then(result => {
        if(result.status == 200){
            setproducts(result.data)
            console.log(result.data);
            
        }else{
            console.log("Error")
        }
    })
}

 

    const handlecategory = (e) => {
        const {checked, value} = e.target;
        if(checked){
            setcatChecked( pre =>[...pre, value]);
        }else{
            setcatChecked(catChecked.filter(id => id !== value));
        }
    }

    const handlebrand = (e) => {
       const {checked, value} = e.target;
        if(checked){
            setbrandChecked( pre =>[...pre, value]);
        }else{
            setbrandChecked(brandChecked.filter(id => id !== value));
        }
    }
    const handleProductClick = (id) => {
        window.location.href = `/ProductDetail/${id}`
    }

useEffect(() => {
        fetchcategories();
        fetchbrands();
        fetchproducts();
    }, [catChecked,brandChecked]);

  return (
    <div className="min-h-screen bg-gray-50">
     <Navbar/>

      <div className="p-6">
        <p className="text-sm text-gray-500 mb-4">Home / Top Products</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-xl p-4 shadow">
              <h2 className="font-semibold mb-2">Categories</h2>
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2 mb-1">
                  <input type="checkbox" value={cat._id} id={cat.id} className="accent-cyan-600" 
                  onClick={(e) => handlecategory(e)} />
                  <label htmlFor={cat.id}>{cat.name}</label>
                </div>
              ))}
            </div>

            {/* Brands */}
            <div className="bg-white rounded-xl p-4 shadow">
              <h2 className="font-semibold mb-2">Brands</h2>
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2 mb-1">
                  <input type="checkbox" value={brand._id} id={brand.id} className="accent-cyan-600" onClick={(e) => handlebrand(e)} />
                  <label htmlFor={brand.id}>{brand.name}</label>
                </div>
              ))}
            </div>
          </aside>

          {/* Product Grid */}
          <main className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
              onClick={() => handleProductClick(product.id)} key={index} className="bg-white p-4 rounded-xl shadow text-center">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="rounded-lg mb-3 w-full h-80 object-cover"
                />
                
                <h3 className="text-lg font-medium">{product.title}</h3>
                <div className="text-sm text-gray-600 space-x-2">
                  <span className="font-bold text-black">{product.compare_price }</span>
                  <span className="line-through">{product.price}</span>
                  <button onClick={() => handleProductClick(product.id)} >details</button>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default NavTop;
