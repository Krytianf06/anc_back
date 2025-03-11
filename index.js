const express = require("express");
const app = express();
// const axios = require("axios");

// const daneLogin = {
// 	username: "kf63083@amu.edu.pl",
// 	password: "Krychu11L19*63083",
// };

// const tokenIS = [];

// const zapytanie = () => {
// 	axios.post("https://api.amunatcoll.pl/login/", daneLogin).then((res) => {
// 		console.log("działa zapytanie");
// 		const daneSerwer = res.data.token.access;
//         console.log(res.data.token.access);
//         tokenIS.push(daneSerwer)
// 	});
// };

app.get("/login2", (req, res) => {
	console.log(req.body);
	console.log(res.body);
	console.log("klops");
	res.status(200).end();
});

app.listen(8888, () => {
	console.log("aplikacja działa!!!!");
});
