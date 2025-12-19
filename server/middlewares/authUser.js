import jwt from "jsonwebtoken";

// user authentication
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.id;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default authUser;
