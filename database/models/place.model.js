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
    buses: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "bus",
        },
      ],
    },
  },
  { timestamp: true }
);

placeSchema.pre(/^find/, function () {
  this.populate(
    "buses",
    "name address route departureTime frequency Phone -_id"
  );
});
placeSchema.post("init", (doc) => {
  doc.media = doc.media.map(
    (path) => "https://test-proj-g6wo.onrender.com/" + path
  );
});
export const placeModel = mongoose.model("place", placeSchema);
