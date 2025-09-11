import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db Connected");
  } catch (error) {
    console.log("Error while connecting to the db", error);
    process.exit(1);
  }
};

export default connectDB;
