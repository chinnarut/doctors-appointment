import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { assets, doctors } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { doctorId } = useParams();
  const { doctors, currency, getDoctorDataLists, backendUrl, token } =
    useAppContext();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const fetchDoctorInfo = useCallback(async () => {
    const doctorInfo = doctors.find((doctor) => doctor._id === doctorId);
    setDoctorInfo(doctorInfo);
  }, [doctors, doctorId]);

  const getAvailableSlots = useCallback(async () => {
    setDoctorSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i); // we will get 7 days from  now
      // if log currentDate, setDate method will return tiemstamp which is number of miliseconds

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;
        const slotTime = formattedTime;

        // check doctor slot is not available, if yes make it  false, if available make it true
        const isDoctorSlotAvailable =
          doctorInfo.slots_booked[slotDate] &&
          doctorInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isDoctorSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDoctorSlots((prev) => [...prev, timeSlots]);
    }
  }, [doctorInfo]);

  const bookAppointment = async () => {
    // check if user login, if no navigat to login page
    if (!token) {
      toast.warn("Login for booking appointment.");
      return navigate("/login");
    }

    try {
      const date = doctorSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { doctorId, slotDate, slotTime },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorDataLists();
        navigate("/my-appointments");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, [fetchDoctorInfo]);

  useEffect(() => {
    if (doctorInfo) {
      getAvailableSlots();
    }
  }, [doctorInfo, getAvailableSlots]);

  useEffect(() => {
    console.log(doctorSlots);
  }, [doctorSlots]);

  return (
    doctorInfo && (
      <div>
        {/* doctor-details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={doctorInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0">
            {/* doctor-info : name, degree, speciality */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {doctorInfo.name}
              <img src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {doctorInfo.degree} - {doctorInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctorInfo.experience}
              </button>
            </div>
            {/* doctor-about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {doctorInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee :{" "}
              <span className="text-gray-600">
                {currency} {doctorInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/* booking-slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {doctorSlots.length &&
              doctorSlots.map((item, index) => (
                <div
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
                  }}
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {doctorSlots.length &&
              doctorSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-semibold px-14 py-3 rounded-full my-6 cursor-pointer"
          >
            Book an Appointment
          </button>
        </div>
        {/* related-doctors */}
        <RelatedDoctors
          doctorId={doctorId}
          speciality={doctorInfo.speciality}
        />
      </div>
    )
  );
};

export default Appointment;
