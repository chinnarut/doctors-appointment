import jwt from "jsonwebtoken";

// doctor authentication
const authDoctor = async (req, res, next) => {
  try {
    const { doctortoken } = req.headers;

    if (!doctortoken) {
      return res
        .status(401)
        .json({ success: false, message: "Doctor not authorized" });
    }

    const decode = jwt.verify(doctortoken, process.env.JWT_SECRET);
    req.doctorId = decode.id;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

export default authDoctor;
