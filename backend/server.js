import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

// Configuring dotenv
dotenv.config();

// Connecting to the database
connectDB();

// Creating the Express app
const app = express();

// Middleware
app.use(cors({
  origin: "https://expert-cv-generator-using-mern-front.vercel.app",
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth/", authRoute);
app.options("/api/v1/auth/login", cors());
app.options("/api/v1/auth/register", cors());
// REST APIs
app.get("/", (req, res) => {
  res.send("<h1>Welcome to CV Generator MERN stack project</h1>");
});

// Handling preflight requests for the specified route
app.options("/api/v1/auth/login", cors());

// Configuring the port
const PORT = process.env.PORT || 8080;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
