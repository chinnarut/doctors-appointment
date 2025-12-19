import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../contexts/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [doctorImage, setDoctorImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");
  const { backendUrl, adminToken } = useAdminContext();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!doctorImage) {
        toast.error("Missing image file.");
      }

      const formData = new FormData();
      // FormData is a built-in JavaScript interface. It can create am empty object and append key / value pairs that can be send to a server api

      formData.append("image", doctorImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("about", about);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // log out to check formData info
      for (const [key, value] of formData) {
        console.log(`${key}: ${value}`);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: { adminToken },
        }
      );

      if (data.success) {
        toast.success(data.message);

        setDoctorImage(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium text-primary">Add Doctor</p>
      <div className="bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          {/* htmlFor is linked to input id, when click label, it will be the same as click input field */}
          <label htmlFor="doctor-id">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={
                doctorImage
                  ? URL.createObjectURL(doctorImage)
                  : assets.upload_area
              }
              // URL.createObjectURL(doctorImage) is a browser API method. It takes a File or Blob object (like an image uploaded by the user) and creates a temporary, unique URL
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDoctorImage(e.target.files[0])}
            type="file"
            id="doctor-id"
            hidden
          />
          <p>
            Upload Doctor <br /> Image
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* left-side */}
          <div className="w-ful lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
                <option value="11 Years">11 Years</option>
                <option value="12 Years">12 Years</option>
                <option value="13 Years">13 Years</option>
                <option value="14 Years">14 Years</option>
                <option value="15 Years">15 Years</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                type="text"
                placeholder="Fees"
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* right-side */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border border-gray-300 rounded resize-y outline-none"
            rows={5}
            placeholder="Write about doctor"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-8 py-3 mt-4 rounded-full cursor-pointer"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
