import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/Doctor.js";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

// api for adding doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // checking all data to add doctor details to mongoDB
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Data is Missing." });
    }

    // validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not Valid." });
    }

    // validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be 8 or more characters.",
      });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10); // 10 is factor to generate complexity random string
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      folder: "doctors-appointment/doctors",
    });
    const imageUrl = imageUpload.secure_url; // the Cloudinary response object that can retrieve https url

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    return res
      .status(201)
      .json({ success: true, message: "Doctor added successfully." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(201).json({
        success: true,
        message: "Token was created.",
        token,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// get all doctor list for admin panel
export const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password"); // this mean not include password

    return res.status(200).json({
      success: true,
      message: "Get doctors successfully.",
      doctors,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// get all appointments list for admin panel
export const adminAppointmentList = async (req, res) => {
  try {
    const appointments = await Appointment.find({});

    return res.status(200).json({
      success: true,
      message: "Get all appointments list successfully.",
      appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// cancel appointment by admin
export const adminCancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    // remove doctor slot
    const { doctorId, slotDate, slotTime } = appointmentData;
    const doctorData = await Doctor.findById(doctorId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (time) => time !== slotTime
    );

    await Doctor.findByIdAndUpdate(doctorId, { slots_booked });

    return res.status(201).json({
      success: true,
      message: "Appointment was cancelled.",
      slots_booked,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// get admin panel dashboard data
export const adminDashboard = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    const users = await User.find({});
    const appointments = await Appointment.find({});

    const dashboardData = {
      doctors: doctors.length,
      patients: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    return res.status(200).json({
      success: true,
      message: "Get dashboard data successfully.",
      dashboardData,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};
