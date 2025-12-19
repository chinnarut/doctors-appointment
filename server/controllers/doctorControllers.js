import Doctor from "../models/Doctor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.js";

// change doctor availability status
export const changeAvailableStatus = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctorData = await Doctor.findById(doctorId);
    await Doctor.findByIdAndUpdate(doctorId, {
      available: !doctorData.available,
    });

    return res
      .status(200)
      .json({ success: true, message: "Available status changed." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// get all doctors data list
export const getDoctorDataLists = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-email", "-password"]);

    return res.status(200).json({
      success: true,
      message: "Get doctors data successfully.",
      doctors,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// doctor login
export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find doctor by email
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // generate JWT token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again later.",
    });
  }
};

// get doctor appointment for doctor panel
export const doctorAppointment = async (req, res) => {
  try {
    const { doctorId } = req;
    const appointments = await Appointment.find({ doctorId });

    return res.json({
      success: true,
      message: "Get doctor appointments successfully.",
      appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// mark doctor appointment completed
export const appointmentComplete = async (req, res) => {
  try {
    const { doctorId } = req;
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData && appointmentData.doctorId === doctorId) {
      await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true });

      return res
        .status(200)
        .json({ success: true, message: "Appointment is completed." });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Appointment mark failed." });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// cancel doctor appointment for doctor panel
export const appointmentCancel = async (req, res) => {
  try {
    const { doctorId } = req;
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData && appointmentData.doctorId === doctorId) {
      await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

      return res
        .status(200)
        .json({ success: true, message: "Appointment is cancelled." });
    } else {
      return res.status(400).json({
        success: false,
        message: "Appointment cancellation failed.",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// get doctor dashboard data
export const doctorDashboard = async (req, res) => {
  try {
    const { doctorId } = req;
    const appointments = await Appointment.find({ doctorId });

    // calculate accumulated earnings
    let earnings = 0;

    appointments.map((appointment) => {
      if (appointment.isCompleted || appointment.payment) {
        earnings += appointment.amount;
      }
    });

    // use new Set() to create set of user id and use spread operator convert to array
    const patients = [
      ...new Set(appointments.map((appointment) => appointment.userId)),
    ];

    const dashboardData = {
      appointments: appointments.length,
      earnings,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    return res.status(200).json({
      success: true,
      message: "Get dashboard data ok.",
      dashboardData,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// get doctor profile data
export const doctorProfile = async (req, res) => {
  try {
    const { doctorId } = req;
    const doctorProfile = await Doctor.findById(doctorId).select("-password");

    return res.status(200).json({
      success: true,
      message: "Get doctor profile ok.",
      doctorProfile,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// update doctor profile data
export const updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req;
    const { fees, address, available } = req.body;

    await Doctor.findByIdAndUpdate(doctorId, { fees, address, available });

    return res.status(200).json({
      success: true,
      message: "Update profile successfully.",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
