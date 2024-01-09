export function getDateObjectFromFormattedString(dateString) {
	const parts = dateString.split(" ");
	const day = parseInt(parts[0]);
	const monthName = parts[1].toUpperCase();
	const year = parseInt(parts[2]);

	const monthMap = {
		JAN: 0,
		FEB: 1,
		MAR: 2,
		APR: 3,
		MAY: 4,
		JUN: 5,
		JUL: 6,
		AUG: 7,
		SEP: 8,
		OCT: 9,
		NOV: 10,
		DEC: 11,
	};

	const month = monthMap[monthName];

	if (isNaN(day) || isNaN(year) || month === undefined) {
		throw new Error("Invalid date string format");
	}

	return new Date(Date.UTC(year, month, day, 11));
}

export function extractNumber(amountString) {
	const trimmedStr = amountString.trim();
	const sign = trimmedStr[0] === "-" ? -1 : 1; // Check for negative sign and assign factor

	// Using a regular expression to match one or more digits, optionally followed by a decimal point and more digits
	let number = parseFloat(trimmedStr.match(/\d+(?:\.\d+)?/)[0]);
	number = sign * number; // apply sign

	return number;
}
