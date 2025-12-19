import React, { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
// import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = "฿";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const getDoctorDataLists = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/doctors-list`);

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [backendUrl]);

  const getUserData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error.message);
    }
  }, [backendUrl, token]);

  useEffect(() => {
    getDoctorDataLists();
  }, [getDoctorDataLists]);

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setUserData(null);
    }
  }, [token, getUserData]);

  const value = {
    doctors,
    currency,
    getDoctorDataLists,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
