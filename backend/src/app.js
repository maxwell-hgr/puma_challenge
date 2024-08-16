import UserRoutes from "./routes/UserRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

const app = express();

dotenv.config();
const port = process.env.PORT;
const dbUrl = process.env.DATABASE_CONNECTION;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("db connected");
    app.emit("ready");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.on("ready", () => {
  app.listen(port, () => {
    console.log(`server running - port: ${port}`);
  });
});

app.use("/users", UserRoutes);
