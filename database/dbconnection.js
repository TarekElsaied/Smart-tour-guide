import mongoose from "mongoose";

const DB_URL = process.env.DB_URL ?? "mongodb://127.0.0.1:27017/node-mongodb";
export function conn() {
  return mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Database connection is established");
    })
    .catch((e) => {
      console.error(e);
    });
}
