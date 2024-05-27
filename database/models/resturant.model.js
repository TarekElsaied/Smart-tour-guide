import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema(
  {
    ServiceOptions: {
      type: String,
    },
    address: {
      type: String,
    },
    PricePerPerson: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    info: {
      type: String,
    },
    hours: {
      types: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    imgs: [String],
    telephone: {
      type: String,
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
