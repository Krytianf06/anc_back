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

let idToken = [];

let tabIdOkaz = [];

let tabId = [];


app.post("/logowanie", async (req, res) => {
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
		idToken.splice(0,1,daneID)
		login1();
	} catch (err) {
		console.log(err);
	}
});

const login1 = () => {
	console.log(idToken);
};


app.post("/refresh", async (req, res) => {
	try {
		let noweID = "";
		await RefreshToken(idToken[0].refresh).then(function(idRefreshID2){
			noweID = idRefreshID2;
			console.log("wysylanie12");
			// console.log(idToken[0].refresh)
			// console.log(noweID)
		});
		// console.log(noweID)
		login1();
		res.send(noweID);
	} catch (error) {
		console.log(error);
	}
		
	
});






app.post("/szukanie", async (req, res) => {
	// const { filter, pagination } = req.body;
	// console.log(filter.kolekcjanumerokazu, pagination.currentPage);

	try {
		let daneWysz = "";
		await Search().then(function(dane){
			daneWysz = dane
		})
		// console.log(daneWysz);
		res.send(daneWysz);
		tabIdOkaz.splice(0,1,daneWysz.items)
		// console.log("zrobione")
		// console.log(tabIdOkaz[0])
		TabOkaz();

	} catch (error) {
		console.log(error);
	}
});


const TabOkaz = () => {
	tabId = tabIdOkaz[0].map(idKolekcja => idKolekcja.kolekcjanumerokazu);
	console.log(tabId);
};






app.post("/test2", (req, res) => {
	// console.log(req.body);
	// res.send(req.boby.password);
	// res.json(req.boby);
	const cos = req.body.password;
	console.log(cos);
	res.status(200).end();
});

app.listen(8888, () => {
	console.log("aplikacja działa!!!!");
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

RefreshToken = async (refreshID) => {
	let newRefreshID = "";
	await axios
		.post(
			"https://api.amunatcoll.pl/refresh_token/",
			{
				refresh: refreshID,
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
			newRefreshID = response.data;
			console.log("dane z refresh!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
			// console.log(newRefreshID);
			idToken.splice(0,1,newRefreshID)

		})
		.catch(function (error) {
			console.log(error);
		});
	// console.log(tokenID);
	return newRefreshID;
};


Search = async (filter, paginacja) => {
	let daneWyszykania = "";
	await axios
		.post(
			"https://api.amunatcoll.pl/anc/taxons/search/",
			{
				filter: {kolekcjanumerokazu: 'POZ-V'},
				pagination: {currentPage: 1, totalCount: 144195, perPage: 200, totalPages: 7210}
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"access-control-allow-credentials": "true",
					Authorization: `Bearer ${idToken[0].access}`
				},
			}
		)
		.then(function (response) {
			daneWyszykania = response.data;
			console.log("dane z wyszukiwania!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

		})
		.catch(function (error) {
			console.log(error);
		});
	// console.log(tokenID);
	return daneWyszykania;
};





import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://api.amunatcoll.pl/anc/taxons/details/POZ-V-0000220/',
  headers: {
    cookie: 'visitor_id=FD822DE565C4B90943AF6113E',
    'User-Agent': 'insomnia/11.0.2',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NDg2NDI1LCJpYXQiOjE3NDU0ODYxMjUsImp0aSI6IjgzOWRjNDY4NWZhZDRiMzk4ZWRjMmQwYTgyNDg2Nzg4IiwidXNlcl9pZCI6NDg3LCJhY2Nlc3NfdGFncyI6WyJ1c2VyXzQ4NyIsInRlYW1fMjI4IiwiY29vcmRpbmF0b3IiXX0.Lu0DZBYpdpMd0fAAO0evakPFhnErqeSdumPcLNhkVAI'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});







