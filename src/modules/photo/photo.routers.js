import express from "express";
import { addPhoto, getPhoto } from "./photo.controller.js";
import { fileUpload } from "../../utils/fielUpload.js";

const photoRouter = express.Router();

photoRouter.post("/", fileUpload("path"), addPhoto);
photoRouter.get("/:id", getPhoto);
export default photoRouter;
