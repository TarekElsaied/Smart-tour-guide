import express from "express";
import { getSection, addSection } from "./section.controller.js";

const SectionRouter = express.Router();

SectionRouter.get("/getSection", getSection);
SectionRouter.post("/addSection", addSection);

export default SectionRouter;
