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
    res.json(section);
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

export async function updateSectionImage(req, res, next) {
  try {
    const { id } = req.params;

    const section = await SectionModel.findById(id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded" });
    }
    req.files.map((file) => section.media.push(file.filename));
    await section.save();
    res.json({ message: "Images uploaded successfully", section });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
