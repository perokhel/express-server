import { readFile, writeFile } from "fs/promises";

export async function readJSONFile(filePath) {
	try {
		const data = await readFile(filePath, "utf8");
		return JSON.parse(data);
	} catch (error) {
		// Handle error appropriately for your application (e.g., throw, log elsewhere)
		return Promise.reject(error);
	}
}

export async function writeJSONToFile(filePath, jsonData) {
	try {
		const jsonString = JSON.stringify(jsonData, null, 2); // Formatted JSON
		await writeFile(filePath, jsonString, "utf8");
		return true;
	} catch (error) {
		return Promise.reject(error);
	}
}
