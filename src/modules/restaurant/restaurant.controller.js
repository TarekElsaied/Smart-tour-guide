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
    const { palceName, placeID, name, info, rating, telephone } = req.body;
    let place = await placeModel.findById({ _id: placeID });
    if (!place) {
      return res.json({ message: "place is not existed befor" });
    }
    const imgs = req.files.map((file) => file.filename);

    const restaurant = {
      placeID: place._id,
      placeName: palceName,
      name,
      info,
      rating,
      imgs,
      telephone,
    };
    const result = await restaurantModel.insertMany(restaurant);
    let update = await placeModel.updateOne(
      { _id: placeID },
      { $push: { restaurants: result[0]._id } },
      { new: true }
    );
    res.json({ result, update });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
