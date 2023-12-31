import express from "express";
const app = express();
const port = process.env.PORT || 3100;

app.get("/", (req, res) => {
	console.log("response from IP: " + req.ip);
	res.send("response from IP: " + req.ip);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
