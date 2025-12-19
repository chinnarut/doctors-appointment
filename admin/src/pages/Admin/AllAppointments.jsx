import React from "react";
import { useAdminContext } from "../../contexts/AdminContext";
import { useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const {
    adminToken,
    appointments,
    getAllAppointmentList,
    adminCancelAppointment,
  } = useAdminContext();
  const { calculateAge, slotDateFormat, currency } = useAppContext();

  useEffect(() => {
    if (adminToken) {
      getAllAppointmentList();
    }
  }, [adminToken, getAllAppointmentList]);

  return (
    appointments && (
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointments</p>
        <div className="bg-white border border-gray-300 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>
          {appointments.map((appointment, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3  px-6 border-b border-gray-300 hover:bg-gray-50"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 rounded-full"
                  src={appointment.userData.image}
                  alt=""
                />
                <p>{appointment.userData.name}</p>
              </div>
              <p className="max-sm:hidden">
                {calculateAge(appointment.userData.dateOfBirth)}
              </p>
              <p>
                {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 rounded-full bg-gray-200"
                  src={appointment.doctorData.image}
                  alt=""
                />
                <p>{appointment.doctorData.name}</p>
              </div>
              <p>
                {currency} {appointment.amount}
              </p>
              {appointment.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : appointment.isCompleted ? (
                <p className="text-green-400 text-xs font-medium">Completed</p>
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
    )
  );
};

export default AllAppointments;
