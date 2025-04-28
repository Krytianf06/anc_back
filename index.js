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



app.post("/ident_gatunek", async (req, res) => {
	// const { filter, pagination } = req.body;
	// console.log(filter.kolekcjanumerokazu, pagination.currentPage);

	for (let i = 0; i < tabId.length; i++) {
		const elementID = tabId[i];
		console.log(elementID); // Wypisze: element1, element2, element3
		
		try {
			let daneGatunek = "";
			await SearchIdRekord(elementID).then(function(dane){
				daneGatunek = dane
			})
			console.log(daneGatunek);
			res.send(daneGatunek);
			// tabIdOkaz.splice(0,1,daneGatunek.items)
			// console.log("zrobione")
			// console.log(tabIdOkaz[0])
			// TabOkaz();
	
		} catch (error) {
			console.log(error);
		}

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
				pagination: {currentPage: 1, totalCount: 144195, perPage: 10, totalPages: 7210}
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



SearchIdRekord = async (filter) => {
	let daneGatunek = "";
	await axios
		.get(
			`https://api.amunatcoll.pl/anc/taxons/details/${filter}/`,
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
			daneGatunek = response.data;
			console.log("dany rekord aktywny")

		})
		.catch(function (error) {
			console.log(error);
		});
	// console.log(tokenID);
	return daneGatunek;
};





