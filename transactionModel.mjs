import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
	{
		dataPivot: {
			type: String,
			unique: true,
			required: true,
		},
		date: {
			type: Date,
			required: true,
			default: Date.now(),
		},
		description: {
			type: String,
		},
		amount: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;
