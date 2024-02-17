import mongoose from "mongoose";
const SectionSchema = mongoose.Schema(
  {
    name: String,
    latLong: String,
    media: Array,
    places: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "place",
        },
      ],
    },
  },
  { timestamp: true }
);

export const SectionModel = mongoose.model("Section", SectionSchema);
