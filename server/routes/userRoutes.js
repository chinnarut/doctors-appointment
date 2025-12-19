import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getUserProfile,
  listAppointment,
  stripePayment,
  updateUserProfile,
  userLogin,
  userSignup,
} from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/profile", authUser, getUserProfile);
userRouter.put(
  "/update-profile",
  authUser,
  upload.single("image"),
  updateUserProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/stripe-payment", authUser, stripePayment);

export default userRouter;
