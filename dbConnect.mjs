import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {});
		// console.log("MongoDB connected");
	} catch (err) {
		console.error(err);
	}
};

export const disconnectDB = async () => {
	await mongoose.disconnect();
	console.log("MongoDB disconnected");
};

export default connectDB;
