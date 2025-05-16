const fs = require("fs");
const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
const morgan = require("morgan");
const xlsx = require("xlsx");
const jasonObject = require("./test.json");

const { FunkcjaLogi, idToken } = require("./controllers/auth/login");
const { Refresh } = require("./controllers/auth/refresh");

const { json } = require("stream/consumers");

const app = express();
// require("dotenv").config();

app.use(morgan("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataPath = "./daneTokenID.json";

idToken;

let tabIdOkaz = [];

let tabId = [];

let rekordDaneDlugosc = [];
let daneRekordu = [];

// let pauzaID = [];

app.post("/logowanie", FunkcjaLogi);

exports.login1 = (idToken) => {
	console.log(idToken);
	console.log("klops!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	storeData(idToken, dataPath);
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

app.post("/refresh", Refresh);

app.post("/szukanie", async (req, res) => {
	const { filter, pagination } = req.body;
	// console.log(filter.kolekcjanumerokazu, pagination.currentPage);

	try {
		let daneWysz = "";
		await Search().then(function (dane) {
			daneWysz = dane;
		});
		// console.log(daneWysz);
		res.send(daneWysz);
		tabIdOkaz.splice(0, 1, daneWysz.items);
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
		console.log(i);

		let daneGatunek = "";
		await SearchIdRekord(elementID).then(function (dane) {
			daneGatunek = dane;
		});

		let objektDane = {
			ID: daneGatunek.kolekcjanumerokazu,
			instytucja: daneGatunek.instytucja,
			państwo: daneGatunek.panstwo,
			kolekcja: daneGatunek.kolekcja,
		};

		o.push(objektDane);
		console.log(o);
		// console.log(objektDane);
		res.status(200).end();

		// console.log(daneGatunek);

		// Parametry wyszukiwania - sprawdzenie danych
		// if (
		// 	daneGatunek.lokalizacjastanowisko == "bd" ||
		// 	daneGatunek.lokalizacjastanowisko == null
		// ) {
		// 	console.log(`puste + ${i}`);
		// } else if (
		// 	daneGatunek.kontynent != null &&
		// 	daneGatunek.dlugoscgeograficzna == null
		// ) {
		// 	rekordDaneDlugosc.push(
		// 		`${daneGatunek.dlugoscgeograficzna} + ${daneGatunek.kolekcjanumerokazu}`
		// 	);
		// 	console.log(daneGatunek.kolekcjanumerokazu);
		// }

		// tabIdOkaz.splice(0, 1, daneGatunek.items);
		// console.log("zrobione")
		// console.log(tabIdOkaz[0])
		// TabOkaz();
		daneRekordu.splice(
			daneRekordu.length - 1,
			0,
			daneGatunek.kolekcjanumerokazu
		);

		if (i == tabId.length - 1) {
			console.log("koniec");
			console.log(daneRekordu);
			// res.send(daneRekordu);
			// IdBrakki();
			JasonToExcel(o);
		}
	}
	try {
		// res.send(rekordDaneDlugosc);
		res.status(200);
	} catch (error) {
		console.log(error);
	}
});

JasonToExcel = (x) => {
	const workBook = xlsx.utils.book_new();
	const workSheet = xlsx.utils.json_to_sheet(x);
	xlsx.utils.book_append_sheet(workBook, workSheet);
	xlsx.writeFile(workBook, "daneToExcel2.xlsx");
};

// const IdBrakki = () => {
// 	console.log(rekordDaneDlugosc);
// };

const TabOkaz = () => {
	tabId = tabIdOkaz[0].map((idKolekcja) => idKolekcja.kolekcjanumerokazu);
	console.log(tabId);
};

const o = new Object([]);

app.post("/test", (req, res) => {
	// console.log(req.body);
	const { ID, kolekcjanumerokazu, państwo } = req.body;
	// 	function Person(first, last, age, eye) {
	//   this.firstName = first;
	//   this.lastName = last;
	//   this.age = age;
	//   this.eyeColor = eye;
	// }
	let objektDane1 = {
		ID: ID,
		kolekcjanumerokazu: kolekcjanumerokazu,
		państwo: państwo,
	};

	o.push(objektDane1);
	console.log(o);
	if (o.length == 20) {
		JasonToExcel(o);
	}
	// console.log(objektDane);
	res.status(200).end();
});

app.listen(8888, () => {
	LoadeData();
	console.log("aplikacja działa!!!!");
});

RefreshToken = async (refreshID) => {
	let newRefreshID = "";
	console.log("-------------------------------------------------");
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
			console.log(
				"dane z refresh!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
			);
			// console.log(newRefreshID);
			idToken.splice(0, 1, newRefreshID);
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
				filter: { kolekcjanumerokazu: "POZ-V" },
				pagination: { currentPage: 1, perPage: 200 },
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"access-control-allow-credentials": "true",
					Authorization: `Bearer ${idToken[0].access}`,
				},
			}
		)
		.then(function (response) {
			daneWyszykania = response.data;
			console.log(
				"dane z wyszukiwania!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
			);
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
		.get(`https://api.amunatcoll.pl/anc/taxons/details/${filter}/`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"access-control-allow-credentials": "true",
				Authorization: `Bearer ${idToken[0].access}`,
			},
		})
		.then(function (response) {
			daneGatunek = response.data;
			// console.log("dany rekord aktywny")
		})
		.catch(function (error) {
			console.log(error);
		});
	// console.log(tokenID);
	return daneGatunek;
};

LoadeData = async () => {
	try {
		const loadID = fs.readFileSync(dataPath, {
			encoding: "utf8",
		});

		idToken.splice(0, 1, JSON.parse(loadID)[0]);
		console.log("Wczytywanie Token Użytkownika");
		console.log(idToken);
	} catch (err) {
		console.error(err);
	}
};
