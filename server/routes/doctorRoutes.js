import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  doctorAppointment,
  doctorDashboard,
  doctorLogin,
  doctorProfile,
  getDoctorDataLists,
  updateDoctorProfile,
} from "../controllers/doctorControllers.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/doctors-list", getDoctorDataLists);
doctorRouter.post("/doctors-login", doctorLogin);
doctorRouter.get("/doctors-appointments", authDoctor, doctorAppointment);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/doctors-dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/doctors-profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
