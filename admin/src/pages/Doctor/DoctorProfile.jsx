import React from "react";
import { useDoctorContext } from "../../contexts/DoctorContext";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const {
    doctorToken,
    doctorProfileData,
    setDoctorProfileData,
    getDoctorProfileData,
  } = useDoctorContext();
  const { currency, backendUrl } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);

  const updateDoctorProfile = async () => {
    try {
      const updateProfileData = {
        address: doctorProfileData.address,
        fees: doctorProfileData.fees,
        available: doctorProfileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateProfileData,
        {
          headers: { doctorToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getDoctorProfileData();
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    if (doctorToken) {
      getDoctorProfileData();
    }
  }, [doctorToken, getDoctorProfileData]);

  return (
    doctorProfileData && (
      <div className="w-full max-w-6xl m-5">
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={doctorProfileData.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* doctor info */}
            <p className="text-3xl font-medium text-gray-700">
              {doctorProfileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {doctorProfileData.degree} - {doctorProfileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs text-primary rounded-full">
                {doctorProfileData.experience}
              </button>
            </div>
            {/* doctor about */}
            <div>
              <p className="text-sm font-medium text-neutral-800 mt-3">
                About :
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {doctorProfileData.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment Fees :{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setDoctorProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={doctorProfileData.fees}
                    type="number"
                    className={
                      isEdit && "border border-gray-200 bg-gray-50 outline-none"
                    }
                  />
                ) : (
                  doctorProfileData.fees
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Address :</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setDoctorProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={doctorProfileData.address.line1 ?? ""}
                    type="text"
                    className={
                      isEdit && "border border-gray-200 bg-gray-50 outline-none"
                    }
                  />
                ) : (
                  doctorProfileData.address.line1
                )}{" "}
                <br />
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setDoctorProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={doctorProfileData.address.line2 ?? ""}
                    type="text"
                    className={
                      isEdit && "border border-gray-200 bg-gray-50 outline-none"
                    }
                  />
                ) : (
                  doctorProfileData.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setDoctorProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                className="cursor-pointer accent-green-100"
                type="checkbox"
                id="available"
                checked={!!doctorProfileData.available}
              />
              <label htmlFor="available" className="cursor-pointer">
                {doctorProfileData.available ? (
                  <p className="text-green-500">Available</p>
                ) : (
                  <p className="text-red-500">Available</p>
                )}
              </label>
            </div>
            {isEdit ? (
              <button
                onClick={updateDoctorProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
