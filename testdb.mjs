import Transaction from "./transactionModel.mjs";
import { connectDB, disconnectDB } from "./dbConnect.mjs";
import { getDateObjectFromFormattedString } from "./utilities.mjs";

await connectDB();

await Transaction.countDocuments({}).then((count) =>
	console.log(`Total Documents in the Database: ${count}`)
);

let entries = await Transaction.find({
	description: /McDonalds|MCDONALDS/,
}).exec();

let totalSpend = entries.reduce((acc, entry) => acc + entry.amount, 0);
console.log(`Sum of all the queried transactions: ${totalSpend}`);

disconnectDB();

// Transaction.countDocuments({
// 	date: getDateObjectFromFormattedString("02 NOV 2023"),
// }).then((count) => console.log(count));
