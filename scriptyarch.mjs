// Old version of script working on Coles Financial Services Website.

(function getTransactions() {
	let transactions, transactionsArray, transMap;
	transactions = document.querySelectorAll(".custom-data-grid-row-identifier");
	transactionsArray = Array.from(transactions);
	transMap = transactionsArray.map((trans) => {
		let dataPivot = trans.attributes["data-pivot"].value;
		let date = trans.querySelector(".ui-float-left").innerText;
		let description = trans.querySelector(".cbol-trans-desc").innerText;
		let amount = trans.querySelector(".format-amount-holder").innerText;
		return { dataPivot, date, description, amount };
	});

	// let arrayIndex = Math.floor(Math.random() * transMap.length);

	let apiUrl = "http://localhost:3100/api";
	let postOptions = {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(transMap), // body data type must match "Content-Type" header
	};

	sendData();

	async function sendData() {
		let res = await fetch(apiUrl, postOptions);
		let jsonData = await res.json();
		console.log(jsonData);
	}
})();
