import express from "express";
import { conn } from "./database/dbconnection.js";
import userRouter from "./src/modules/user/user.router.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import { addPhoto } from "./src/modules/photo/photo.controller.js";
import phototRouter from "./src/modules/photo/photo.routers.js";
import placeRouter from "./src/modules/place/place.routers.js";
import SectionRouter from "./src/modules/section/section.route.js";
dotenv.config();
const app = express();
const port = 3000;

conn();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("uploads"));
app.use("/places", placeRouter);
app.use("/users", userRouter);
app.use("/photo", phototRouter);
app.use("/Section", SectionRouter);

app.get("/tes", (req, res) => {
  return res.json({ message: "welcome to our website" });
});
//app.all('*',(req,res)=>{
// res.json({message:"invalid url - cant access this endpoint "+req.originalUrl})
//})

app.use((err, req, res, next) => {
  res.status(500).json({ message: "err", err });
});

app.listen(port || process.env.port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// model => place ( desc , media ['id','id1'], )

//new place ({desc, [] ,addd })
