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
    const { id } = req.params;
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
export const getAllSection = async (req, res, next) => {
  try {
    const sections = await SectionModel.find({});
    res.json(sections);
  } catch (error) {
    next(error);
  }
};

// export const UpdateSection = async (req, res, next) => {
//   try {
//     const { sectionName } = req.body;
//     let section = await SectionModel.findOne({ name: sectionName });
//     if (!section) {
//       return res.json({ message: "section is not existed befor" });
//     }
//     const media = req.files.map((file) => file.filename);

//let update = await SectionModel.updateOne(
//{ name: sectionName },
// { $push: { media: media } },
//{ new: true }
//);
res.json({ result, update });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

export const UpdateSection = async (req, res, next) => {
  try {
    const { sectionName } = req.body;
    let section = await SectionModel.findOne({ name: sectionName });
    if (!section) {
      return res.json({ message: "Section does not exist" });
    }
    const media = req.files.map((file) => file.filename); // Assuming you're storing filenames

    let update = await SectionModel.updateOne(
      { name: sectionName },
      { $push: { media: media } },
      { new: true }
    );
    res.json({ result, update });
    res.json({ update });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
