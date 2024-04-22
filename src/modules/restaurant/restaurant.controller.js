import { placeModel } from "../../../database/models/place.model.js";
import { restaurantModel } from "../../../database/models/resturant.model.js";

export const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await restaurantModel.find({});
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};

export const getRestaurantByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.json("not found");
    const restaurant = await restaurantModel.findById(id);
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
};

export const addrestaurant = async (req, res, next) => {
  try {
    const {
      ServiceOptions,
      address,
      name,
      info,
      rating,
      telephone,
      PricePerPerson,
      hours,
    } = req.body;

    const imgs = req.files.map((file) => file.filename);

    const restaurant = {
      PricePerPerson,
      name,
      info,
      rating,
      imgs,
      telephone,
      hours,
      address,
      ServiceOptions,
    };
    const result = await restaurantModel.insertMany(restaurant);

    res.json({ message: "success", result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
