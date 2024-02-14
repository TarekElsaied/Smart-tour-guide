import { SectionModel } from "../../../database/models/Section.js";
import { placeModel } from "../../../database/models/place.model.js";

export const getAllPlaces = async (req, res, next) => {
  try {
    const places = await placeModel.find({});
    res.json(places);
  } catch (error) {
    next(error);
  }
};

export const getPlace = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.json("not found");
    const place = await placeModel.findById(id);
    res.json(place);
  } catch (error) {
    next(error);
  }
};

export const getPlaceByName = async (req, res, next) => {
  try {
    const placeName = req.params.name;
    if (!placeName) return res.json("not found");
    const place = placeModel.find({
      name: { $regex: placeName, $options: "i" },
    });
    res.json(place);
  } catch (error) {
    next(error);
  }
};
export const getPlaces = (req, res) => {};

export const addPlace = async (req, res, next) => {
  try {
    const { sectionName, name, desc, coordinates } = req.body;
    let section = await SectionModel.findOne({ name: sectionName });
    if (!section) {
      return res.json({ message: "section is not existed befor" });
    }
    const media = req.files.map((file) => file.filename);

    const place = { name, desc, coordinates, media };
    const result = await placeModel.insertMany(place);
    let update = await SectionModel.updateOne(
      { name: sectionName },
      { $push: { places: result[0]._id } },
      { new: true }
    );
    res.json({ result, update });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
