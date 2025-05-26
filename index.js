const fs = require("fs");
const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
const morgan = require("morgan");
const xlsx = require("xlsx");
const jasonObject = require("./test.json");
const db = require("./baza");

const { FunkcjaLogi, idToken, dataPath } = require("./controllers/auth/login");
const { Refresh } = require("./controllers/auth/refresh");
const {
	SearchAll,
	tabIdOkaz,
	tabId,
} = require("./controllers/szukanieAll/searchOgolne");

const { json } = require("stream/consumers");

const app = express();
// require("dotenv").config();

app.use(morgan("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const dataPath = "./daneTokenID.json";

//ID LOGOWANIA
idToken;

// TABLICA Z DANYMI Z WYSZUKIWANIA OGÓLNEGO
tabIdOkaz;

// ID REKORDU - WYSZUKIWANIE OGÓLNE
tabId;

let rekordDaneDlugosc = [];
let daneRekordu = [];

// let pauzaID = [];

app.get("/test123", async (req, res) => {
	try {
		let sql = "SELECT * FROM mollusca_helix_pomatia_pl_1";
		const result = await db.pool.query(sql);
		res.send(result);
	} catch (err) {
		console.log(err);
	}
});

// LOGOWANIE
app.post("/logowanie", FunkcjaLogi);
// LOGOWANIE

// ODŚWIERZANIE TOKENU
app.post("/refresh", Refresh);
// ODŚWIERZANIE TOKENU

// SZUKANIE OGÓLNE
app.post("/szukanie", SearchAll);
// SZUKANIE OGÓLNE

app.post("/ident_gatunek", async (req, res) => {
	// const { filter, pagination } = req.body;
	// console.log(filter.kolekcjanumerokazu, pagination.currentPage);
	console.log("działa!!!!!!!!!!!");

	for (let i = 0; i < tabId.length; i++) {
		const elementID = tabId[i];
		console.log(i);

		let daneGatunek = "";
		await SearchIdRekord(elementID).then(function (dane) {
			daneGatunek = dane;
		});

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

		// let objektDane = {
		// 	ID: daneGatunek.kolekcjanumerokazu,
		// 	instytucja: daneGatunek.instytucja,
		// 	państwo: daneGatunek.panstwo,
		// 	kolekcja: daneGatunek.kolekcja,
		// };

		// o.push(objektDane);
		// console.log(o);
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

// const TabOkaz = () => {
// 	tabId = tabIdOkaz[0].map((idKolekcja) => idKolekcja.kolekcjanumerokazu);
// 	console.log(tabId);
// };

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

// Search = async (filter, paginacja) => {
// 	let daneWyszykania = "";
// 	await axios
// 		.post(
// 			"https://api.amunatcoll.pl/anc/taxons/search/",
// 			{
// 				filter: { kolekcjanumerokazu: "POZ-V" },
// 				pagination: { currentPage: 1, perPage: 200 },
// 			},
// 			{
// 				headers: {
// 					Accept: "application/json",
// 					"Content-Type": "application/json",
// 					"access-control-allow-credentials": "true",
// 					Authorization: `Bearer ${idToken[0].access}`,
// 				},
// 			}
// 		)
// 		.then(function (response) {
// 			daneWyszykania = response.data;
// 			console.log(
// 				"dane z wyszukiwania!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
// 			);
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// 	// console.log(tokenID);
// 	return daneWyszykania;
// };

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
			console.log("dany rekord aktywny");
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
