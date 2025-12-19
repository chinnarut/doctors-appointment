import React from "react";
import { useAdminContext } from "../../contexts/AdminContext";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const {
    adminToken,
    dashboardData,
    adminCancelAppointment,
    getAdminDashboardData,
  } = useAdminContext();
  const { slotDateFormat } = useAppContext();

  useEffect(() => {
    if (adminToken) {
      getAdminDashboardData();
    }
  }, [adminToken, getAdminDashboardData]);

  return (
    dashboardData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2 p-4 bg-white min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-4 bg-white min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-4 bg-white min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-300">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0 border-gray-300">
            {dashboardData.latestAppointments.map((appointment, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-50"
                key={index}
              >
                <img
                  className="rounded-full w-10 bg-gray-200"
                  src={appointment.doctorData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {appointment.doctorData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(appointment.slotDate)}
                  </p>
                </div>
                {/* {appointment.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => adminCancelAppointment(appointment._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )} */}
                {appointment.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : appointment.isCompleted ? (
                  <p className="text-green-400 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => adminCancelAppointment(appointment._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
