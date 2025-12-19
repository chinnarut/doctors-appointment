import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  // const { doctors } = useAppContext();
  const { backendUrl, token, getDoctorDataLists } = useAppContext();
  const [appointments, setAppointments] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");

    return (
      dateArray[0] + " " + months[Number(dateArray[1] - 1)] + " " + dateArray[2]
    );
  };

  const getUserAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [backendUrl, token]);

  const cancelAppointment = async (appointmentId) => {
    console.log(appointmentId);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorDataLists();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error.message);
    }
  };

  const handlePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/stripe-payment`,
        { appointmentId },
        {
          headers: { token },
        }
      );

      if (data.success) {
        window.location.href = data.url;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token, getUserAppointments]);

  return (
    appointments && (
      <div>
        <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">
          My Appointments
        </p>
        <div>
          {appointments.map((doctor, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-fuchsia-50"
                  src={doctor.doctorData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {doctor.doctorData.name}
                </p>
                <p>{doctor.doctorData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address :</p>
                <p className="text-xs">{doctor.doctorData.address.line1}</p>
                <p className="text-xs">{doctor.doctorData.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time :
                  </span>{" "}
                  {slotDateFormat(doctor.slotDate)} | {doctor.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!doctor.cannelled && doctor.payment && !doctor.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-gray-300 rounded font-bold text-white bg-green-600">
                    Paid
                  </button>
                )}
                {!doctor.cancelled &&
                  !doctor.payment &&
                  !doctor.isCompleted && (
                    <button
                      onClick={() => handlePayment(doctor._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border border-gray-300 rounded hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      Pay Online
                    </button>
                  )}
                {!doctor.cancelled && !doctor.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(doctor._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border border-gray-300 rounded hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Cancel Appointment
                  </button>
                )}
                {doctor.cancelled && !doctor.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment Cancelled
                  </button>
                )}
                {doctor.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default MyAppointments;
