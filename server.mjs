import express from "express";
import cors from "cors";
import processApiRequest from "./api.mjs";
const app = express();
const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	console.log("response from IP: " + req.ip);
	res.send("response from IP: " + req.ip);
});

app.get("/time", (req, res) => {
	res.send("Current Time is:" + new Date().getTime());
});

app.post("/api", (req, res) => processApiRequest(req, res));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
