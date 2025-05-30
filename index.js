const fs = require("fs");
const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
const morgan = require("morgan");
const xlsx = require("xlsx");
const jasonObject = require("./test.json");
const login = require("./controllers/auth/login");
const { dataPath } = require("./controllers/auth/login");
const ref = require("./controllers/auth/refresh");
// const { Refresh, RefreshToken } = require("./controllers/auth/refresh");

const {
	SearchAll,
	tabIdOkaz,
	dataIDrekordu,
} = require("./controllers/szukanieAll/searchOgolne");

const { json } = require("stream/consumers");

const app = express();
// require("dotenv").config();

app.use(morgan("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const dataPath = "./daneTokenID.json";
const idsipwwPath = "./csvjson.json";
//ID LOGOWANIA

// TABLICA Z DANYMI Z WYSZUKIWANIA OGÓLNEGO
tabIdOkaz;

// ID REKORDU - WYSZUKIWANIE OGÓLNE

let rekordDaneDlugosc = [];
let daneRekordu = [];

// let pauzaID = [];

// LOGOWANIE
app.post("/logowanie", login.FunkcjaLogi);
// LOGOWANIE

// ODŚWIERZANIE TOKENU
app.post("/refresh", ref.Refresh);
// ODŚWIERZANIE TOKENU

// SZUKANIE OGÓLNE
app.post("/szukanie", SearchAll);
// SZUKANIE OGÓLNE

app.post("/ident_gatunek", async (req, res) => {
	// const iDsipww = fs.readFileSync(idsipwwPath, {
	// 	encoding: "utf8",
	// });
	// let sipww = JSON.parse(iDsipww);
	// console.log(sipww[0].ID);
	let postep = [];

	const loadIDrekordu = fs.readFileSync(dataIDrekordu, {
		encoding: "utf8",
	});
	let IDrekord = JSON.parse(loadIDrekordu);

	for (let i = 0; i < IDrekord.length; i++) {
		const elementID = IDrekord[i];
		console.log(i);
		console.log(elementID);
		postep.splice(0, 1, i);

		let daneGatunek = "";
		await SearchIdRekord(elementID, login.idToken[0].access).then(function (
			response
		) {
			if (response.status == 401) {
				// LoadeData();
				// async () => {
				// 	await ref.RefreshToken(login.idToken[0].refresh)
				// }
				ref.RefreshToken(login.idToken[0].refresh);
				i = postep[0] - 1;
			}
			if (response.status == 200) {
				daneGatunek = response.data;

				let objektDane = {
					ID: daneGatunek.kolekcjanumerokazu,
					gatunekrodzaj: daneGatunek.rodzajgatunek,
					siedlisko: daneGatunek.siedlisko,
					lokalizacja: daneGatunek.lokalizacjastanowisko,
					lokalizacjakomentarze: daneGatunek.lokalizacjakomentarze,
					szerokosc: daneGatunek.szerokoscgeograficzna,
					dlugosc: daneGatunek.dlugoscgeograficzna,
					komentarze: daneGatunek.georeferencjakomentarze,
					geodokladnosc: daneGatunek.geodokladnosc,
					państwo: daneGatunek.panstwo,
					powiat: daneGatunek.powiat,
					gmina: daneGatunek.gmina,
					opisuwagi: daneGatunek.opisuwagi,
					siedlisko0: daneGatunek.siedlisko0,
					siedlisko1: daneGatunek.siedlisko1,
					wojewodztwo: daneGatunek.wojewodztwo,
					wspolrzedne: daneGatunek.wspolrzedne,
					autorgatunku: daneGatunek.autorgatunku,
					autoroznaczenia: daneGatunek.autoroznaczenia,
					autorzbioru: daneGatunek.autorzbioru,
					autorzbiorudodatkowyopis: daneGatunek.autorzbiorudodatkowyopis,
					bibliografia: daneGatunek.bibliografia,
					botanikazoologia: daneGatunek.botanikazoologia,
					datainne: daneGatunek.datainne,
					dataoznaczeniazbioru: daneGatunek.dataoznaczeniazbioru,
					datazebraniaokazuproby: daneGatunek.datazebraniaokazuproby,
					datazebraniaprobykoniec: daneGatunek.datazebraniaprobykoniec,
					gatunek: daneGatunek.gatunek,
					geodokladnosc: daneGatunek.geodokladnosc,
					habitat: daneGatunek.habitat,
					instytucja: daneGatunek.instytucja,
					jednostkanadrzedna: daneGatunek.jednostkanadrzedna,
					koditypobszarunatura2000: daneGatunek.koditypobszarunatura2000,
					kontynent: daneGatunek.kontynent,
					kwalifikatorhybrydylubchimery:
						daneGatunek.kwalifikatorhybrydylubchimery,
					locationsite: daneGatunek.locationsite,
					materialdowodowy: daneGatunek.materialdowodowy,
					metodazbioru: daneGatunek.metodazbioru,
					nazwaobszarunatura2000: daneGatunek.nazwaobszarunatura2000,
					numerproby: daneGatunek.numerproby,
					numerzbioruokreslonegoautora:
						daneGatunek.numerzbioruokreslonegoautora,
					obszarchronionegokrajobrazu: daneGatunek.obszarchronionegokrajobrazu,
					obszarchroniony: daneGatunek.obszarchroniony,
					opakowanienajnizszegorzedu: daneGatunek.opakowanienajnizszegorzedu,
					opakowaniezbiorcze: daneGatunek.opakowaniezbiorcze,
					opisuwagi: daneGatunek.opisuwagi,
					oznaczeniehybrydy: daneGatunek.oznaczeniehybrydy,
					parkkrajobrazowy: daneGatunek.parkkrajobrazowy,
					parknarodowy: daneGatunek.parknarodowy,
					plec: daneGatunek.plec,
					pochodzenieokazu: daneGatunek.pochodzenieokazu,
					podloze: daneGatunek.podloze,
					podrodzaj: daneGatunek.podrodzaj,
					polkaszafaentomologiczna: daneGatunek.polkaszafaentomologiczna,
					polozeniewpodzialebiogeograficznymeuropy:
						daneGatunek.polozeniewpodzialebiogeograficznymeuropy,
					polozeniewpodzialefizjograficznym:
						daneGatunek.polozeniewpodzialefizjograficznym,
					polozeniewpodzialegeograficznympotencjalnejroslinnoscinaturalne:
						daneGatunek.polozeniewpodzialegeograficznympotencjalnejroslinnoscinaturalne,
					polozeniewzgledempoziomumorza:
						daneGatunek.polozeniewzgledempoziomumorza,
					pomieszczenie: daneGatunek.pomieszczenie,
					pracownicynaukowidoktoranci: daneGatunek.pracownicynaukowidoktoranci,
					rangajednostkinadrzednej: daneGatunek.rangajednostkinadrzednej,
					regalszafa: daneGatunek.regalszafa,
					rezerwatprzyrody: daneGatunek.rezerwatprzyrody,
					rodzaj: daneGatunek.rodzaj,
					rodzajityprezerwatu: daneGatunek.rodzajityprezerwatu,
					rodzajtypunomenklatorycznego:
						daneGatunek.rodzajtypunomenklatorycznego,
					stadium: daneGatunek.stadium,
					stanopracowaniakolekcji: daneGatunek.stanopracowaniakolekcji,
					uzytekekologiczny: daneGatunek.uzytekekologiczny,
					wiek: daneGatunek.wiek,
					wspolrzedneatpol: daneGatunek.wspolrzedneatpol,
					wspolrzedneutm: daneGatunek.wspolrzedneutm,
					wymiary: daneGatunek.wymiary,
					wypozyczony: daneGatunek.wypozyczony,
					zespolprzyrodniczokrajobrazowy:
						daneGatunek.zespolprzyrodniczokrajobrazowy,
					zrodlo: daneGatunek.zrodlo,
					kolekcja: daneGatunek.kolekcja,
					wspolrzedne: daneGatunek.wspolrzedne,
				};

				o.push(objektDane);
				console.log("**************Rekord dodany****************");
			}

			// console.log(daneGatunek.status);
			console.log("?????????????????????????????????????????????");
			console.log(response.status);
			// console.log(login.idToken[0])
			console.log("?????????????????????????????????????????????");
		});
	}

	// 	daneRekordu.splice(
	// 		daneRekordu.length - 1,
	// 		0,
	// 		daneGatunek.kolekcjanumerokazu
	// 	);

	// 	if (i == tabId.length - 1) {
	// 		console.log("koniec");
	// 		console.log(daneRekordu);
	// 		// res.send(daneRekordu);
	// 		// IdBrakki();
	// 		JasonToExcel(o);
	// 	}

	JasonToExcel(o);
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
	// }
	// try {
	// 	// res.send(rekordDaneDlugosc);
	// 	res.status(200);
	// } catch (error) {
	// 	console.log(error);
	// }
});

JasonToExcel = (x) => {
	const workBook = xlsx.utils.book_new();
	const workSheet = xlsx.utils.json_to_sheet(x);
	xlsx.utils.book_append_sheet(workBook, workSheet);
	xlsx.writeFile(workBook, "daneToExcel3.xlsx");
	console.log("**************Zapisany Plik**************");
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

SearchIdRekord = async (filter, token) => {
	let daneGatunek = "";
	await axios
		.get(`https://api.amunatcoll.pl/anc/taxons/details/${filter}/`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"access-control-allow-credentials": "true",
				Authorization: `Bearer ${token}`,
			},
		})
		.then(function (response) {
			daneGatunek = response;
			console.log("dany rekord aktywny");
		})
		.catch(function (error) {
			// console.log(error);
			daneGatunek = error;
		});
	// console.log(tokenID);
	return daneGatunek;
};

LoadeData = async () => {
	try {
		const loadID = fs.readFileSync(dataPath, {
			encoding: "utf8",
		});

		login.idToken.splice(0, 1, JSON.parse(loadID)[0]);
		console.log("Wczytywanie Token Użytkownika");
		console.log(login.idToken);
	} catch (err) {
		console.error(err);
	}
};
