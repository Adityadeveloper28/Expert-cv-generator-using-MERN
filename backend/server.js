import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

// /config dot env
dotenv.config();

//database config
connectDB();

///rest obj
const app = express();
//middleware
app.use(cors(
  {
    origin :["https://expert-cv-generator-using-mern-front.vercel.app/"],
    methods:["POST"."GET"],
    credentials: true
  }
));
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth/", authRoute);

//rest apis
app.get("/", (req, res) => {
  res.send("<h1>welcome to cv generator MERN stack project</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MOde} mode on port ${PORT}`.bgCyan
      .white
  );
});
