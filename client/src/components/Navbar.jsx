import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-4 px-4 sm:px-0 sm:mx-20 xl:mx-32">
      <h2
        className="text-xl sm:text-3xl font-bold text-primary cursor-pointer"
        onClick={() => navigate("/")}
      >
        Arjun Anoop
      </h2>
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-xs sm:text-sm cursor-pointer bg-primary text-white px-6 sm:px-10 py-2 sm:py-2.5"
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} alt="arrow" className="w-2 sm:w-3" />
      </button>
    </div>
  );
};

export default Navbar;
