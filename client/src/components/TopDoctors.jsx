import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useAppContext();

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Find your perfect doctor from our extensive list of trusted healthcare
        professionals.
      </p>
      <div className="w-full grid grid-cols-(--grid-cols-auto) gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors
          .slice(0, 6)
          .reverse()
          .map((doctor, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
              key={index}
              className="border border-fuchsia-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500"
            >
              <img className="bg-fuchsia-50" src={doctor.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    doctor.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 ${
                      doctor.available ? "bg-green-500" : "bg-red-500"
                    }  rounded-full`}
                  ></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg">{doctor.name}</p>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-fuchsia-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
