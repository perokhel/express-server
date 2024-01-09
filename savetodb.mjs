import Transaction from "./transactionModel.mjs";

export default async function saveTransaction(transaction) {
	const saveReport = {
		success: false,
		error: null,
	};

	try {
		const transSaved = await Transaction.create(transaction);
		saveReport.success = true;
	} catch (err) {
		saveReport.error = err;
	}
	return saveReport;
}
