import mongoose from "mongoose";

const placeSchema = mongoose.Schema(
  {
    name: String,
    desc: String,
    media: Array,
    coordinates: String,
  },
  { timestamp: true }
);

export const placeModel = mongoose.model("place", placeSchema);
