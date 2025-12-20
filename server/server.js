import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongoDB.js";
import connectCloudinary from "./configs/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { stripeWebhooks } from "./controllers/userControllers.js";

// app config
const app = express();
const PORT = process.env.PORT || 4000;
await connectDB();
await connectCloudinary();

// listen to stripe webhooks
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// middlewares
app.use(express.json()); // When a client sends JSON data (common in APIs), this middleware takes the JSON string from the request body and converts it into a JavaScript object (which is then accessible on req.body)

app.use(cors()); // applies the cors middleware to your application. This allows any domain to make requests to API

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Server API is Working...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
