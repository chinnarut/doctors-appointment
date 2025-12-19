import express from "express";
import {
  addDoctor,
  adminAppointmentList,
  adminCancelAppointment,
  adminDashboard,
  adminLogin,
  allDoctors,
} from "../controllers/adminControllers.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailableStatus } from "../controllers/doctorControllers.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", adminLogin);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/available-status", authAdmin, changeAvailableStatus);
adminRouter.get("/appointment-list", authAdmin, adminAppointmentList);
adminRouter.post("/admin-cancel", authAdmin, adminCancelAppointment);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
