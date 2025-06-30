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
const Tesseract = require("tesseract.js")

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
					instytucja: daneGatunek.instytucja,
					botanikazoologia: daneGatunek.botanikazoologia,
					ID: daneGatunek.kolekcjanumerokazu,
					zrodlo: daneGatunek.zrodlo,
					rodzaj: daneGatunek.rodzaj,
					podrodzaj: daneGatunek.podrodzaj,
					gatunek: daneGatunek.gatunek,
					gatunekrodzaj: daneGatunek.rodzajgatunek,
					autorgatunku: daneGatunek.autorgatunku,
					taksonnizszegorzedu: daneGatunek.taksonnizszegorzedu,
					rangataksonunizszegorzedu: daneGatunek.rangataksonunizszegorzedu,
					kwalifikatorhybrydylubchimery:
						daneGatunek.kwalifikatorhybrydylubchimery,
					oznaczeniehybrydy: daneGatunek.oznaczeniehybrydy,
					autortaksonunizszegorzedu: daneGatunek.autortaksonunizszegorzedu,
					jednostkanadrzedna: daneGatunek.jednostkanadrzedna,
					rangajednostkinadrzednej: daneGatunek.rangajednostkinadrzednej,
					plec: daneGatunek.plec,
					wiek: daneGatunek.wiek,
					stadium: daneGatunek.stadium,
					wymiary: daneGatunek.wymiary,
					rodzajtypunomenklatorycznego:
						daneGatunek.rodzajtypunomenklatorycznego,
					materialdowodowy: daneGatunek.materialdowodowy,
					wypozyczony: daneGatunek.wypozyczony,
					stanopracowaniakolekcji: daneGatunek.stanopracowaniakolekcji,
					autorzbioru: daneGatunek.autorzbioru,
					autorzbiorudodatkowyopis: daneGatunek.autorzbiorudodatkowyopis,
					numerzbioruokreslonegoautora:
						daneGatunek.numerzbioruokreslonegoautora,
					autoroznaczenia: daneGatunek.autoroznaczenia,
					dataoznaczeniazbioru: daneGatunek.dataoznaczeniazbioru,
					datazebraniaokazuproby: daneGatunek.datazebraniaokazuproby,
					datazebraniaprobykoniec: daneGatunek.datazebraniaprobykoniec,
					datainne: daneGatunek.datainne,
					metodazbioru: daneGatunek.metodazbioru,
					siedlisko: daneGatunek.siedlisko,
					siedlisko0: daneGatunek.siedlisko0,
					siedlisko1: daneGatunek.siedlisko1,
					habitat: daneGatunek.habitat,
					podloze: daneGatunek.podloze,
					sposobprzechowywania: daneGatunek.sposobprzechowywania,
					sposobyprzechowywaniasposobkonserwacjiizabezpieczenia:
						daneGatunek.sposobyprzechowywaniasposobkonserwacjiizabezpieczenia,
					pomieszczenie: daneGatunek.pomieszczenie,
					regalszafa: daneGatunek.regalszafa,
					polkaszafaentomologiczna: daneGatunek.polkaszafaentomologiczna,
					opakowaniezbiorcze: daneGatunek.opakowaniezbiorcze,
					opakowanienajnizszegorzedu: daneGatunek.opakowanienajnizszegorzedu,
					numerproby: daneGatunek.numerproby,
					lokalizacja: daneGatunek.lokalizacjastanowisko,
					locationsite: daneGatunek.locationsite,
					polozeniewzgledempoziomumorza:
						daneGatunek.polozeniewzgledempoziomumorza,
					szerokoscgeograficzna: daneGatunek.szerokoscgeograficzna,
					dlugoscgeograficzna: daneGatunek.dlugoscgeograficzna,
					wspolrzedneutm: daneGatunek.wspolrzedneutm,
					wspolrzedneatpol: daneGatunek.wspolrzedneatpol,
					georeferencjakomentarze: daneGatunek.georeferencjakomentarze,
					lokalizacjakomentarze: daneGatunek.lokalizacjakomentarze,
					obszarchroniony: daneGatunek.obszarchroniony,
					parknarodowy: daneGatunek.parknarodowy,
					parkkrajobrazowy: daneGatunek.parkkrajobrazowy,
					rezerwatprzyrody: daneGatunek.rezerwatprzyrody,
					rodzajityprezerwatu: daneGatunek.rodzajityprezerwatu,
					obszarchronionegokrajobrazu: daneGatunek.obszarchronionegokrajobrazu,
					uzytekekologiczny: daneGatunek.uzytekekologiczny,
					zespolprzyrodniczokrajobrazowy:
						daneGatunek.zespolprzyrodniczokrajobrazowy,
					koditypobszarunatura2000: daneGatunek.koditypobszarunatura2000,
					nazwaobszarunatura2000: daneGatunek.nazwaobszarunatura2000,
					kontynent: daneGatunek.kontynent,
					państwo: daneGatunek.panstwo,
					wojewodztwo: daneGatunek.wojewodztwo,
					powiat: daneGatunek.powiat,
					gmina: daneGatunek.gmina,
					polozeniewpodzialefizjograficznym:
						daneGatunek.polozeniewpodzialefizjograficznym,
					polozeniewpodzialebiogeograficznymeuropy:
						daneGatunek.polozeniewpodzialebiogeograficznymeuropy,
					polozeniewpodzialegeograficznympotencjalnejroslinnoscinaturalne:
						daneGatunek.polozeniewpodzialegeograficznympotencjalnejroslinnoscinaturalne,
					administracjapanstwowaisamorzadowa:
						daneGatunek.administracjapanstwowaisamorzadowa,
					sluzbyifunkcjonariuszepanstwowi:
						daneGatunek.sluzbyifunkcjonariuszepanstwowi,
					oswiatanauczycielestudenciuczniowie:
						daneGatunek.oswiatanauczycielestudenciuczniowie,
					pracownicynaukowidoktoranci: daneGatunek.pracownicynaukowidoktoranci,
					organizacjepozarzadowespoleczenstwo:
						daneGatunek.organizacjepozarzadowespoleczenstwo,
					grupydoceloweopisprzydatnosci:
						daneGatunek.grupydoceloweopisprzydatnosci,
					opisuwagi: daneGatunek.opisuwagi,
					pochodzenieokazu: daneGatunek.pochodzenieokazu,
					bibliografia: daneGatunek.bibliografia,
					geodokladnosc: daneGatunek.geodokladnosc,
					wspolrzedne: daneGatunek.wspolrzedne,
					kolekcja: daneGatunek.kolekcja,
				};

				o.push(objektDane);
				console.log("**************Rekord dodany****************");
			}

			// console.log(daneGatunek.status);
			// console.log("?????????????????????????????????????????????");
			console.log(response.status);
			// console.log(login.idToken[0])
			// console.log("?????????????????????????????????????????????");
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
	xlsx.writeFile(workBook, "daneToExcel_ZOO_14.xlsx");
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



