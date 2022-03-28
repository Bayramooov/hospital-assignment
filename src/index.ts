import express from "express";
import bodyParser from "body-parser";
import { fetchAll } from "./utils/db"

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Routes


app.listen(4000, function () {
	console.log("Started application on port %d", 4000);
});
