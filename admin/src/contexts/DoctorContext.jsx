import axios from "axios";
import { useCallback, useState } from "react";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";

const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {
  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctortoken")
      ? localStorage.getItem("doctortoken")
      : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [doctorDashboardData, setDoctorDashboardData] = useState(null);
  const [doctorProfileData, setDoctorProfileData] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDoctorAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/doctors-appointments`,
        {
          headers: { doctorToken },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong.");
    }
  }, [backendUrl, doctorToken]);

  const completeAppointment = useCallback(
    async (appointmentId) => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/complete-appointment`,
          { appointmentId },
          {
            headers: { doctorToken },
          }
        );

        if (data.success) {
          toast.success(data.message);
          getDoctorAppointments();
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
    },
    [backendUrl, doctorToken, getDoctorAppointments]
  );

  const cancelAppointment = useCallback(
    async (appointmentId) => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/cancel-appointment`,
          { appointmentId },
          {
            headers: { doctorToken },
          }
        );

        if (data.success) {
          toast.success(data.message);
          getDoctorAppointments();
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
    },
    [backendUrl, doctorToken, getDoctorAppointments]
  );

  const getDoctorDashboardData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/doctors-dashboard`,
        {
          headers: { doctorToken },
        }
      );

      if (data.success) {
        setDoctorDashboardData(data.dashboardData);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong.");
    }
  }, [backendUrl, doctorToken]);

  const getDoctorProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/doctors-profile`,
        {
          headers: { doctorToken },
        }
      );

      if (data.success) {
        setDoctorProfileData(data.doctorProfile);
        console.log(data.doctorProfile);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong.");
    }
  }, [backendUrl, doctorToken]);

  const value = {
    doctorToken,
    setDoctorToken,
    backendUrl,
    appointments,
    getDoctorAppointments,
    completeAppointment,
    cancelAppointment,
    getDoctorDashboardData,
    doctorDashboardData,
    doctorProfileData,
    setDoctorProfileData,
    getDoctorProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export const useDoctorContext = () => {
  return useContext(DoctorContext);
};
