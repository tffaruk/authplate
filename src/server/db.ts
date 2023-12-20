import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.log("error occured in db connection");
    process.env.NODE_ENV !== "production"
      ? console.log("error occured in db connection", error)
      : console.log("error occured in db connection", error);
  }
};
