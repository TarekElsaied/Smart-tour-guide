import mongoose from "mongoose";
const SectionSchema = mongoose.Schema(
  {
    name: String,
    latLong: String,
    // media: Array,
    media: [
      {
        type: String, // Assuming you're storing file paths or filenames
      },
    ],
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
SectionSchema.post("init", (doc) => {
  doc.media = "https://test-proj-g6wo.onrender.com/uploads/" + doc.media;
});
export const SectionModel = mongoose.model("Section", SectionSchema);
