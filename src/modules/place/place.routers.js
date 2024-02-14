import express from "express";
import {
  addPlace,
  getAllPlaces,
  getPlace,
  getPlaceByName,
} from "./place.controller.js";
import { filesUpload } from "../../utils/fielUpload.js";

const placeRouter = express.Router();

placeRouter.get("/", getAllPlaces);
placeRouter.get("/:id", getPlace);
placeRouter.get("/search/:name", getPlaceByName);
placeRouter.post("/", filesUpload("path"), addPlace);

export default placeRouter;
