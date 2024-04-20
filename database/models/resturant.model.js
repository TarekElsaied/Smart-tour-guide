import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema(
  {
    placeName: {
      type: String,
      required: true,
    },
    placeID: [String],
    name: {
      type: String,
      required: true,
    },
    info: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    imgs: [String],
    telephone: {
      type: Number,
      min: 0,
      max: 99999999999,
    },
  },
  { timestamp: true }
);
restaurantSchema.post("init", (doc) => {
  doc.imgs = doc.imgs.map(
    (path) => "https://test-proj-g6wo.onrender.com/" + path
  );
});
export const restaurantModel = mongoose.model("restaurant", restaurantSchema);
