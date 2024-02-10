import { photoModel } from "../../../database/models/photo.model.js";
import { placeModel } from "../../../database/models/place.model.js";

export const addPhoto = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const path = req.files.filename;
    let isPlace = await placeModel.findById(_id);
    if (isPlace) {
      await placeModel.insertMany({ path: path });
      await photoModel.insertMany({ path: path, createdBy: _id });
      res.json({ message: "sucess" });
    } else {
      return res.json({
        message: "This place is not founded , please enter a valid palce",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getPhoto = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  ///
  const photo = await photoModel.findById(id);
  res.json(photo);
};
