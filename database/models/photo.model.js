import mongoose from "mongoose";

const photoSchema = mongoose.Schema(
  {
    path: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "place",
    },
  },

  { timestamp: true }
);

export const photoModel = mongoose.model("photo", photoSchema);
