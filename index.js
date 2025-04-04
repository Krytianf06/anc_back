const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
const morgan = require("morgan");

const app = express();
// require("dotenv").config();

app.use(morgan("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", async (req, res) => {
	const login = req.body.username;
	console.log(login);
	const password = req.body.password;
	console.log(password);

	try {
		let daneID = "";
		await logowanie1(login, password).then(function (response) {
			daneID = response.token;
		});
		res.send(daneID);
	} catch (err) {
		console.log(err);
	}

	// res.json(token.data.token);

	// const login2 = req.body;
	// console.log(login2);
});

app.post("/test2", (req, res) => {
	// console.log(req.body);
	// res.send(req.boby.password);
	// res.json(req.boby);
	const cos = req.body.password;
	console.log(cos);
	res.status(200).end();
});

app.listen(8888, () => {
	console.log("aplikacja działa!!!!2");
});

logowanie1 = async (login, password) => {
	let tokenID = "";
	await axios
		.post(
			"https://api.amunatcoll.pl/login/",
			{
				username: login,
				password: password,
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"access-control-allow-credentials": "true",
				},
			}
		)
		.then(function (response) {
			tokenID = response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
	// console.log(tokenID);
	return tokenID;
};
