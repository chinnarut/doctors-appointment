import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAdminContext } from "../contexts/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useDoctorContext } from "../contexts/DoctorContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAdminToken, backendUrl } = useAdminContext();
  const { setDoctorToken } = useDoctorContext();
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("admintoken", data.token);
          setAdminToken(data.token);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/doctors-login`,
          { email, password }
        );

        if (data.success) {
          localStorage.setItem("doctortoken", data.token);
          setDoctorToken(data.token);
        }
      }
    } catch (error) {
      toast.error("Login Failed.");
    }
  };

  return (
    <form onSubmit={submitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-100 rounded-xl text-[#5e5e5e] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#dadada] rounded w-full p-2 mt-1 outline-none"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#dadada] rounded w-full p-2 mt-1 outline-none"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
