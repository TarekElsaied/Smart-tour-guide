import { hotelModel } from "../../../database/models/hotel.model.js";
import { placeModel } from "../../../database/models/place.model.js";

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await hotelModel.find({});
    res.json(hotels);
  } catch (error) {
    next(error);
  }
};

export const getHotleByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.json("not found");
    const hotel = await hotelModel.findById(id);
    res.json(hotel);
  } catch (error) {
    next(error);
  }
};

export const addHotel = async (req, res, next) => {
  try {
    const {
      palceName,
      placeID,
      name,
      info,
      rooms,
      rating,
      services,
      price,
      telephone,
    } = req.body;
    let place = await placeModel.findById({ _id: placeID });
    if (!place) {
      return res.json({ message: "place is not existed befor" });
    }
    const imgs = req.files.map((file) => file.filename);

    const hotel = {
      placeID: place._id,
      placeName: palceName,
      name,
      info,
      rooms,
      rating,
      imgs,
      services,
      price,
      telephone,
    };
    const result = await hotelModel.insertMany(hotel);
    let update = await placeModel.updateOne(
      { _id: placeID },
      { $push: { hotels: result[0]._id } },
      { new: true }
    );
    res.json({ result, update });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
