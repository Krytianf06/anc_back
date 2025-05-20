const axios = require("axios").default;
const fs = require("fs");

let idToken = [];
const dataPath = "./daneTokenID.json";


FunkcjaLogi = async (req, res) => {
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
		// idToken.push(daneID);
		idToken.splice(0, 1, daneID);
		// idToken = daneID;

		storeData(idToken, dataPath);
		
	} catch (err) {
		console.log(err);
	}
};

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
			console.log(response.status);
		})
		.catch(function (error) {
			console.log(error);
		});
	return tokenID;
};


const storeData = (data, path) => {
		try {
			fs.writeFileSync(path, JSON.stringify(data), {
				encoding: "utf8",
			});
			console.log("zapisany Token Użytkownika");
		} catch (err) {
			console.error(err);
		}
	};


module.exports = {
	idToken,
	FunkcjaLogi,
	dataPath,
};
