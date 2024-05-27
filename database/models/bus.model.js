import mongoose from "mongoose";

const busSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    placeName: {
      type: String,
      required: true,
    },
    placeID: [String],
    address: {
      type: String,
    },
    route: {
      type: String,
    },
    hours: {
      type: String,
    },
    departureTime: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    Phone: {
      type: String,
    },
  },
  { timestamps: true }
);
export const busModel = mongoose.model("bus", busSchema);
