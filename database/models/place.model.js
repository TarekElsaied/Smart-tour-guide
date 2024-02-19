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
placeSchema.post("init", (doc) => {
  doc.media = doc.media.map(
    (path) => "https://grad-project-alpha.vercel.app/uploads/" + path
  );
});
export const placeModel = mongoose.model("place", placeSchema);
