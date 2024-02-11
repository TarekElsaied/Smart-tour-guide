import express from "express";
import { getSection, addSection, getAllSection } from "./section.controller.js";

const SectionRouter = express.Router();

SectionRouter.get("/:id", getSection);
SectionRouter.get("/", getAllSection);
SectionRouter.post("/", addSection);

export default SectionRouter;
