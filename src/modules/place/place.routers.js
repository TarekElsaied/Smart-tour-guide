import express from "express";
import { addPlace, getAllPlaces, getPlaceById } from "./place.controller.js";
import { filesUpload } from "../../utils/fielUpload.js";

const placeRouter = express.Router();

placeRouter.get("/", getAllPlaces);
placeRouter.get("/:id", getPlaceById);
placeRouter.post("/", filesUpload("path"), addPlace);

export default placeRouter;
