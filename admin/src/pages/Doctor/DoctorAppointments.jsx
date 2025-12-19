import React, { useEffect } from "react";
import { useDoctorContext } from "../../contexts/DoctorContext";
import { useAppContext } from "../../contexts/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    doctorToken,
    appointments,
    getDoctorAppointments,
    completeAppointment,
    cancelAppointment,
  } = useDoctorContext();
  const { calculateAge, slotDateFormat, currency } = useAppContext();

  useEffect(() => {
    if (doctorToken) {
      getDoctorAppointments();
    }
  }, [doctorToken, getDoctorAppointments]);

  return (
    appointments && (
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointments</p>
        <div className="bg-white border border-gray-300 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
          <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-300">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {appointments.reverse().map((appointment, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 appointments-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-50"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex appointments-center gap-2">
                <img
                  className="w-8 rounded-full"
                  src={appointment.userData.image}
                  alt="user-image"
                />
                <p>{appointment.userData.name}</p>
              </div>
              <div>
                <p className="text-xs inline border border-primary px-2 rounded-full">
                  {appointment.payment ? "ONLINE" : "CASH"}
                </p>
              </div>
              <p className="max-sm:hidden">
                {calculateAge(appointment.userData.dateOfBirth)}
              </p>
              <p>
                {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
              </p>
              <p>
                {currency}
                {appointment.amount}
              </p>
              {appointment.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : appointment.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex">
                  <img
                    onClick={() => cancelAppointment(appointment._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="cancel-icon"
                  />
                  <img
                    onClick={() => completeAppointment(appointment._id)}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt="tick-icon"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default DoctorAppointments;
