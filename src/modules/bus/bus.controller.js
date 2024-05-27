import { busModel } from "../../../database/models/bus.model.js";
import { placeModel } from "../../../database/models/place.model.js";

export const addBus = async (req, res, next) => {
  try {
    const {
      placeName,
      placeID,
      address,
      name,
      info,
      hours,
      rating,
      frequency,
      Phone,
      departureTime,
    } = req.body;

    let place = await placeModel.findById({ _id: placeID });
    if (!place) {
      return res
        .status(400)
        .json({ message: "Place with the given ID doesn't exist" });
    }

    const bus = {
      placeID,
      placeName,
      address,
      name,
      info,
      hours,
      rating,
      frequency,
      Phone,
      route: `From Aswan & Luxor to ${placeName},`,
      departureTime,
    };

    const newBus = await busModel.create(bus);

    let update = await placeModel.updateOne(
      { _id: placeID },
      { $push: { buses: newBus._id } },
      { new: true }
    );

    res.json({ message: "Bus added successfully!", newBus });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllBuses = async (req, res, next) => {
  try {
    const bus = await busModel.find({});
    res.json(bus);
  } catch (error) {
    next(error);
  }
};

export const getBusByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.json("not found");
    const bus = await busModel.findById(id);
    res.json(bus);
  } catch (error) {
    next(error);
  }
};
