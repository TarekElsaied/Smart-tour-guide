import express from "express";
import {
  getSection,
  addSection,
  getAllSection,
  updateSectionImage,
} from "./section.controller.js";
import { filesUpload } from "../../utils/fielUpload.js";

const SectionRouter = express.Router();

SectionRouter.get("/:id", getSection);
SectionRouter.get("/", getAllSection);
SectionRouter.post("/", addSection);
SectionRouter.post(
  "/:id/updateImage",
  filesUpload("image"),
  updateSectionImage
);

export default SectionRouter;
