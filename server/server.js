import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDb from "./module/connectMongoDb.js";
import userRouter from "./router/router.js";

//create app
const app = express();

//connect middleware
dotenv.config();
app.use(cors());
app.use(express.json());

//create the port & hostname
const PORT = process.env.PORT || 3001;
const HOSTNAME = process.env.HOSTNAME || "localhost";
const URL = process.env.MONGO_URL;

//connection to database
connectMongoDb(URL);

app.use("/api", userRouter);

app.listen(PORT, HOSTNAME, () =>
  console.log(`Server is Listen at port ${PORT}`)
);
