import mongoose from "mongoose";

const hotelSchema = mongoose.Schema(
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
    rooms: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    services: [String],
    imgs: [String],
    price: {
      type: Number,
      min: 0,
      required: [true, "product price is requierd"],
    },
    telephone: {
      type: Number,
      min: 0,
      max: 99999999999,
    },
  },
  { timestamp: true }
);
hotelSchema.post("init", (doc) => {
  doc.imgs = doc.imgs.map(
    (path) => "https://test-proj-g6wo.onrender.com/" + path
  );
});
export const hotelModel = mongoose.model("hotel", hotelSchema);
