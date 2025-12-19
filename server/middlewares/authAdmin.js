import jwt from "jsonwebtoken";

// admin authentication
const authAdmin = async (req, res, next) => {
  try {
    const { admintoken } = req.headers;

    if (!admintoken) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token missing." });
    }

    let decode;

    try {
      decode = jwt.verify(admintoken, process.env.JWT_SECRET);
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token." });
    }

    if (decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default authAdmin;
