import mongoose from "mongoose";

const placeSchema = mongoose.Schema(
  {
    name: String,
    desc: String,
    media: Array,
    coordinates: String,
    hotels: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "hotel",
        },
      ],
    },
  },
  { timestamp: true }
);
placeSchema.post("init", (doc) => {
  doc.media = doc.media.map(
    (path) => "https://test-proj-g6wo.onrender.com/" + path
  );
});
export const placeModel = mongoose.model("place", placeSchema);
