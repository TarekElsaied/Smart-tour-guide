import express from "express";
import { addHotel, getAllHotels, getHotleByID } from "./hotel.controller.js";
import { filesUpload } from "../../utils/fielUpload.js";

const hotelRouter = express.Router();

hotelRouter.get("/", getAllHotels);
hotelRouter.get("/:id", getHotleByID);
//placeRouter.get("/search/:name", getPlaceByName);
hotelRouter.post("/", filesUpload("path"), addHotel);

export default hotelRouter;
