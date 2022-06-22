import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dontenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dontenv.config();
// import Users from "./models/UserModel.js";

const app = express();

try {
  await db.authenticate();
  console.log("database connected");
  // await db.sync();
} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

app.listen(5000, () => console.log("server runing on port 5000"));
