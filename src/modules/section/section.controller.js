import { SectionModel } from "../../../database/models/Section.js";

export const addSection = async (req, res, next) => {
  try {
    const { name, latLong } = req.body;
    let section = await SectionModel.findOne({ name });
    if (section) {
      res.json({ message: "section is existes befor" });
    } else {
      await SectionModel.insertMany({ name, latLong });
      res.json({ message: " success" });
    }
  } catch (error) {
    next(error);
  }
};

export const getSection = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) return res.json("not found");
    const section = await SectionModel.findById(id);
    let places = [];
    section.places.forEach((element) => {
      places.push(element.populate("place"));
    });
    let result = { name: section.name, des: section.desc, places };
    res.json(result);
  } catch (error) {
    next(error);
  }
};
