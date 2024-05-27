import express from "express";
import { addBus, getAllBuses, getBusByID } from "./bus.controller.js";
import { filesUpload } from "../../utils/fielUpload.js";

const busRouter = express.Router();

busRouter.get("/", getAllBuses);
busRouter.get("/:id", getBusByID);
busRouter.post("/", filesUpload("path"), addBus);

export default busRouter;
