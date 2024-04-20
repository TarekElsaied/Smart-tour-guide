import express from "express";

import { filesUpload } from "../../utils/fielUpload.js";
import {
  addrestaurant,
  getAllRestaurants,
  getRestaurantByID,
} from "./restaurant.controller.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/", getAllRestaurants);
restaurantRouter.get("/:id", getRestaurantByID);
//placeRouter.get("/search/:name", getPlaceByName);
restaurantRouter.post("/", filesUpload("path"), addrestaurant);

export default restaurantRouter;
