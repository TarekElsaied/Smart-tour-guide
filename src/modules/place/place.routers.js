import express from "express";
import { addPlace, getPlace } from "./place.controller.js";
import { filesUpload } from "../../utils/fielUpload.js";

const placeRouter = express.Router();

placeRouter.get("/:id", getPlace);
placeRouter.post("/", filesUpload("path"), addPlace);

export default placeRouter;
