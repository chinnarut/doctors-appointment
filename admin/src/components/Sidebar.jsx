import React from "react";
import { useAdminContext } from "../contexts/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDoctorContext } from "../contexts/DoctorContext";

const Sidebar = () => {
  const { adminToken } = useAdminContext();
  const { doctorToken } = useDoctorContext();

  return (
    <div className="min-h-screen bg-white border-r border-gray-300">
      {adminToken && (
        <ul className="text-[#515151] mt-5">
          {/* in <NavLink/>, You can provide this prop as a function that receives an object with an isActive property. This lets you dynamically apply different CSS classes or inline styles based on whether the link is active. */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img className="w-7" src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/all-appointments"}
          >
            <img className="w-7" src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/add-doctor"}
          >
            <img className="w-7" src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/doctors-list"}
          >
            <img className="w-7" src={assets.people_icon} alt="" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}
      {doctorToken && (
        <ul className="text-[#515151] mt-5">
          {/* in <NavLink/>, You can provide this prop as a function that receives an object with an isActive property. This lets you dynamically apply different CSS classes or inline styles based on whether the link is active. */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img className="w-7" src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/doctor-appointments"}
          >
            <img className="w-7" src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <img className="w-7" src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