const plik = "./tekstOCR.txt";



app.get("/test1", async (req, res) => {
	console.log("Klops111111111111111111111");
	// try {
	// 	await axios
	// 		.get(
	// 			"https://rhus-103.man.poznan.pl/dlibra/indexsearch?rdfName=CollectionSpecimenNumber&ipp=60&p=0&filter=POZ"
	// 		)
	// 		.then(function (response) {
	// 			newRefreshID = response;
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// 	return newRefreshID;
	// } catch (error) {
	// 	console.log(error);
	// }

	await Odczyt();
	console.log("@@@@@@@@@@@@@@@@@@@koniec odczytu @@@@@@@@@@@@@@@@@@")

	res.status(200).end();


});


 Odczyt = async () =>{
	 await Tesseract.recognize(
  './POZG-V-0080674.tif',
  'pol',
  {
    logger: m => console.log(m)
  }
	).then(({ data: { text } }) => {
	console.log('klops@@@@@@@@@@@@@@');
  console.log(text);
  tekstOCR(text, plik);
  console.log('klops@@@@@@@@@@@@@@');
});}

const tekstOCR = (data, path) => {
		try {
			fs.writeFileSync(path, data, {
				encoding: "utf8",
			});
			console.log("zapisany Token Użytkownika");
		} catch (err) {
			console.error(err);
		}
	};

// fs.writeFileSync(path, JSON.stringify(data), {



// const fs = require('fs');
// const { recognize } = require('tesseract.js');

// async function ocrTiff(filePath) {
//   try {
//     const imageBuffer = fs.readFileSync(filePath);
//     const { data: { text } } = await recognize(imageBuffer, 'pol');
//     console.log('Rozpoznany tekst:', text);
//   } catch (err) {
//     console.error('Błąd OCR:', err);
//   }
// }

// // Podaj ścieżkę do pliku TIFF
// const filePath = 'ścieżka/do/plik.tiff';

// ocrTiff(filePath);











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
