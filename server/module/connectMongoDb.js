import mongoose from "mongoose";

export const connectMongoDb = (URL) => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("Database connected Successfully!");
    })
    .catch((error) => {
      console.error("Error occurs: ", error);
    });
};

export default connectMongoDb;
