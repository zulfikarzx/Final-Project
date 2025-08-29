
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaTachometerAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Cart/Cart";



const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Shop",
    link: "/Shop",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/NavTop",
  },
  {
    id: 4,
    name: "Discount Product",
    link: "/Discountproduct",
  },
  {
    id: 5,
    name: "About US",
    link: "/AboutUs",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/Shop",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/NavTop",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/NavTop",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { getquantity } = useContext(CartContext);

  const handleLoginPopup = () => {
    
    navigate("/login");
  }

  function logoutuser() {
    localStorage.removeItem("userinfo");
    navigate("/");
  }


  function handleSingUpPopup() {
    navigate("/signup");
  }
  
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-2 ml-5">
              <img src={Logo} alt="Logo" className="w-20" />
             <span className="text-white mt-4">Fiker</span> 
            </a>
          </div>

          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
             
            </div>

          
            
       { localStorage.getItem("Admininfo") ? (
  <>

<button
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group">
              <span className="text-green-600 cursor-pointer group-hover:block hidden transition-all duration-200" >
             <Link to="/dashboard"> {JSON.parse(localStorage.getItem("Admininfo")).name}'s Dashboard   </Link> 
              </span>
              <FaTachometerAlt className="text-2xl text-green-600 hover:text-primary cursor-pointer" onClick={() => navigate("/dashboard")} />
            </button>
    <button
      className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
    >
       Welcome Boss!
      <FaUserCircle className="text-2xl text-gray-600 hover:text-primary cursor-pointer" /> 
    </button>
   <div className="relative cursor-pointer" onClick={() => navigate("/Cart")}>
      <FaCartShopping className="text-xl text-white drop-shadow-sm" />
      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
        {getquantity()}
      </span>
    </div>
  </>
) :
       
       localStorage.getItem("userinfo")  ?  ( 
        
        <>
         <button
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group hover:scale-105 "
            >
              <span className="group-hover:block hidden transition-all duration-200 text-green-600 ">
              {JSON.parse(localStorage.getItem("userinfo")).name}'s Account
              </span>
              <FaUserCircle className="text-2xl text-white hover:text-green-600 hover:text-primary cursor-pointer" onClick={() => navigate("/user/profile")} />

            </button>

       <div className="relative cursor-pointer hover:scale-120 mr-10" onClick={() => navigate("/Cart")}>
      <FaCartShopping className="text-2xl text-white hover:text-green-600 drop-shadow-sm" />
      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
        {getquantity()}
      </span>
    </div>
            <button onClick={()=>logoutuser()} className="w-[100px] sm:w-[100px] border-2 border-green-600 hover:scale-105 duration-300 text-white rounded-full">
              LogOut
            </button> 
            </>) :
            (
            <><button
              onClick={() => handleLoginPopup()}
              className="w-[100px] sm:w-[100px] border-2 border-green-600 hover:scale-105 duration-300 text-white rounded-full"
            >   
             Login
            </button>
            <button
              onClick={() => handleSingUpPopup()}
              className="w-[100px] sm:w-[100px] border-2 border-green-600 hover:scale-105 duration-300 text-white rounded-full"
            >
             SingUp
            </button>
            
</>
            ) 

            }
           
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4 text-green-600">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
          {/* Simple Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Trending Products
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;