import Transaction from "./transactionModel.mjs";
import { connectDB, disconnectDB } from "./dbConnect.mjs";

import { getDateObjectFromFormattedString } from "./utilities.mjs";
import { writeJSONToFile, readJSONFile } from "./jsonFiles.mjs";

await connectDB();

await Transaction.countDocuments({}).then((count) =>
	console.log(`Total Documents in the Database: ${count}`)
);

let entries = await Transaction.find({
	$or: [{ amount: 1 }, { amount: -1 }],
	// date: { $gte: "2022-01-17", $lte: "2024-02-05" },
}).exec();

entries.sort((a, b) => (a.date < b.date ? 1 : -1));

// let entries = await readJSONFile("./entries.json");
// const result = await writeJSONToFile("./entries.json", entries);
// console.log(result);

// entries.forEach((entry) => (entry.amount > 0 ? console.log(entry) : 0));

let totalSpend = entries.reduce(
	(acc, entry) => acc + (entry.amount > 0 ? entry.amount : 0),
	0
);

console.log(`Sum of ${entries.length} queried transactions: ${totalSpend}`);

disconnectDB();
