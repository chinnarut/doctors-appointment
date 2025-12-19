import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../contexts/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  // const [token, setToken] = useState(true);
  const { token, setToken, userData } = useAppContext();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300">
      <Link
        to={"/"}
        className="text-3xl font-extrabold bg-linear-to-r from-blue-400 to-fuchsia-600 bg-clip-text text-transparent cursor-pointer"
      >
        HEALTH UP
      </Link>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1 uppercase">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1 uppercase">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1 uppercase">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1 uppercase">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="group flex items-center gap-2 cursor-pointer relative">
            <img className="w-16 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary uppercase text-white px-8 py-2 rounded-full font-bold hidden md:block cursor-pointer"
          >
            Sign Up
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        {/* mobile-menu */}
        <div
          className={`${
            showMenu ? "absolute w-full z-500" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <Link
              to={"/"}
              className="text-3xl font-extrabold bg-linear-to-r from-blue-400 to-fuchsia-600 bg-clip-text text-transparent cursor-pointer"
            >
              HEALTH UP
            </Link>
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-7 cursor-pointer"
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-8 mt-5 px-5 text-lg font-medium cursor-pointer">
            <NavLink to={"/"} onClick={() => setShowMenu(false)}>
              <p className={"px-4 py-2 rounded inline-block"}>HOME</p>
            </NavLink>
            <NavLink to={"/doctors"} onClick={() => setShowMenu(false)}>
              <p className={"px-4 py-2 rounded inline-block"}>ALL DOCTORS</p>
            </NavLink>
            <NavLink to={"/about"} onClick={() => setShowMenu(false)}>
              <p className={"px-4 py-2 rounded inline-block"}>ABOUT</p>
            </NavLink>
            <NavLink to={"/contact"} onClick={() => setShowMenu(false)}>
              <p className={"px-4 py-2 rounded inline-block"}>CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
