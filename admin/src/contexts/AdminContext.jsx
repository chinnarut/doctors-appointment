import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("admintoken") ? localStorage.getItem("admintoken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
        headers: { adminToken },
      });

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [backendUrl, adminToken]);

  const changeAvailableStatus = async (doctorId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/available-status`,
        { doctorId },
        {
          headers: { adminToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAllAppointmentList = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/appointment-list`,
        {
          headers: { adminToken },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, [adminToken, backendUrl]);

  const adminCancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/admin-cancel`,
        { appointmentId },
        {
          headers: { adminToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointmentList();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
    }
  };

  const getAdminDashboardData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { adminToken },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong.");
    }
  }, [backendUrl, adminToken]);

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    getAllDoctors,
    doctors,
    changeAvailableStatus,
    appointments,
    getAllAppointmentList,
    adminCancelAppointment,
    getAdminDashboardData,
    dashboardData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
