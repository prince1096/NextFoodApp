import mongoose from "mongoose";

export async function connectToDB() {
  try {
    mongoose.connect(process.env.MONGO_URL);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("error", (err) => {
      console.log("MongoDB Connection error", err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
