const express = require("express");
const axios = require('axios').default;
const cors = require("cors");
const morgan = require("morgan");
const fetch = require('node-fetch');


require("dotenv").config();


const app = express();

app.use(morgan("angle"));
app.use(cors());

// app.get("/login", async(req, res) => {
// 	console.log(req.body)
// 	function fetchUsers() {
// 			fetch('https://amunatcoll.pl:8000/login/',
// 			  {
// 				mode: 'cors',
// 				method: 'POST',
// 				headers: {
// 				  'Accept': 'application/json',
// 				  'Content-Type': 'application/json',
// 				  'access-control-allow-credentials': 'true',
// 				}, body: JSON.stringify({
// 				  "username": "kf63083@amu.edu.pl",
// 				  "password": "Krychu11L19*63083"
// 				})
// 			  })
// 			  .then((res) => res.json())
// 			  .then((dane) => res.json(dane))
// 		  };
// 		  fetchUsers();

// 	}) 

	app.get("/login", async(req, res) => {
		(async () => {
			try {
				await fetch("https://pixabay.com/api/videos/?key=26584808-de6453e81ed644e8a5f6a08c0&q=yellow+flowers")
				.then((response) => response.json())
				.then((json) => {
					res.json(json.items)
				})
			} catch (error) {
				console.log(error.response.body)
			}
		})()
		}) 












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
	console.log("aplikacja działa!!!!2");
});
