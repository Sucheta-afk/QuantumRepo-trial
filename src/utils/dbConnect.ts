import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("Error: MONGODB_URI is not defined in the environment variables.");
  process.exit(1); 
}

/* Connects to the MongoDB database.*/
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${(error as Error).message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

export default connectDB;
