import express from "express";
import {
  getSection,
  addSection,
  getAllSection,
  // UpdateSection,
} from "./section.controller.js";
import { filesUpload } from "../../utils/fielUpload.js";

const SectionRouter = express.Router();

SectionRouter.get("/:id", getSection);
SectionRouter.get("/", getAllSection);
SectionRouter.post("/", addSection);
//SectionRouter.get("/", filesUpload("path"), UpdateSection);

export default SectionRouter;
