import React from "react";
import { useAdminContext } from "../contexts/AdminContext";
import { useDoctorContext } from "../contexts/DoctorContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { adminToken, setAdminToken } = useAdminContext();
  const { doctorToken, setDoctorToken } = useDoctorContext();
  const navigate = useNavigate();

  const logout = () => {
    adminToken && setAdminToken("");
    adminToken && localStorage.removeItem("admintoken");
    doctorToken && setDoctorToken("");
    doctorToken && localStorage.removeItem("doctortoken");

    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white">
      <div className="flex items-center gap-2 text-sm">
        <Link
          to={"/"}
          className="text-3xl font-extrabold bg-linear-to-r from-blue-400 to-fuchsia-600 bg-clip-text text-transparent cursor-pointer"
        >
          HEALTH UP
        </Link>
        <p className="border px-2.5 py-0.5 rounded-full border-fuchsia-500 text-fuchsia-600 text-lg font-semibold">
          {adminToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-7 py-2 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
