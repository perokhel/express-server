import connectDB, { disconnectDB } from "./dbConnect.mjs";
import saveTransaction from "./savetodb.mjs";
import {
	getDateObjectFromFormattedString,
	extractNumber,
} from "./utilities.mjs";

export default async function processApiRequest(req, res) {
	let transactions = req.body;
	// let transactions = Array.from(req.body);

	let response = {
		savedToDb: [],
		preExist: [],
		errorSaving: [],
	};

	await connectDB();

	let savingPromises = transactions.map(async (transaction) => {
		let refinedTransaction = refineTransaction(transaction);
		const savingReport = await saveTransaction(refinedTransaction);

		// console.log(typeof savingReport);

		if (savingReport.success) {
			response.savedToDb.push(refinedTransaction);
		} else if (savingReport.error.code === 11000) {
			response.preExist.push(refinedTransaction);
		} else {
			response.errorSaving.push({
				refinedTransaction,
				error: savingReport.error,
			});
		}
	});

	Promise.all(savingPromises).then((result) => {
		res.json(response);
		disconnectDB();
	});
}

function refineTransaction(transaction) {
	let newTransaction = { ...transaction };
	newTransaction.date = getDateObjectFromFormattedString(transaction.date);
	newTransaction.amount = extractNumber(transaction.amount);
	return newTransaction;
}
