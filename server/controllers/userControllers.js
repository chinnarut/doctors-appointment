import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import stripe from "stripe";

// user sign up
export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking email is already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // checking all data
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing user information." });
    }

    // validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not valid." });
    }

    // validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be 8 or more characters.",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// user login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res
        .status(201)
        .json({ success: true, message: "Token was created.", token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials." });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    const userData = await User.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      message: "Get user successfully.",
      userData,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    const imageFile = req.file;
    const { name, gender, dateOfBirth, address, phone } = req.body;

    // validate required fields
    if (!name || !gender || !dateOfBirth || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required profile fields." });
    }

    // parse addres safely
    let parsedAddress;

    try {
      parsedAddress = JSON.parse(address);
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: "Address must be valid JSON." });
    }

    const updateData = {
      name,
      gender,
      dateOfBirth,
      address: parsedAddress,
      phone,
    };

    // upload image to cloudinary, if provided
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "doctors-appointment/users",
      });

      updateData.image = imageUpload.secure_url;
    }

    // update user in database
    await User.findByIdAndUpdate(userId, updateData);

    return res
      .status(200)
      .json({ success: true, message: "User profile updated successfully." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// book doctor appointment
export const bookAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const { doctorId, slotDate, slotTime } = req.body;

    const doctorData = await Doctor.findById(doctorId).select("-password");

    if (!doctorData.available) {
      return res.status(409).json({
        success: false,
        message: "Doctor is not available for appointments.",
      });
    }

    let slots_booked = doctorData.slots_booked || {};
    // checking slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(409).json({
          success: false,
          message: "This time slot is already booked.",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await User.findById(userId).select("-password");
    delete doctorData.slots_booked;

    const appointmentData = {
      userId,
      doctorId,
      userData,
      doctorData,
      amount: doctorData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();

    // save new slots data in doctorData
    await Doctor.findByIdAndUpdate(doctorId, { slots_booked });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      newAppointment,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// get user appointment to show on my-appointment
export const listAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const appointments = await Appointment.find({ userId });

    return res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully.",
      appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// cancel doctor appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const { appointmentId } = req.body;

    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this appointment.",
      });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    // remove doctor slot
    const { doctorId, slotDate, slotTime } = appointmentData;
    const doctorData = await Doctor.findById(doctorId);

    let slots_booked = doctorData.slots_booked || {};

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (time) => time !== slotTime
      );
    }

    await Doctor.findByIdAndUpdate(doctorId, { slots_booked });

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully.",
      slots_booked,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// stripe payment
export const stripePayment = async (req, res) => {
  try {
    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const { appointmentId } = req.body;
    const { origin } = req.headers; // origin is the base URL of the client application, which is used to construct the success and cancel redirect URLs.

    //  find appointment
    const appointment = await Appointment.findById(appointmentId);

    // check appointment in database
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    // create stripe new payment session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: {
              name: `Appointment with Dr. ${appointment.doctorData.name}`,
            },
            unit_amount: appointment.amount * 100, // Stripe expects the amount in the smallest currency unit (e.g., satang for THB).
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/loader/my-appointments`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        appointmentId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Stripe Checkout session created successfully.",
      url: session.url,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};
