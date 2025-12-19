import React, { useEffect } from "react";
import { useAdminContext } from "../../contexts/AdminContext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, changeAvailableStatus } = useAdminContext();

  useEffect(() => {
    getAllDoctors();
  }, [getAllDoctors]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((doctor, index) => (
          <div
            className="border border-gray-300 rounded-xl max-w-56 overflow-hidden cursor-pointer"
            key={index}
          >
            <img
              className="bg-indigo-50 hover:bg-primary transition-all duration-300"
              src={doctor.image}
              alt=""
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {doctor.name}
              </p>
              <p className="text-neutral-800 text-lg font-medium">
                {doctor.speciality}
              </p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  onChange={() => changeAvailableStatus(doctor._id)}
                  className="cursor-pointer accent-green-50"
                  type="checkbox"
                  checked={doctor.available}
                />
                <p
                  className={`${
                    doctor.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {doctor.available ? "Available" : "Not Available"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
