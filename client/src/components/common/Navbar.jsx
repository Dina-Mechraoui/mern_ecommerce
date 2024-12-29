import { useState, useEffect, useRef } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const NavBar = ({cartItems}) => {
  const [isOpen, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }
    const handleScroll = () => {
        const heroSection = document.getElementById("hero-section");
        const heroHeight = heroSection.offsetHeight;

        if (window.scrollY > heroHeight) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    
    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
}, []);

  const { data, loading, error } = useFetch('http://localhost:3000/api/cart/getItemCount')
  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return (
        <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-600">
            Error: {error.message}
        </div>
    );
  }
    console.log(data.count)




  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`w-full z-30 sm:flex justify-between hidden items-center px-10 py-2 transition-all duration-300 ${
         location.pathname === "/" && scrolled || location.pathname !="/" ? "bg-white text-black" : "bg-transparent text-white backdrop-blur-sm"
        } ${location.pathname === "/" ? "fixed top-0" : ""}`
        }
      >
        <div className="text-center font-AbrilFatface leading-none">
          <h1 className="text-4xl m-0"><a href="/">kl</a></h1>
        </div>

        <ul className="flex justify-between w-2/3 lg:w-1/3 text-md">
          <li className={`${location.pathname === "/" ? "font-bold  border-b-2 border-[#FF8A3E]" : ""}`}><a href="/">Home</a></li>
          <li className={`${location.pathname === "/products" ? "font-bold border-b-2 border-[#FF8A3E]" : ""}`}><a href="/products">All products</a></li>
          <li ><Link to="/#contact-us">Contact Us</Link></li>
          <li className={`${location.pathname === "/cart" ? "text-[#FF8A3E]" : ""} relative`}> <a href="/cart"><ShoppingCartIcon/><div className={`${data.count === 0 ? "hidden" : `${location.pathname === "/cart" ? "bg-white border-orange-500 border-[1px]" : "text-white"} w-4 h-4 bg-[#FF8A3E] rounded-xl absolute text-[10px] flex items-center justify-center -bottom-1 -right-1`}`}>{data.count}</div></a></li>
        </ul>
      </nav>

      {/* Mobile Navbar */}
      <nav className={`sm:hidden w-full flex z-30 justify-between items-center px-10 py-3 ${
         location.pathname === "/" && scrolled || location.pathname !="/" ? "bg-white text-black" : "bg-transparent text-white backdrop-blur-sm"
        } ${location.pathname === "/" ? "fixed top-0" : ""}`}>
        <button onClick={() => setOpen(true)}><MenuIcon /></button>
        <div className="text-center font-AbrilFatface leading-none">
          <h1 className="text-4xl m-0"><a href="/">kl</a></h1>
        </div>
        <div className={`${location.pathname === "/cart" ? "text-[#FF8A3E]" : ""} relative`}> <a href="/cart"><ShoppingCartIcon/><div className={`${data.count === 0 ? "hidden" : `${location.pathname === "/cart" ? "bg-white border-orange-500 border-[1px]" : "text-white"} w-4 h-4 bg-[#FF8A3E] rounded-xl absolute text-[10px] flex items-center justify-center -bottom-1 -right-1`}`}>{data.count}</div></a></div>
      </nav>

      {isOpen && (
        <div className="sm:hidden z-30 fixed top-0 left-0 w-2/3 m-0 bg-gray-50 shadow-2xl h-[100vh]">
          <div className="flex justify-between px-10 pt-5 mb-6">
            <div className="text-center font-AbrilFatface leading-none ">
              <h1 className="text-3xl m-0">kl</h1>
            </div>
            <button className="" onClick={() => setOpen(false)}><CloseIcon /></button>
          </div>
          <Divider variant="middle" sx={{BorderColor: "black"}}/>
          <ul className="flex pt-4 flex-col justify-around h-1/3 px-10">
            <li className={` ${location.pathname === "/" ? "font-bold text-[#FF8A3E]" : ""}`}><a className=" flex gap-4" href="/"><HomeIcon />Home</a></li>
            <li className={`${location.pathname === "/products" ? "font-bold  text-[#FF8A3E]" : ""}`}><a  className="flex gap-4" href="/products"><LocalMallIcon />All products</a></li>
            <li className={`${location.pathname === "/cart" ? "text-[#FF8A3E]" : ""} relative`}> <a className="flex gap-4" href="/cart"><ShoppingCartIcon/>Cart</a></li>
            <li><button onClick={()=>setOpen(false)}><Link className="flex gap-4" to="/#contact-us"><ContactSupportIcon />Contact Us</Link></button></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;
